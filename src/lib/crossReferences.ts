/**
 * Cross-Reference System
 * Uses Treasury of Scripture Knowledge (340,000+ references) loaded lazily per book,
 * plus hand-crafted extra-canon references (Enoch, Jubilees, Jasher, etc.)
 */

export interface CrossRef {
  ref: string;
  text?: string;
  connection?: string;
}

// Cache for loaded book cross-references
const bookCache: Record<string, Record<string, string[]>> = {};
const loadingBooks: Record<string, Promise<Record<string, string[]>>> = {};

// Convert book name to file name
function bookToFileName(bookName: string): string {
  return bookName.replace(/\s+/g, '_').toLowerCase();
}

// Lazy-load cross-references for a book
async function loadBookRefs(bookName: string): Promise<Record<string, string[]>> {
  const fileName = bookToFileName(bookName);
  
  if (bookCache[fileName]) return bookCache[fileName];
  if (loadingBooks[fileName]) return loadingBooks[fileName];

  const promise = fetch(`/crossrefs/${fileName}.json`)
    .then(r => {
      if (!r.ok) return {};
      return r.json();
    })
    .catch(() => ({}))
    .then(data => {
      bookCache[fileName] = data;
      delete loadingBooks[fileName];
      return data;
    });

  loadingBooks[fileName] = promise;
  return promise;
}

/**
 * Get cross-references for a verse (async, loads data on demand)
 */
export async function getCrossReferencesAsync(
  bookName: string,
  chapter: number,
  verse: number
): Promise<CrossRef[]> {
  const refs: CrossRef[] = [];

  // Load TSK references
  const bookData = await loadBookRefs(bookName);
  const key = `${chapter}:${verse}`;
  const tskRefs = bookData[key] || [];
  
  for (const ref of tskRefs) {
    refs.push({ ref });
  }

  // Add extra-canon references
  const extraKey = `${bookName} ${chapter}:${verse}`;
  const extraRefs = extraCanonDB[extraKey];
  if (extraRefs) {
    refs.push(...extraRefs);
  }

  return refs;
}

/**
 * Synchronous check using cache (for icon visibility) — always show icon, 
 * since almost every verse has cross-refs in TSK
 */
export function hasCrossReferences(): boolean {
  return true; // With 340K+ refs, virtually every verse has cross-references
}

/**
 * Legacy synchronous getter (returns cached data only)
 */
export function getCrossReferences(bookName: string, chapter: number, verse: number): CrossRef[] {
  const fileName = bookToFileName(bookName);
  const bookData = bookCache[fileName];
  const refs: CrossRef[] = [];

  if (bookData) {
    const key = `${chapter}:${verse}`;
    const tskRefs = bookData[key] || [];
    for (const ref of tskRefs) {
      refs.push({ ref });
    }
  }

  const extraKey = `${bookName} ${chapter}:${verse}`;
  const extraRefs = extraCanonDB[extraKey];
  if (extraRefs) {
    refs.push(...extraRefs);
  }

  return refs;
}

/**
 * Preload cross-references for a book (call when user navigates to a book)
 */
export function preloadBookRefs(bookName: string): void {
  loadBookRefs(bookName);
}

// ============================================================
// Extra-Canon Cross-References (Enoch, Jubilees, Jasher, etc.)
// These aren't in TSK, so we maintain them manually
// ============================================================

const extraCanonDB: Record<string, CrossRef[]> = {
  'Genesis 1:1': [
    { ref: 'Jubilees 2:1', text: 'And the angel of the presence spake to Moses according to the word of Yahweh...', connection: 'Creation account in Jubilees' },
    { ref: '2 Esdras 6:38', text: 'And I said, O Yahweh, thou spakest from the beginning of the creation...', connection: 'Creation spoken into being' },
  ],
  'Genesis 1:26': [
    { ref: 'Wisdom of Solomon 2:23', text: 'For Elohim created man to be immortal, and made him in the image of his own eternity...', connection: 'Image of Elohim elaborated' },
  ],
  'Genesis 2:2': [
    { ref: 'Jubilees 2:16', text: 'And He gave us a great sign, the Sabbath day...', connection: 'Shabbat established in Jubilees' },
  ],
  'Genesis 4:8': [
    { ref: 'Jasher 1:25', text: 'And Cain rose up against his brother Abel and slew him...', connection: 'Expanded account of the first murder' },
  ],
  'Genesis 5:18': [
    { ref: 'Enoch 6:1', text: 'And it came to pass when the children of men had multiplied...', connection: 'Beginning of the Watchers narrative' },
    { ref: 'Jubilees 4:15', text: 'And in the second week of the tenth jubilee, Enoch was taken...', connection: 'Enoch chronology in Jubilees' },
  ],
  'Genesis 5:24': [
    { ref: 'Enoch 12:1', text: 'Before these things Enoch was hidden, and no one of the children of men knew where he was hidden...', connection: 'Enoch taken up — the Watchers commission' },
    { ref: 'Enoch 14:8', text: 'And the vision was shown to me thus: clouds invited me and a mist summoned me...', connection: 'Enoch ascends to the throne of Yahweh' },
    { ref: 'Jasher 3:36', text: 'And Enoch ascended into heaven in a whirlwind, with horses and chariots of fire...', connection: 'Enoch\'s ascension in Jasher' },
  ],
  'Genesis 6:1': [
    { ref: 'Enoch 6:1-2', text: 'And it came to pass when the children of men had multiplied, that in those days were born unto them beautiful daughters...', connection: 'The Watchers saw and lusted after them' },
    { ref: 'Enoch 7:1', text: 'And all the others together with them took unto themselves wives...', connection: 'The Watchers take wives' },
    { ref: 'Jubilees 5:1', text: 'And it came to pass when the children of men began to multiply on the face of the earth...', connection: 'Jubilees account of the Watchers' },
    { ref: 'Jasher 4:18', text: 'And their judges and rulers went to the daughters of men and took their wives by force...', connection: 'Jasher\'s account of corruption' },
  ],
  'Genesis 6:2': [
    { ref: 'Enoch 6:2', text: 'And the angels, the children of the heaven, saw and lusted after them...', connection: 'Sons of Elohim = Watchers in Enoch' },
    { ref: 'Enoch 69:4-5', text: 'The name of the first is Yeqon; he it is who led astray all the sons of Elohim...', connection: 'Named Watchers who led the rebellion' },
  ],
  'Genesis 6:4': [
    { ref: 'Enoch 7:2', text: 'And they became pregnant, and they bare great giants whose height was three thousand ells...', connection: 'Nephilim / giants origin in Enoch' },
    { ref: 'Enoch 15:8', text: 'And now, the giants, who are produced from the spirits and flesh, shall be called evil spirits...', connection: 'Giants become evil spirits after death' },
    { ref: 'Jubilees 7:21-22', text: 'For owing to these three things came the flood upon the earth...', connection: 'Nephilim and the cause of the flood' },
  ],
  'Genesis 7:11': [
    { ref: 'Enoch 89:2-3', text: 'And behold, a star fell from heaven and arose and was eating and pasturing amongst those bulls...', connection: 'Animal Apocalypse — flood symbolism' },
    { ref: 'Jasher 6:11', text: 'And on that day, Yahweh caused the whole earth to shake...', connection: 'Jasher\'s flood account with details' },
  ],
  'Genesis 10:8': [
    { ref: 'Jasher 7:23', text: 'And Nimrod dwelt in Shinar, and he reigned over it and built cities...', connection: 'Nimrod\'s kingdom expanded in Jasher' },
    { ref: 'Jasher 27:2', text: 'And Nimrod king of Babel, the mighty hunter in the earth, was angry...', connection: 'Nimrod confronts Abraham\'s line' },
  ],
  'Genesis 11:1': [
    { ref: 'Jubilees 10:18-19', text: 'And they began to build, and in the fourth week they made brick with fire...', connection: 'Tower of Babel in Jubilees detail' },
    { ref: 'Jasher 9:20-21', text: 'And the building of the tower was unto them a transgression and a sin...', connection: 'Jasher\'s Tower account with motives' },
  ],
  'Genesis 14:18': [
    { ref: '2 Esdras 1:39', text: 'Abraham, Isaac, and Jacob, and Melchizedek...', connection: 'Melchizedek referenced in 2 Esdras' },
    { ref: 'Jasher 16:11', text: 'And Adonizedek king of Jerusalem, the same was Shem...', connection: 'Jasher identifies Melchizedek as Shem' },
  ],
  'Genesis 22:1': [
    { ref: 'Jubilees 17:15-16', text: 'And the prince Mastema came and said before Elohim, Behold, Abraham loves Isaac his son...', connection: 'Mastema instigates the test of Abraham' },
    { ref: 'Jasher 22:41', text: 'And Abraham took the wood of the burnt offering and laid it upon Isaac his son...', connection: 'Jasher\'s binding account with dialogue' },
  ],
  'Exodus 1:8': [
    { ref: 'Jasher 63:1', text: 'And in those days there arose a new king over Egypt...', connection: 'Jasher identifies the new Pharaoh and his motives' },
  ],
  'Exodus 7:11': [
    { ref: 'Jasher 79:27', text: 'And the sorcerers of Egypt did the same with their enchantments...', connection: 'Jannes and Jambres named in Jasher' },
  ],
  'Numbers 13:33': [
    { ref: 'Enoch 15:8-9', text: 'The giants who are born from the spirits and the flesh shall be called evil spirits upon the earth...', connection: 'Origin of the Nephilim giants' },
  ],
  'Deuteronomy 33:2': [
    { ref: 'Enoch 1:3-4', text: 'And Enoch took up his parable and said: The Set-apart Great One will come forth from His dwelling...', connection: 'Yahweh comes with ten thousands of set-apart ones' },
  ],
  'Isaiah 14:12': [
    { ref: 'Enoch 86:1', text: 'And again I saw with mine eyes as I slept, and I saw the heaven above, and behold a star fell from heaven...', connection: 'Fallen star/angel in Enoch\'s vision' },
  ],
  'Isaiah 53:5': [
    { ref: 'Wisdom of Solomon 2:12-20', text: 'Let us lie in wait for the righteous man, because he is inconvenient to us...', connection: 'Suffering servant prophecy parallel' },
  ],
  'Daniel 7:9': [
    { ref: 'Enoch 46:1', text: 'And there I saw One who had a head of days, and His head was white like wool...', connection: 'Ancient of Days in Enoch' },
  ],
  'Daniel 7:13': [
    { ref: 'Enoch 46:2-4', text: 'And there was with him another being whose countenance had the appearance of a man...', connection: 'Son of Man in Enoch parallels Daniel' },
    { ref: 'Enoch 48:2', text: 'And at that hour that Son of Man was named in the presence of the Master of Spirits...', connection: 'Son of Man named before creation' },
  ],
  'Daniel 12:2': [
    { ref: 'Enoch 51:1', text: 'And in those days shall the earth also give back that which has been entrusted to it...', connection: 'Resurrection of the dead in Enoch' },
  ],
  'Matthew 5:5': [
    { ref: 'Enoch 5:7', text: 'But for the elect there shall be light and joy and peace, and they shall inherit the earth...', connection: 'Meek inherit the earth — from Enoch' },
  ],
  'Matthew 22:30': [
    { ref: 'Enoch 15:6-7', text: 'But you were formerly spiritual, living the eternal life, and immortal for all generations...', connection: 'Angels don\'t marry — context for the fall' },
  ],
  'Matthew 25:41': [
    { ref: 'Enoch 10:13', text: 'To Michael likewise Yahweh said, Go, make known to Semjaza and the others...', connection: 'Eternal fire prepared for the Watchers' },
    { ref: 'Enoch 54:6', text: 'And Michael and Gabriel, Raphael and Phanuel shall seize them on that great day...', connection: 'Angels of punishment' },
  ],
  'Luke 1:19': [
    { ref: 'Enoch 9:1', text: 'And then Michael, Uriel, Raphael, and Gabriel looked down from heaven...', connection: 'Archangels named in Enoch before Luke' },
    { ref: 'Tobit 12:15', text: 'I am Raphael, one of the seven set-apart angels, which present the prayers of the saints...', connection: 'Named archangel in Tobit' },
  ],
  'Luke 16:22': [
    { ref: 'Enoch 22:1-4', text: 'And thence I went to another place, and he showed me in the west a great and high mountain...', connection: 'Compartments of Sheol in Enoch' },
  ],
  'John 1:1': [
    { ref: 'Wisdom of Solomon 9:1', text: 'O Elohim of my fathers, Yahweh of mercy, who hast made all things with thy word...', connection: 'The Word as agent of creation' },
  ],
  'John 3:16': [
    { ref: 'Wisdom of Solomon 16:26', text: 'That thy children, O Yahweh, whom thou lovest, might know that it is not the growing of fruits...', connection: 'Yahweh\'s love for His children' },
  ],
  'Acts 7:53': [
    { ref: 'Jubilees 1:27', text: 'And He said to the angel of the presence: Write for Moses from the beginning of creation...', connection: 'Torah given through angels — Jubilees confirms' },
  ],
  'Romans 1:20': [
    { ref: 'Wisdom of Solomon 13:1-5', text: 'For all men who were ignorant of Elohim were foolish by nature...', connection: 'Nature reveals the Creator — Wisdom parallel' },
  ],
  'Hebrews 11:5': [
    { ref: 'Enoch 12:1-2', text: 'Before these things, Enoch was hidden, and no one of the children of men knew where he was hidden...', connection: 'Enoch\'s translation detailed' },
    { ref: 'Jubilees 4:23', text: 'And he was taken from amongst the children of men, and we conducted him into the Garden of Eden...', connection: 'Enoch taken to Eden in Jubilees' },
  ],
  'Hebrews 11:37': [
    { ref: 'Jasher 87:1', text: 'And it was in those days that the prophets were sawn asunder...', connection: 'Sawn asunder — Jasher records Isaiah\'s martyrdom' },
  ],
  'James 4:5': [
    { ref: 'Enoch 15:4', text: 'You have been in heaven, but all the mysteries had not yet been revealed to you...', connection: 'Spirit that dwells in us — jealousy context' },
  ],
  'Jude 1:6': [
    { ref: 'Enoch 10:4-6', text: 'And again Yahweh said to Raphael: Bind Azazel hand and foot, and cast him into the darkness...', connection: 'Angels in chains — directly from Enoch' },
    { ref: 'Enoch 12:4', text: 'Enoch, thou scribe of righteousness, go, declare to the Watchers of the heaven who have left the high heaven...', connection: 'Watchers who left their habitation' },
    { ref: 'Jubilees 5:6', text: 'And against the angels whom He had sent upon the earth, He was exceedingly wroth...', connection: 'Fallen Watchers in Jubilees' },
  ],
  'Jude 1:9': [
    { ref: 'Testament of Moses (fragment)', text: 'Michael disputed with the adversary about the body of Moses...', connection: 'Source of Jude\'s Michael reference' },
  ],
  'Jude 1:14': [
    { ref: 'Enoch 1:9', text: 'And behold! He cometh with ten thousands of His set-apart ones to execute judgment upon all...', connection: 'DIRECT QUOTE — Jude quotes 1 Enoch' },
    { ref: 'Enoch 60:8', text: 'And the day of the great judgment shall come when they shall be judged...', connection: 'Great judgment in Enoch' },
  ],
  'Revelation 6:10': [
    { ref: 'Enoch 47:1-2', text: 'And in those days shall have ascended the prayer of the righteous, and the blood of the righteous...', connection: 'Souls crying out for justice — Enoch parallel' },
  ],
  'Revelation 9:1': [
    { ref: 'Enoch 86:1', text: 'And again I saw with mine eyes as I slept, and I saw the heaven above, and behold a star fell from heaven...', connection: 'Star falling from heaven — Enoch vision' },
    { ref: 'Enoch 88:1', text: 'And I saw one of those four who had come forth first, and he seized that first star...', connection: 'Binding of the fallen star/angel' },
  ],
  'Revelation 20:1': [
    { ref: 'Enoch 10:4', text: 'And again Yahweh said to Raphael: Bind Azazel hand and foot, and cast him into the darkness...', connection: 'Angel binding — Enoch precursor to Revelation' },
    { ref: 'Enoch 10:12', text: 'Bind them fast for seventy generations in the valleys of the earth...', connection: 'Bound for set time before judgment' },
  ],
  'Revelation 21:1': [
    { ref: 'Enoch 45:4-5', text: 'And I will transform the heaven and make it an eternal blessing and light...', connection: 'New heaven and earth in Enoch' },
    { ref: 'Enoch 91:16', text: 'And the first heaven shall depart and pass away, and a new heaven shall appear...', connection: 'New heaven prophecy in Enoch' },
  ],

  // Extra-canon books cross-referencing BACK to canon
  'Enoch 1:9': [
    { ref: 'Jude 1:14-15', text: 'And Enoch also, the seventh from Adam, prophesied of these, saying...', connection: 'Jude DIRECTLY quotes this verse' },
    { ref: 'Deuteronomy 33:2', text: 'Yahweh came from Sinai, and rose up from Seir unto them...', connection: 'Coming with set-apart ones' },
  ],
  'Enoch 6:1': [
    { ref: 'Genesis 6:1-2', text: 'And it came to pass, when men began to multiply on the face of the earth...', connection: 'Sons of Elohim take daughters of men' },
    { ref: 'Jude 1:6', text: 'And the angels which kept not their first estate, but left their own habitation...', connection: 'Angels who fell — Jude confirms Enoch' },
  ],
  'Enoch 46:1': [
    { ref: 'Daniel 7:9', text: 'I beheld till the thrones were cast down, and the Ancient of days did sit...', connection: 'Ancient of Days — Daniel parallel' },
    { ref: 'Revelation 1:14', text: 'His head and his hairs were white like wool, as white as snow...', connection: 'White hair description matches' },
  ],
  'Jubilees 2:1': [
    { ref: 'Genesis 1:1-2', text: 'In the beginning Elohim created the heaven and the earth...', connection: 'Jubilees retells creation' },
    { ref: 'Exodus 20:11', text: 'For in six days Yahweh made heaven and earth...', connection: 'Six-day creation confirmed' },
  ],
  'Jubilees 5:1': [
    { ref: 'Genesis 6:1-4', text: 'When men began to multiply on the face of the earth, and daughters were born unto them...', connection: 'Parallel Watcher/Nephilim account' },
    { ref: 'Enoch 6:1-2', text: 'And it came to pass when the children of men had multiplied...', connection: 'Triple witness: Genesis + Enoch + Jubilees' },
  ],
};
