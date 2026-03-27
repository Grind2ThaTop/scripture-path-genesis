// Cross-reference database for Scripture
// Maps verse references to related passages across the Bible

export interface CrossRef {
  ref: string;       // e.g. "John 3:16"
  text: string;      // Short preview of the verse
  connection: string; // Why it connects
}

// Key: normalized reference like "Genesis 1:1" or pattern like "Genesis 1"
// We store cross-refs at both verse and chapter level
const crossRefDB: Record<string, CrossRef[]> = {
  // ===== GENESIS =====
  'Genesis 1:1': [
    { ref: 'John 1:1', text: 'In the beginning was the Word...', connection: 'Creation through the Word' },
    { ref: 'Hebrews 11:3', text: 'Through faith we understand the worlds were framed...', connection: 'Faith in creation' },
    { ref: 'Psalm 33:6', text: 'By the word of Yahweh were the heavens made...', connection: 'Creation by His Word' },
    { ref: 'Colossians 1:16', text: 'For by him were all things created...', connection: 'All things created through Messiah' },
    { ref: 'Isaiah 45:18', text: 'For thus saith Yahweh that created the heavens...', connection: 'Yahweh the Creator' },
  ],
  'Genesis 1:26': [
    { ref: 'Genesis 5:1', text: 'In the likeness of Elohim made he him...', connection: 'Image of Elohim' },
    { ref: 'Psalm 8:5', text: 'Thou hast made him a little lower than the angels...', connection: 'Man\'s place in creation' },
    { ref: 'Colossians 3:10', text: 'The new man, renewed in knowledge after the image of him...', connection: 'Restored image' },
    { ref: '1 Corinthians 11:7', text: 'He is the image and glory of Elohim...', connection: 'Image and glory' },
  ],
  'Genesis 1:27': [
    { ref: 'Genesis 5:2', text: 'Male and female created he them...', connection: 'Male and female creation' },
    { ref: 'Matthew 19:4', text: 'He which made them at the beginning made them male and female...', connection: 'Yahshua confirms creation order' },
    { ref: 'Galatians 3:28', text: 'There is neither male nor female: for ye are all one in Messiah...', connection: 'Unity in Messiah' },
  ],
  'Genesis 2:7': [
    { ref: '1 Corinthians 15:45', text: 'The first man Adam was made a living soul...', connection: 'First Adam vs last Adam' },
    { ref: 'Job 33:4', text: 'The Spirit of El hath made me, and the breath of the Almighty...', connection: 'Breath of life' },
    { ref: 'Ecclesiastes 12:7', text: 'Then shall the dust return to the earth...', connection: 'Dust to dust' },
  ],
  'Genesis 2:24': [
    { ref: 'Matthew 19:5', text: 'For this cause shall a man leave father and mother...', connection: 'Marriage covenant' },
    { ref: 'Ephesians 5:31', text: 'For this cause shall a man leave his father and mother...', connection: 'Marriage and Messiah\'s assembly' },
    { ref: 'Mark 10:7', text: 'For this cause shall a man leave his father and mother...', connection: 'Yahshua on marriage' },
  ],
  'Genesis 3:15': [
    { ref: 'Romans 16:20', text: 'And the Elohim of peace shall bruise Satan under your feet shortly...', connection: 'Promise of victory over the serpent' },
    { ref: 'Galatians 4:4', text: 'Elohim sent forth his Son, made of a woman...', connection: 'Seed of the woman fulfilled' },
    { ref: 'Revelation 12:9', text: 'That old serpent, called the Devil, and Satan...', connection: 'The serpent identified' },
    { ref: '1 John 3:8', text: 'For this purpose the Son of Elohim was manifested...', connection: 'Destroying the works of the devil' },
  ],
  'Genesis 12:1': [
    { ref: 'Hebrews 11:8', text: 'By faith Abraham, when he was called to go out...', connection: 'Faith of Abraham' },
    { ref: 'Acts 7:3', text: 'Get thee out of thy country, and from thy kindred...', connection: 'Stephen recounts the call' },
    { ref: 'Galatians 3:8', text: 'The scripture foreseeing that Elohim would justify the heathen through faith...', connection: 'Blessing to all nations' },
  ],
  'Genesis 15:6': [
    { ref: 'Romans 4:3', text: 'Abraham believed Elohim, and it was counted unto him for righteousness...', connection: 'Faith counted as righteousness' },
    { ref: 'Galatians 3:6', text: 'Even as Abraham believed Elohim, and it was accounted to him for righteousness...', connection: 'Justification by faith' },
    { ref: 'James 2:23', text: 'Abraham believed Elohim, and it was imputed unto him for righteousness...', connection: 'Faith and works together' },
  ],
  'Genesis 22:18': [
    { ref: 'Galatians 3:16', text: 'Now to Abraham and his seed were the promises made...', connection: 'The Seed = Messiah' },
    { ref: 'Acts 3:25', text: 'Ye are the children of the prophets, and of the covenant...', connection: 'Blessing through the seed' },
  ],

  // ===== EXODUS =====
  'Exodus 3:14': [
    { ref: 'John 8:58', text: 'Before Abraham was, I am...', connection: 'Yahshua claims the divine name' },
    { ref: 'Revelation 1:8', text: 'I am Alpha and Omega, the beginning and the ending...', connection: 'The eternal I AM' },
    { ref: 'Isaiah 43:10', text: 'Before me there was no El formed, neither shall there be after me...', connection: 'Yahweh alone is Elohim' },
  ],
  'Exodus 12:46': [
    { ref: 'John 19:36', text: 'A bone of him shall not be broken...', connection: 'Passover lamb fulfilled in Yahshua' },
    { ref: '1 Corinthians 5:7', text: 'For even Messiah our passover is sacrificed for us...', connection: 'Messiah is the Passover' },
    { ref: 'Psalm 34:20', text: 'He keepeth all his bones: not one of them is broken...', connection: 'Prophetic protection' },
  ],
  'Exodus 20:3': [
    { ref: 'Deuteronomy 5:7', text: 'Thou shalt have none other elohim before me...', connection: 'Repeated in Deuteronomy' },
    { ref: 'Matthew 4:10', text: 'Thou shalt worship Yahweh thy Elohim, and him only shalt thou serve...', connection: 'Yahshua upholds the commandment' },
    { ref: 'Isaiah 44:6', text: 'I am the first, and I am the last; and beside me there is no Elohim...', connection: 'No other Elohim' },
  ],

  // ===== PSALMS =====
  'Psalm 22:1': [
    { ref: 'Matthew 27:46', text: 'My El, my El, why hast thou forsaken me?', connection: 'Yahshua quotes this on the cross' },
    { ref: 'Mark 15:34', text: 'My El, my El, why hast thou forsaken me?', connection: 'Parallel account' },
    { ref: 'Hebrews 2:12', text: 'I will declare thy name unto my brethren...', connection: 'From Psalm 22:22 — fulfilled' },
  ],
  'Psalm 23:1': [
    { ref: 'John 10:11', text: 'I am the good shepherd...', connection: 'Yahshua the shepherd' },
    { ref: 'Ezekiel 34:23', text: 'I will set up one shepherd over them...', connection: 'Prophesied shepherd' },
    { ref: 'Hebrews 13:20', text: 'That great shepherd of the sheep...', connection: 'The great shepherd' },
    { ref: '1 Peter 2:25', text: 'For ye were as sheep going astray; but are now returned unto the Shepherd...', connection: 'Returned to the Shepherd' },
  ],
  'Psalm 110:1': [
    { ref: 'Matthew 22:44', text: 'Yahweh said unto my Master, Sit thou on my right hand...', connection: 'Yahshua quotes this Psalm' },
    { ref: 'Acts 2:34', text: 'Yahweh said unto my Master, Sit thou on my right hand...', connection: 'Kepha applies to Yahshua' },
    { ref: 'Hebrews 1:13', text: 'Sit on my right hand, until I make thine enemies thy footstool...', connection: 'Exaltation of the Son' },
  ],
  'Psalm 118:22': [
    { ref: 'Matthew 21:42', text: 'The stone which the builders rejected is become the head of the corner...', connection: 'Yahshua the rejected stone' },
    { ref: 'Acts 4:11', text: 'This is the stone which was set at nought of you builders...', connection: 'Kepha applies to Yahshua' },
    { ref: '1 Peter 2:7', text: 'The stone which the builders disallowed, the same is made the head of the corner...', connection: 'Cornerstone prophecy' },
  ],

  // ===== ISAIAH =====
  'Isaiah 7:14': [
    { ref: 'Matthew 1:23', text: 'Behold, a virgin shall be with child, and shall bring forth a son...', connection: 'Fulfilled in Yahshua\'s birth' },
    { ref: 'Luke 1:31', text: 'Behold, thou shalt conceive in thy womb, and bring forth a son...', connection: 'Angel announces fulfillment' },
  ],
  'Isaiah 9:6': [
    { ref: 'Luke 2:11', text: 'For unto you is born this day in the city of David a Saviour...', connection: 'Child born — fulfilled' },
    { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with Elohim...', connection: 'The mighty El, everlasting Father' },
    { ref: 'Ephesians 2:14', text: 'For he is our peace, who hath made both one...', connection: 'Prince of Peace' },
  ],
  'Isaiah 40:3': [
    { ref: 'Matthew 3:3', text: 'The voice of one crying in the wilderness...', connection: 'John the Immerser fulfills this' },
    { ref: 'Mark 1:3', text: 'The voice of one crying in the wilderness...', connection: 'Parallel account' },
    { ref: 'John 1:23', text: 'I am the voice of one crying in the wilderness...', connection: 'John identifies himself' },
  ],
  'Isaiah 53:5': [
    { ref: '1 Peter 2:24', text: 'By whose stripes ye were healed...', connection: 'Healing through suffering' },
    { ref: 'Romans 4:25', text: 'Who was delivered for our offences, and was raised again for our justification...', connection: 'Wounded for our transgressions' },
    { ref: 'Matthew 8:17', text: 'Himself took our infirmities, and bare our sicknesses...', connection: 'Fulfilled in Yahshua\'s ministry' },
  ],

  // ===== MATTHEW =====
  'Matthew 5:17': [
    { ref: 'Romans 3:31', text: 'Do we then make void the law through faith? Certainly not...', connection: 'Torah not abolished' },
    { ref: 'Romans 10:4', text: 'For Messiah is the goal of the Torah for righteousness...', connection: 'Messiah the aim of Torah' },
    { ref: 'Luke 16:17', text: 'It is easier for heaven and earth to pass, than one tittle of the Torah to fail...', connection: 'Torah endures' },
    { ref: 'Psalm 119:142', text: 'Thy righteousness is an everlasting righteousness, and thy Torah is the truth...', connection: 'Torah = truth' },
  ],
  'Matthew 28:19': [
    { ref: 'Acts 1:8', text: 'Ye shall be witnesses unto me...unto the uttermost part of the earth...', connection: 'Great commission in action' },
    { ref: 'Mark 16:15', text: 'Go ye into all the world, and proclaim the good news to every creature...', connection: 'Parallel commission' },
    { ref: 'Acts 2:38', text: 'Repent, and be immersed every one of you in the name of Yahshua Messiah...', connection: 'Commission carried out' },
  ],

  // ===== JOHN =====
  'John 1:1': [
    { ref: 'Genesis 1:1', text: 'In the beginning Elohim created the heaven and the earth...', connection: 'Parallel opening — the Word at creation' },
    { ref: '1 John 1:1', text: 'That which was from the beginning, which we have heard...', connection: 'The Word of life' },
    { ref: 'Revelation 19:13', text: 'And his name is called The Word of Elohim...', connection: 'The Word identified' },
    { ref: 'Proverbs 8:22', text: 'Yahweh possessed me in the beginning of his way...', connection: 'Wisdom at creation' },
    { ref: 'Colossians 1:17', text: 'He is before all things, and by him all things consist...', connection: 'Pre-existence of the Word' },
  ],
  'John 1:14': [
    { ref: 'Philippians 2:7', text: 'But made himself of no reputation, and took upon him the form of a servant...', connection: 'The Word made flesh' },
    { ref: '1 Timothy 3:16', text: 'Elohim was manifest in the flesh...', connection: 'Mystery of the incarnation' },
    { ref: 'Hebrews 2:14', text: 'Forasmuch then as the children are partakers of flesh and blood, he also himself took part of the same...', connection: 'Partook of flesh' },
  ],
  'John 3:16': [
    { ref: 'Romans 5:8', text: 'Elohim commendeth his love toward us, in that while we were yet sinners, Messiah died for us...', connection: 'The depth of Elohim\'s love' },
    { ref: '1 John 4:9', text: 'In this was manifested the love of Elohim toward us...', connection: 'Love through the Son' },
    { ref: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of Elohim is eternal life through Yahshua Messiah...', connection: 'Gift of eternal life' },
    { ref: 'John 3:36', text: 'He that believeth on the Son hath everlasting life...', connection: 'Believing = life' },
    { ref: 'Galatians 2:20', text: 'The Son of Elohim, who loved me, and gave himself for me...', connection: 'Personal application of the love' },
  ],
  'John 10:30': [
    { ref: 'John 17:11', text: 'That they may be one, as we are...', connection: 'Unity of Father and Son' },
    { ref: 'John 14:9', text: 'He that hath seen me hath seen the Father...', connection: 'Seeing the Father in the Son' },
    { ref: 'Colossians 2:9', text: 'For in him dwelleth all the fulness of the Elohim bodily...', connection: 'Fullness of deity' },
  ],
  'John 14:6': [
    { ref: 'Acts 4:12', text: 'Neither is there salvation in any other...', connection: 'No other way' },
    { ref: 'Hebrews 10:20', text: 'By a new and living way, which he hath consecrated for us...', connection: 'The living way' },
    { ref: '1 Timothy 2:5', text: 'There is one Elohim, and one mediator between Elohim and men...', connection: 'One mediator' },
    { ref: 'John 11:25', text: 'I am the resurrection, and the life...', connection: 'The life' },
  ],

  // ===== ROMANS =====
  'Romans 3:23': [
    { ref: 'Romans 5:12', text: 'By one man sin entered into the world, and death by sin...', connection: 'All have sinned — origin' },
    { ref: 'Ecclesiastes 7:20', text: 'There is not a just man upon earth, that doeth good, and sinneth not...', connection: 'Universal sinfulness' },
    { ref: '1 John 1:8', text: 'If we say that we have no sin, we deceive ourselves...', connection: 'No one is without sin' },
    { ref: 'Isaiah 64:6', text: 'We are all as an unclean thing, and all our righteousnesses are as filthy rags...', connection: 'Human righteousness falls short' },
  ],
  'Romans 6:23': [
    { ref: 'John 3:16', text: 'For Elohim so loved the world, that he gave his only begotten Son...', connection: 'The gift of life' },
    { ref: 'Romans 5:21', text: 'That as sin hath reigned unto death, even so might grace reign through righteousness...', connection: 'Grace reigns through righteousness' },
    { ref: 'Ezekiel 18:20', text: 'The soul that sinneth, it shall die...', connection: 'Wages of sin = death' },
  ],
  'Romans 8:28': [
    { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith Yahweh...', connection: 'Yahweh\'s plan for good' },
    { ref: 'Ephesians 1:11', text: 'In whom also we have obtained an inheritance, being predestinated according to the purpose...', connection: 'Predestined purpose' },
    { ref: 'Genesis 50:20', text: 'But as for you, ye thought evil against me; but Elohim meant it unto good...', connection: 'Evil turned to good' },
  ],

  // ===== HEBREWS =====
  'Hebrews 11:1': [
    { ref: 'Romans 8:24', text: 'For we are saved by hope: but hope that is seen is not hope...', connection: 'Hope in the unseen' },
    { ref: '2 Corinthians 5:7', text: 'For we walk by faith, not by sight...', connection: 'Faith over sight' },
    { ref: '2 Corinthians 4:18', text: 'The things which are seen are temporal; but the things which are not seen are eternal...', connection: 'Eternal unseen reality' },
  ],

  // ===== REVELATION =====
  'Revelation 1:8': [
    { ref: 'Isaiah 44:6', text: 'I am the first, and I am the last; and beside me there is no Elohim...', connection: 'Alpha and Omega — the Eternal' },
    { ref: 'Revelation 22:13', text: 'I am Alpha and Omega, the beginning and the end...', connection: 'Bookend declaration' },
    { ref: 'Exodus 3:14', text: 'I AM THAT I AM...', connection: 'The self-existent One' },
  ],
  'Revelation 21:4': [
    { ref: 'Isaiah 25:8', text: 'He will swallow up death in victory; and Yahweh Elohim will wipe away tears...', connection: 'No more tears — prophesied' },
    { ref: '1 Corinthians 15:54', text: 'Death is swallowed up in victory...', connection: 'Victory over death' },
    { ref: 'Isaiah 65:17', text: 'For, behold, I create new heavens and a new earth...', connection: 'New creation promised' },
  ],

  // ===== DEUTERONOMY =====
  'Deuteronomy 6:4': [
    { ref: 'Mark 12:29', text: 'Hear, O Yisra\'el; Yahweh our Elohim is one Yahweh...', connection: 'Yahshua affirms the Shema' },
    { ref: '1 Corinthians 8:6', text: 'But to us there is but one Elohim, the Father, of whom are all things...', connection: 'One Elohim declaration' },
    { ref: 'James 2:19', text: 'Thou believest that there is one Elohim; thou doest well...', connection: 'Faith in one Elohim' },
  ],

  // ===== PROVERBS =====
  'Proverbs 3:5': [
    { ref: 'Psalm 37:5', text: 'Commit thy way unto Yahweh; trust also in him...', connection: 'Trust in Yahweh' },
    { ref: 'Jeremiah 17:7', text: 'Blessed is the man that trusteth in Yahweh...', connection: 'Blessing of trust' },
    { ref: 'Isaiah 26:3', text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee...', connection: 'Peace through trust' },
  ],
};

/**
 * Look up cross-references for a specific verse
 */
export function getCrossReferences(bookName: string, chapter: number, verse: number): CrossRef[] {
  const key = `${bookName} ${chapter}:${verse}`;
  return crossRefDB[key] || [];
}

/**
 * Check if a verse has cross-references available
 */
export function hasCrossReferences(bookName: string, chapter: number, verse: number): boolean {
  const key = `${bookName} ${chapter}:${verse}`;
  return key in crossRefDB;
}
