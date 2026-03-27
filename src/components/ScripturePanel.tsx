import { useState, useEffect } from 'react';
import { X, BookOpen, Languages, Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPassage, bibleBooks, type BiblePassage } from '@/lib/bibleApi';
import { restoreNames } from '@/lib/restoreNames';

interface ScripturePanelProps {
  reference: string;
  isOpen: boolean;
  onClose: () => void;
}

function detectTestament(reference: string): 'OT' | 'NT' {
  const ntBooks = ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
  const refLower = reference.toLowerCase();
  for (const b of ntBooks) {
    if (refLower.startsWith(b.toLowerCase())) return 'NT';
  }
  return 'OT';
}

function parseBookFromRef(reference: string): string | null {
  // Extract book name (handles "1 John 3:4", "Genesis 1:1", etc.)
  const match = reference.match(/^(\d?\s?[A-Za-z\s]+?)[\s]+\d/);
  return match ? match[1].trim() : null;
}

// Hardcoded original language samples for key verses (Hebrew OT / Greek NT)
const originalLanguageCache: Record<string, { text: string; lang: 'hebrew' | 'greek' }> = {
  'Genesis 1:1': { text: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', lang: 'hebrew' },
  'Exodus 3:14': { text: 'וַיֹּאמֶר אֱלֹהִים אֶל־מֹשֶׁה אֶהְיֶה אֲשֶׁר אֶהְיֶה', lang: 'hebrew' },
  'Deuteronomy 6:4': { text: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד', lang: 'hebrew' },
  'Psalm 23:1': { text: 'מִזְמוֹר לְדָוִד יְהוָה רֹעִי לֹא אֶחְסָר', lang: 'hebrew' },
  'Psalm 119:105': { text: 'נֵר לְרַגְלִי דְבָרֶךָ וְאוֹר לִנְתִיבָתִי', lang: 'hebrew' },
  'Isaiah 53:5': { text: 'וְהוּא מְחֹלָל מִפְּשָׁעֵנוּ מְדֻכָּא מֵעֲוֹנֹתֵינוּ מוּסַר שְׁלוֹמֵנוּ עָלָיו וּבַחֲבֻרָתוֹ נִרְפָּא־לָנוּ', lang: 'hebrew' },
  'Proverbs 9:10': { text: 'תְּחִלַּת חׇכְמָה יִרְאַת יְהוָה וְדַעַת קְדֹשִׁים בִּינָה', lang: 'hebrew' },
  'Psalm 83:18': { text: 'וְיֵדְעוּ כִּי־אַתָּה שִׁמְךָ יְהוָה לְבַדֶּךָ עֶלְיוֹן עַל־כׇּל־הָאָרֶץ', lang: 'hebrew' },
  'Isaiah 42:8': { text: 'אֲנִי יְהוָה הוּא שְׁמִי וּכְבוֹדִי לְאַחֵר לֹא־אֶתֵּן', lang: 'hebrew' },
  'Numbers 6:26': { text: 'יִשָּׂא יְהוָה פָּנָיו אֵלֶיךָ וְיָשֵׂם לְךָ שָׁלוֹם', lang: 'hebrew' },
  'Isaiah 41:10': { text: 'אַל־תִּירָא כִּי עִמְּךָ־אָנִי אַל־תִּשְׁתָּע כִּי־אֲנִי אֱלֹהֶיךָ', lang: 'hebrew' },
  'Psalm 19:7': { text: 'תּוֹרַת יְהוָה תְּמִימָה מְשִׁיבַת נָפֶשׁ', lang: 'hebrew' },
  'Leviticus 19:2': { text: 'קְדֹשִׁים תִּהְיוּ כִּי קָדוֹשׁ אֲנִי יְהוָה אֱלֹהֵיכֶם', lang: 'hebrew' },
  'Psalm 136:1': { text: 'הוֹדוּ לַיהוָה כִּי־טוֹב כִּי לְעוֹלָם חַסְדּוֹ', lang: 'hebrew' },
  'Psalm 119:160': { text: 'רֹאשׁ דְּבָרְךָ אֱמֶת וּלְעוֹלָם כׇּל־מִשְׁפַּט צִדְקֶךָ', lang: 'hebrew' },
  'John 1:1': { text: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.', lang: 'greek' },
  'John 3:16': { text: 'Οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν.', lang: 'greek' },
  'John 14:15': { text: 'Ἐὰν ἀγαπᾶτέ με, τὰς ἐντολὰς τὰς ἐμὰς τηρήσετε.', lang: 'greek' },
  'Matthew 5:17': { text: 'Μὴ νομίσητε ὅτι ἦλθον καταλῦσαι τὸν νόμον ἢ τοὺς προφήτας· οὐκ ἦλθον καταλῦσαι ἀλλὰ πληρῶσαι.', lang: 'greek' },
  'Romans 3:31': { text: 'νόμον οὖν καταργοῦμεν διὰ τῆς πίστεως; μὴ γένοιτο· ἀλλὰ νόμον ἱστάνομεν.', lang: 'greek' },
  '1 John 3:4': { text: 'Πᾶς ὁ ποιῶν τὴν ἁμαρτίαν καὶ τὴν ἀνομίαν ποιεῖ, καὶ ἡ ἁμαρτία ἐστὶν ἡ ἀνομία.', lang: 'greek' },
  'Hebrews 5:14': { text: 'τελείων δέ ἐστιν ἡ στερεὰ τροφή, τῶν διὰ τὴν ἕξιν τὰ αἰσθητήρια γεγυμνασμένα ἐχόντων.', lang: 'greek' },
  'Revelation 14:12': { text: 'Ὧδε ἡ ὑπομονὴ τῶν ἁγίων ἐστίν, οἱ τηροῦντες τὰς ἐντολὰς τοῦ θεοῦ καὶ τὴν πίστιν Ἰησοῦ.', lang: 'greek' },
  'Matthew 24:13': { text: 'ὁ δὲ ὑπομείνας εἰς τέλος, οὗτος σωθήσεται.', lang: 'greek' },
  'Philippians 4:6': { text: 'μηδὲν μεριμνᾶτε, ἀλλ᾿ ἐν παντὶ τῇ προσευχῇ καὶ τῇ δεήσει μετὰ εὐχαριστίας τὰ αἰτήματα ὑμῶν γνωριζέσθω πρὸς τὸν θεόν.', lang: 'greek' },
  'Ephesians 6:10': { text: 'Τοῦ λοιποῦ ἐνδυναμοῦσθε ἐν κυρίῳ καὶ ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ.', lang: 'greek' },
};

// Find original language text, checking exact ref and partial matches
function findOriginalText(reference: string): { text: string; lang: 'hebrew' | 'greek' } | null {
  if (originalLanguageCache[reference]) return originalLanguageCache[reference];
  // Try matching base verse (e.g. "Matthew 5:17-19" → "Matthew 5:17")
  const baseRef = reference.replace(/-\d+$/, '');
  if (originalLanguageCache[baseRef]) return originalLanguageCache[baseRef];
  return null;
}

export default function ScripturePanel({ reference, isOpen, onClose }: ScripturePanelProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [loading, setLoading] = useState(false);
  const testament = detectTestament(reference);
  const originalText = findOriginalText(reference);

  useEffect(() => {
    if (!isOpen || !reference) return;
    setLoading(true);
    setShowOriginal(false);
    fetchPassage(reference).then(data => {
      setPassage(data);
      setLoading(false);
    });
  }, [isOpen, reference]);

  const bookName = parseBookFromRef(reference);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] max-h-[75vh] z-50 bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">{reference}</h3>
                <span className={`text-xs px-2 py-0.5 rounded border ${
                  testament === 'OT'
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-accent/50 text-accent-foreground border-accent/30'
                }`}>
                  {testament === 'OT' ? 'Hebrew' : 'Greek'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {bookName && (
                  <Link
                    to={`/bible?book=${encodeURIComponent(bookName)}&chapter=1`}
                    onClick={onClose}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="Open in Bible reader"
                  >
                    <ExternalLink size={16} />
                  </Link>
                )}
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {loading && (
                <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
                  <Loader2 size={18} className="animate-spin" />
                  <span className="text-sm">Loading verse...</span>
                </div>
              )}

              {!loading && passage && (
                <>
                  {/* KJV Text */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-mono">KJV</p>
                    <div className="text-foreground leading-relaxed font-display text-base">
                      {passage.verses.map(v => (
                        <span key={v.verse} className="inline">
                          <sup className="text-primary font-mono text-[10px] mr-0.5 select-none">{v.verse}</sup>
                          <span>{restoreNames(v.text)}</span>
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">— {passage.reference}</p>
                  </div>

                  {/* Original Language */}
                  {originalText && (
                    <div className="border-t border-border pt-4">
                      <button
                        onClick={() => setShowOriginal(!showOriginal)}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Languages size={16} />
                        {showOriginal ? 'Hide' : 'Show'} {originalText.lang === 'hebrew' ? 'Hebrew' : 'Greek'} Text
                      </button>
                      <AnimatePresence>
                        {showOriginal && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 p-4 bg-muted/50 rounded-lg border border-border">
                              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                                {originalText.lang === 'hebrew' ? 'Hebrew' : 'Greek'} Text
                              </p>
                              <p className={`text-lg leading-loose text-foreground ${originalText.lang === 'hebrew' ? 'text-right' : 'text-left'}`}
                                 dir={originalText.lang === 'hebrew' ? 'rtl' : 'ltr'}
                              >
                                {originalText.text}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Tip */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Tip:</strong> Use the {originalText ? 'Hebrew/Greek toggle above' : 'Bible reader'} to study the original language behind this passage.
                    </p>
                  </div>
                </>
              )}

              {!loading && !passage && (
                <div className="text-center py-8">
                  <BookOpen size={32} className="text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-display font-semibold">{reference}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Could not load this verse. Check your connection and try again.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Clickable verse reference component
export function VerseRef({ reference, className = '' }: { reference: string; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer ${className}`}
      >
        {reference}
      </button>
      <ScripturePanel reference={reference} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
