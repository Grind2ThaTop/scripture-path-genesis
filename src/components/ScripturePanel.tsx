import { useState } from 'react';
import { X, BookOpen, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScripturePanelProps {
  reference: string;
  isOpen: boolean;
  onClose: () => void;
}

// Sample verse data — in a real app this would come from an API
const sampleVerses: Record<string, { text: string; hebrew?: string; greek?: string; testament: 'OT' | 'NT' }> = {
  'Exodus 3:14-15': {
    text: 'And Elohim said to Mosheh, "I AM WHO I AM." And He said, "Thus you shall say to the children of Yisra\'el, \'I AM has sent me to you.\'" And Elohim said further to Mosheh, "Thus you shall say to the children of Yisra\'el, \'Yahweh Elohim of your fathers, the Elohim of Abraham, the Elohim of Yitshaq, and the Elohim of Ya\'aqob, has sent me to you. This is My name forever, and this is My remembrance to all generations.\'"',
    hebrew: 'וַיֹּאמֶר אֱלֹהִים אֶל־מֹשֶׁה אֶהְיֶה אֲשֶׁר אֶהְיֶה',
    testament: 'OT',
  },
  'Isaiah 42:8': {
    text: 'I am Yahweh, that is My name; and My esteem I do not give to another, nor My praise to carved images.',
    hebrew: 'אֲנִי יְהוָה הוּא שְׁמִי וּכְבוֹדִי לְאַחֵר לֹא־אֶתֵּן',
    testament: 'OT',
  },
  'Psalm 83:18': {
    text: 'And let them know that You, whose name is Yahweh, You alone are the Most High over all the earth.',
    hebrew: 'וְיֵדְעוּ כִּי־אַתָּה שִׁמְךָ יְהוָה לְבַדֶּךָ עֶלְיוֹן עַל־כׇּל־הָאָרֶץ',
    testament: 'OT',
  },
  'Deuteronomy 6:4': {
    text: 'Hear, O Yisra\'el: Yahweh our Elohim, Yahweh is one!',
    hebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד',
    testament: 'OT',
  },
  'John 14:15': {
    text: 'If you love Me, you shall guard My commands.',
    greek: 'Ἐὰν ἀγαπᾶτέ με, τὰς ἐντολὰς τὰς ἐμὰς τηρήσετε.',
    testament: 'NT',
  },
  'Matthew 5:17-19': {
    text: 'Do not think that I came to destroy the Torah or the Prophets. I did not come to destroy but to complete. For truly, I say to you, till the heaven and the earth pass away, one jot or one tittle shall by no means pass from the Torah till all be done.',
    greek: 'Μὴ νομίσητε ὅτι ἦλθον καταλῦσαι τὸν νόμον ἢ τοὺς προφήτας· οὐκ ἦλθον καταλῦσαι ἀλλὰ πληρῶσαι.',
    testament: 'NT',
  },
  'Romans 3:31': {
    text: 'Do we then nullify the Torah through belief? Let it not be! On the contrary, we establish the Torah.',
    greek: 'νόμον οὖν καταργοῦμεν διὰ τῆς πίστεως; μὴ γένοιτο· ἀλλὰ νόμον ἱστάνομεν.',
    testament: 'NT',
  },
  '1 John 3:4': {
    text: 'Everyone doing sin also does lawlessness, and sin is lawlessness.',
    greek: 'Πᾶς ὁ ποιῶν τὴν ἁμαρτίαν καὶ τὴν ἀνομίαν ποιεῖ, καὶ ἡ ἁμαρτία ἐστὶν ἡ ἀνομία.',
    testament: 'NT',
  },
  'Proverbs 9:10': {
    text: 'The fear of Yahweh is the beginning of wisdom, and the knowledge of the Set-apart One is understanding.',
    hebrew: 'תְּחִלַּת חׇכְמָה יִרְאַת יְהוָה וְדַעַת קְדֹשִׁים בִּינָה',
    testament: 'OT',
  },
  'Hebrews 5:14': {
    text: 'But solid food is for the mature, for those who because of practice have their senses trained to discern both good and evil.',
    greek: 'τελείων δέ ἐστιν ἡ στερεὰ τροφή, τῶν διὰ τὴν ἕξιν τὰ αἰσθητήρια γεγυμνασμένα ἐχόντων πρὸς διάκρισιν καλοῦ τε καὶ κακοῦ.',
    testament: 'NT',
  },
  'Ephesians 6:10-18': {
    text: 'For the rest, my brothers, be strong in the Master and in the mightiness of His strength. Put on the complete armour of Elohim, for you to have power to stand against the bring-togethers of the devil.',
    greek: 'Τοῦ λοιποῦ ἐνδυναμοῦσθε ἐν κυρίῳ καὶ ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ. ἐνδύσασθε τὴν πανοπλίαν τοῦ θεοῦ.',
    testament: 'NT',
  },
  'Matthew 13:10-17': {
    text: 'And the taught ones came and said to Him, "Why do You speak to them in parables?" And He answering, said to them, "Because it has been given to you to know the secrets of the reign of the heavens, but to them it has not been given."',
    greek: 'Καὶ προσελθόντες οἱ μαθηταὶ εἶπαν αὐτῷ· Διὰ τί ἐν παραβολαῖς λαλεῖς αὐτοῖς;',
    testament: 'NT',
  },
  'Jude 1:14-15': {
    text: 'And Ḥanoḵ, the seventh from Aḏam, also prophesied of these, saying, "See, Yahweh comes with His myriads of set-apart ones, to execute judgment on all, to punish all who are wicked among them."',
    greek: 'Ἐπροφήτευσεν δὲ καὶ τούτοις ἕβδομος ἀπὸ Ἀδὰμ Ἑνὼχ λέγων.',
    testament: 'NT',
  },
  '2 Peter 3:15-17': {
    text: 'And reckon the patience of our Master as deliverance, as also our beloved brother Sha\'ul wrote to you, according to the wisdom given to him, as also in all his letters, speaking in them concerning these, in which some are hard to understand, which those who are untaught and unstable twist to their own destruction.',
    greek: 'καὶ τὴν τοῦ κυρίου ἡμῶν μακροθυμίαν σωτηρίαν ἡγεῖσθε.',
    testament: 'NT',
  },
  'Matthew 24:13': {
    text: 'But he who shall have endured to the end, he shall be saved.',
    greek: 'ὁ δὲ ὑπομείνας εἰς τέλος, οὗτος σωθήσεται.',
    testament: 'NT',
  },
  'Revelation 14:12': {
    text: 'Here is the endurance of the set-apart ones, here are those guarding the commands of Elohim and the belief of Yahshua.',
    greek: 'Ὧδε ἡ ὑπομονὴ τῶν ἁγίων ἐστίν, οἱ τηροῦντες τὰς ἐντολὰς τοῦ θεοῦ καὶ τὴν πίστιν Ἰησοῦ.',
    testament: 'NT',
  },
  'Isaiah 41:10': {
    text: 'Do not fear, for I am with you. Do not look around, for I am your Elohim. I shall strengthen you, I shall also help you, I shall also uphold you with the right hand of My righteousness.',
    hebrew: 'אַל־תִּירָא כִּי עִמְּךָ־אָנִי אַל־תִּשְׁתָּע כִּי־אֲנִי אֱלֹהֶיךָ',
    testament: 'OT',
  },
  'Philippians 4:6-7': {
    text: 'Do not worry at all, but in every matter, by prayer and petition, with thanksgiving, let your requests be made known to Elohim. And the peace of Elohim, which surpasses all understanding, shall guard your hearts and minds through Messiah Yahshua.',
    greek: 'μηδὲν μεριμνᾶτε, ἀλλ᾿ ἐν παντὶ τῇ προσευχῇ καὶ τῇ δεήσει μετὰ εὐχαριστίας τὰ αἰτήματα ὑμῶν γνωριζέσθω πρὸς τὸν θεόν.',
    testament: 'NT',
  },
};

export default function ScripturePanel({ reference, isOpen, onClose }: ScripturePanelProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const verse = sampleVerses[reference];

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
                {verse && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                    {verse.testament === 'OT' ? 'Old Testament' : 'New Testament'}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {verse ? (
                <>
                  {/* English Text */}
                  <div>
                    <p className="text-foreground leading-relaxed font-display text-base italic">
                      "{verse.text}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">— {reference}</p>
                  </div>

                  {/* Original Language Toggle */}
                  {(verse.hebrew || verse.greek) && (
                    <div className="border-t border-border pt-4">
                      <button
                        onClick={() => setShowOriginal(!showOriginal)}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Languages size={16} />
                        {showOriginal ? 'Hide' : 'Show'} {verse.testament === 'OT' ? 'Hebrew' : 'Greek'} Text
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
                                {verse.testament === 'OT' ? 'Hebrew' : 'Greek'} Text
                              </p>
                              <p className={`text-lg leading-loose text-foreground ${verse.testament === 'OT' ? 'text-right' : 'text-left'}`}
                                 dir={verse.testament === 'OT' ? 'rtl' : 'ltr'}
                              >
                                {verse.hebrew || verse.greek}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Study Notes placeholder */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Tip:</strong> Cross-reference this verse with related passages to build deeper understanding. Use the Hebrew/Greek toggle to see the original language behind the translation.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <BookOpen size={32} className="text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-display font-semibold">{reference}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Full verse text with original language support coming soon.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Open your Bible and read this passage directly.
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
