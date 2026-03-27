// Cross-reference database for Scripture
// Maps verse references to related passages across the entire canon + extra-canon

export interface CrossRef {
  ref: string;       // e.g. "John 3:16"
  text: string;      // Short preview of the verse
  connection: string; // Why it connects
}

const crossRefDB: Record<string, CrossRef[]> = {

  // ===================== GENESIS =====================
  'Genesis 1:1': [
    { ref: 'John 1:1', text: 'In the beginning was the Word...', connection: 'Creation through the Word' },
    { ref: 'Hebrews 11:3', text: 'Through faith we understand the worlds were framed...', connection: 'Faith in creation' },
    { ref: 'Psalm 33:6', text: 'By the word of Yahweh were the heavens made...', connection: 'Creation by His Word' },
    { ref: 'Colossians 1:16', text: 'For by him were all things created...', connection: 'All things created through Messiah' },
    { ref: 'Isaiah 45:18', text: 'For thus saith Yahweh that created the heavens...', connection: 'Yahweh the Creator' },
    { ref: 'Jubilees 2:1', text: 'And the angel of the presence spake to Mosheh...', connection: 'Jubilees creation account' },
    { ref: '2 Esdras 6:38', text: 'O Yahweh, thou spakest from the beginning of the creation...', connection: 'Apocryphal creation witness' },
  ],
  'Genesis 1:2': [
    { ref: 'Psalm 104:30', text: 'Thou sendest forth thy spirit, they are created...', connection: 'Spirit in creation' },
    { ref: 'Job 26:13', text: 'By his spirit he hath garnished the heavens...', connection: 'Spirit over the waters' },
    { ref: 'Enoch 18:1', text: 'I saw the treasuries of all the winds...', connection: 'Enoch sees creation forces' },
  ],
  'Genesis 1:3': [
    { ref: '2 Corinthians 4:6', text: 'Elohim, who commanded the light to shine out of darkness...', connection: 'Light from darkness' },
    { ref: 'Psalm 33:9', text: 'He spake, and it was done...', connection: 'Creative word' },
    { ref: 'Isaiah 45:7', text: 'I form the light, and create darkness...', connection: 'Yahweh creates light' },
  ],
  'Genesis 1:14': [
    { ref: 'Psalm 104:19', text: 'He appointed the moon for seasons...', connection: 'Appointed times by luminaries' },
    { ref: 'Jubilees 2:8', text: 'And Elohim appointed the sun to be a great sign on the earth for days and for shabbats...', connection: 'Jubilees on appointed times' },
    { ref: 'Enoch 72:1', text: 'The book of the courses of the luminaries of the heaven...', connection: 'Enoch\'s solar calendar' },
    { ref: 'Sirach 43:6', text: 'He made the moon also to serve in her season...', connection: 'Wisdom on the luminaries' },
  ],
  'Genesis 1:26': [
    { ref: 'Genesis 5:1', text: 'In the likeness of Elohim made he him...', connection: 'Image of Elohim' },
    { ref: 'Psalm 8:5', text: 'Thou hast made him a little lower than the angels...', connection: 'Man\'s place in creation' },
    { ref: 'Colossians 3:10', text: 'The new man, renewed in knowledge after the image of him...', connection: 'Restored image' },
    { ref: 'Wisdom 2:23', text: 'For Elohim created man to be immortal, and made him to be an image of his own eternity...', connection: 'Wisdom on the image' },
  ],
  'Genesis 1:27': [
    { ref: 'Genesis 5:2', text: 'Male and female created he them...', connection: 'Male and female creation' },
    { ref: 'Matthew 19:4', text: 'He which made them at the beginning made them male and female...', connection: 'Yahshua confirms creation order' },
    { ref: 'Galatians 3:28', text: 'There is neither male nor female: for ye are all one in Messiah...', connection: 'Unity in Messiah' },
    { ref: 'Jubilees 3:8', text: 'And in the first week was Adam created, and the rib—his wife...', connection: 'Jubilees creation of man and woman' },
  ],
  'Genesis 2:2': [
    { ref: 'Exodus 20:11', text: 'For in six days Yahweh made heaven and earth...and rested the seventh day...', connection: 'Shabbat foundation' },
    { ref: 'Hebrews 4:4', text: 'And Elohim did rest the seventh day from all his works...', connection: 'Shabbat rest in Hebrews' },
    { ref: 'Jubilees 2:16', text: 'And he finished all his work on the sixth day...he kept Shabbat on the seventh day...', connection: 'Jubilees on the first Shabbat' },
  ],
  'Genesis 2:7': [
    { ref: '1 Corinthians 15:45', text: 'The first man Adam was made a living soul...', connection: 'First Adam vs last Adam' },
    { ref: 'Job 33:4', text: 'The Spirit of El hath made me, and the breath of the Almighty...', connection: 'Breath of life' },
    { ref: 'Ecclesiastes 12:7', text: 'Then shall the dust return to the earth...', connection: 'Dust to dust' },
    { ref: 'Wisdom 15:11', text: 'He knew not his Maker, and him that inspired into him an active soul...', connection: 'Wisdom on the breath' },
  ],
  'Genesis 2:17': [
    { ref: 'Romans 5:12', text: 'By one man sin entered into the world, and death by sin...', connection: 'Death through disobedience' },
    { ref: 'Romans 6:23', text: 'For the wages of sin is death...', connection: 'Wages of sin' },
    { ref: 'Enoch 69:6', text: 'The name of the third is Gadreel: he it is who showed the children of men all the blows of death...', connection: 'Enoch on the origin of death knowledge' },
  ],
  'Genesis 2:24': [
    { ref: 'Matthew 19:5', text: 'For this cause shall a man leave father and mother...', connection: 'Marriage covenant' },
    { ref: 'Ephesians 5:31', text: 'For this cause shall a man leave his father and mother...', connection: 'Marriage and Messiah\'s assembly' },
    { ref: 'Mark 10:7', text: 'For this cause shall a man leave his father and mother...', connection: 'Yahshua on marriage' },
    { ref: 'Tobit 8:6', text: 'Thou madest Adam, and gavest him Chavvah his wife for an helper...', connection: 'Tobit on marriage' },
  ],
  'Genesis 3:1': [
    { ref: 'Revelation 12:9', text: 'That old serpent, called the Devil, and Satan...', connection: 'The serpent identified' },
    { ref: '2 Corinthians 11:3', text: 'As the serpent beguiled Chavvah through his subtilty...', connection: 'Paul references the serpent' },
    { ref: 'Enoch 69:6', text: 'The third was named Gadreel: he showed the children of men all the blows of death...', connection: 'Enoch names the deceiver' },
  ],
  'Genesis 3:15': [
    { ref: 'Romans 16:20', text: 'And the Elohim of peace shall bruise Satan under your feet shortly...', connection: 'Promise of victory over the serpent' },
    { ref: 'Galatians 4:4', text: 'Elohim sent forth his Son, made of a woman...', connection: 'Seed of the woman fulfilled' },
    { ref: 'Revelation 12:9', text: 'That old serpent, called the Devil, and Satan...', connection: 'The serpent identified' },
    { ref: '1 John 3:8', text: 'For this purpose the Son of Elohim was manifested...', connection: 'Destroying the works of the devil' },
    { ref: 'Jubilees 3:23', text: 'And on that day on which Adam went forth from the Garden...', connection: 'Jubilees on the fall and promise' },
  ],
  'Genesis 4:8': [
    { ref: '1 John 3:12', text: 'Not as Cain, who was of that wicked one, and slew his brother...', connection: 'Cain\'s example' },
    { ref: 'Hebrews 11:4', text: 'By faith Abel offered unto Elohim a more excellent sacrifice...', connection: 'Abel\'s righteous offering' },
    { ref: 'Jasher 1:25', text: 'And Cain hastened and rose up, and took the iron part of his ploughing instrument...', connection: 'Jasher\'s expanded account of Cain' },
    { ref: 'Jubilees 4:2', text: 'And Cain slew Abel because Elohim accepted the offering of Abel...', connection: 'Jubilees account' },
  ],
  'Genesis 4:24': [
    { ref: 'Matthew 18:22', text: 'I say not unto thee, Until seven times: but, Until seventy times seven...', connection: 'Forgiveness vs vengeance' },
    { ref: 'Jasher 2:26', text: 'And Lamech was old and advanced in years...and his eyes were dim...', connection: 'Jasher on Lamech' },
  ],
  'Genesis 5:1': [
    { ref: 'Jasher 2:1', text: 'And it was in the hundred and thirtieth year of the life of Adam...', connection: 'Jasher\'s expanded genealogy' },
    { ref: 'Jubilees 4:7', text: 'And Cain took Awan his sister to be his wife...', connection: 'Jubilees genealogy details' },
    { ref: '1 Chronicles 1:1', text: 'Adam, Sheth, Enosh...', connection: 'Genealogy parallel' },
    { ref: 'Luke 3:38', text: 'Which was the son of Enosh, which was the son of Sheth, which was the son of Adam...', connection: 'Yahshua\'s genealogy to Adam' },
  ],
  'Genesis 5:24': [
    { ref: 'Hebrews 11:5', text: 'By faith Enoch was translated that he should not see death...', connection: 'Enoch\'s faith walk' },
    { ref: 'Jude 1:14', text: 'And Enoch also, the seventh from Adam, prophesied...', connection: 'Jude quotes Enoch' },
    { ref: 'Enoch 1:1', text: 'The words of the blessing of Enoch, wherewith he blessed the elect and righteous...', connection: 'Opening of the Book of Enoch' },
    { ref: 'Sirach 44:16', text: 'Enoch pleased Yahweh, and was translated, being an example of repentance...', connection: 'Sirach on Enoch' },
    { ref: 'Jubilees 4:23', text: 'And he was taken from amongst the children of men...', connection: 'Jubilees on Enoch\'s translation' },
    { ref: 'Jasher 3:36', text: 'And Enoch ascended into heaven in a whirlwind, with horses and chariots of fire...', connection: 'Jasher on Enoch\'s ascension' },
  ],
  'Genesis 6:1': [
    { ref: 'Enoch 6:1', text: 'And it came to pass when the children of men had multiplied, that in those days were born unto them beautiful daughters...', connection: 'Enoch\'s Watchers account' },
    { ref: 'Enoch 7:1', text: 'And all the others together with them took unto themselves wives...', connection: 'The fallen angels take wives' },
    { ref: 'Jubilees 5:1', text: 'And it came to pass when the children of men began to multiply on the face of the earth and daughters were born unto them...', connection: 'Jubilees on the Watchers' },
    { ref: 'Jude 1:6', text: 'And the angels which kept not their first estate, but left their own habitation...', connection: 'Jude on fallen angels' },
    { ref: '2 Peter 2:4', text: 'For if Elohim spared not the angels that sinned, but cast them down to tartarus...', connection: 'Peter on fallen angels' },
    { ref: 'Jasher 4:18', text: 'And their judges and rulers went to the daughters of men and took their wives by force...', connection: 'Jasher on the corruption' },
  ],
  'Genesis 6:4': [
    { ref: 'Numbers 13:33', text: 'And there we saw the giants, the sons of Anak...', connection: 'Giants in the land' },
    { ref: 'Enoch 7:2', text: 'And they became pregnant, and they bare great giants, whose height was three thousand ells...', connection: 'Enoch on the Nephilim' },
    { ref: 'Enoch 15:8', text: 'And now, the giants, who are produced from the spirits and flesh, shall be called evil spirits...', connection: 'Origin of evil spirits' },
    { ref: 'Jubilees 7:22', text: 'And they begat sons the Naphidim, and they were all unlike, and they devoured one another...', connection: 'Jubilees on the Nephilim' },
    { ref: 'Jasher 4:18', text: 'And the sons of men in those days took from the cattle of the earth, the beasts of the field and the fowls of the air...', connection: 'Jasher on the corruption of all flesh' },
    { ref: 'Baruch 3:26', text: 'There were the giants famous from the beginning, that were of so great stature...', connection: 'Baruch on the ancient giants' },
    { ref: 'Wisdom 14:6', text: 'For in the old time also, when the proud giants perished...', connection: 'Wisdom on the giants\' destruction' },
  ],
  'Genesis 6:9': [
    { ref: '2 Peter 2:5', text: 'And spared not the old world, but saved Noah the eighth person, a preacher of righteousness...', connection: 'Noah the righteous' },
    { ref: 'Hebrews 11:7', text: 'By faith Noah, being warned of Elohim of things not seen as yet...', connection: 'Noah\'s faith' },
    { ref: 'Enoch 67:1', text: 'And in those days the word of Elohim came unto me, and he said unto me: "Noah, thy lot has come up before Me..."', connection: 'Enoch prophecy about Noah' },
    { ref: 'Jasher 5:14', text: 'And Noah was a just man, he was perfect in his generation...', connection: 'Jasher on Noah\'s righteousness' },
    { ref: 'Jubilees 5:19', text: 'And Yahweh said that he would destroy everything which was upon the face of the earth...but Noah found grace...', connection: 'Jubilees on Noah\'s favor' },
  ],
  'Genesis 7:11': [
    { ref: 'Enoch 89:1', text: 'And one of those four went to that white bull...and began to open the storehouses of water...', connection: 'Enoch\'s animal vision of the flood' },
    { ref: 'Jubilees 5:23', text: 'And on the new moon of the second month the earth was uncovered...', connection: 'Jubilees flood chronology' },
    { ref: 'Jasher 6:11', text: 'And on that day, Yahweh caused the whole earth to shake, and the sun darkened...', connection: 'Jasher\'s flood account' },
  ],
  'Genesis 9:4': [
    { ref: 'Leviticus 17:14', text: 'For the life of all flesh is the blood thereof...', connection: 'Blood prohibition' },
    { ref: 'Acts 15:20', text: 'That they abstain from pollutions of idols, and from fornication, and from things strangled, and from blood...', connection: 'Noahide laws upheld in Acts' },
    { ref: 'Jubilees 6:7', text: 'And he who eateth the blood of any flesh of any beast, shall be destroyed from the earth...', connection: 'Jubilees on the blood covenant' },
    { ref: 'Jubilees 7:28', text: 'And Noah began to enjoin upon his sons\' sons the ordinances and commandments...', connection: 'Noah\'s commandments passed down' },
  ],
  'Genesis 10:8': [
    { ref: 'Micah 5:6', text: 'And they shall waste the land of Assyria with the sword, and the land of Nimrod...', connection: 'Nimrod\'s kingdom referenced' },
    { ref: 'Jasher 7:23', text: 'And Nimrod dwelt in Shinar, and he reigned securely, and he fought with his enemies and he subdued them...', connection: 'Jasher\'s expanded Nimrod account' },
    { ref: 'Jasher 7:36', text: 'And Nimrod strengthened himself, and he rose up from amongst his brethren, and he fought the battles of his brethren...', connection: 'Jasher on Nimrod the mighty hunter' },
    { ref: 'Jubilees 8:1', text: 'In the twenty-ninth jubilee, in the first week, in the beginning thereof Arpachshad took to himself a wife...', connection: 'Jubilees post-flood genealogy' },
  ],
  'Genesis 11:1': [
    { ref: 'Jasher 9:20', text: 'And they said to each other, Come let us build us a city and in it a strong tower...', connection: 'Jasher on the Tower of Babel' },
    { ref: 'Jubilees 10:18', text: 'And Yahweh sent a mighty wind against the tower and overthrew it upon the earth...', connection: 'Jubilees on the scattering' },
    { ref: 'Acts 2:6', text: 'And every man heard them speak in his own language...', connection: 'Babel reversed at Pentecost' },
  ],
  'Genesis 12:1': [
    { ref: 'Hebrews 11:8', text: 'By faith Abraham, when he was called to go out...', connection: 'Faith of Abraham' },
    { ref: 'Acts 7:3', text: 'Get thee out of thy country, and from thy kindred...', connection: 'Stephen recounts the call' },
    { ref: 'Galatians 3:8', text: 'The scripture foreseeing that Elohim would justify the heathen through faith...', connection: 'Blessing to all nations' },
    { ref: 'Jasher 13:5', text: 'And Abram went as Yahweh had told him, and Lot went with him...', connection: 'Jasher on Abraham\'s journey' },
    { ref: 'Jubilees 12:22', text: 'And Abram said: O Elohim, Most High, Thou alone art my Elohim...', connection: 'Abraham\'s prayer in Jubilees' },
  ],
  'Genesis 14:18': [
    { ref: 'Psalm 110:4', text: 'Thou art a priest for ever after the order of Melchizedek...', connection: 'Melchizedek priesthood' },
    { ref: 'Hebrews 7:1', text: 'For this Melchisedec, king of Salem, priest of the most high Elohim...', connection: 'Hebrews on Melchizedek' },
    { ref: 'Hebrews 7:17', text: 'Thou art a priest for ever after the order of Melchisedec...', connection: 'Yahshua\'s eternal priesthood' },
    { ref: 'Jasher 16:11', text: 'And Adonizedek king of Jerusalem, the same was Shem, went out with his men to meet Abram...', connection: 'Jasher identifies Melchizedek as Shem' },
  ],
  'Genesis 15:6': [
    { ref: 'Romans 4:3', text: 'Abraham believed Elohim, and it was counted unto him for righteousness...', connection: 'Faith counted as righteousness' },
    { ref: 'Galatians 3:6', text: 'Even as Abraham believed Elohim, and it was accounted to him for righteousness...', connection: 'Justification by faith' },
    { ref: 'James 2:23', text: 'Abraham believed Elohim, and it was imputed unto him for righteousness...', connection: 'Faith and works together' },
    { ref: '1 Maccabees 2:52', text: 'Was not Abraham found faithful in temptation, and it was imputed unto him for righteousness?', connection: 'Maccabees on Abraham\'s faith' },
  ],
  'Genesis 22:2': [
    { ref: 'Hebrews 11:17', text: 'By faith Abraham, when he was tried, offered up Isaac...', connection: 'Abraham\'s ultimate test' },
    { ref: 'James 2:21', text: 'Was not Abraham our father justified by works, when he had offered Isaac his son...', connection: 'Faith proved by action' },
    { ref: 'Jasher 23:35', text: 'And Abraham stretched forth his hand and took the knife to slay his son...', connection: 'Jasher\'s expanded binding account' },
    { ref: 'Jubilees 17:16', text: 'And the prince Mastema came and said before Elohim: Behold, Abraham loveth Isaac...', connection: 'Jubilees: the accuser\'s role in the test' },
  ],
  'Genesis 22:18': [
    { ref: 'Galatians 3:16', text: 'Now to Abraham and his seed were the promises made...', connection: 'The Seed = Messiah' },
    { ref: 'Acts 3:25', text: 'Ye are the children of the prophets, and of the covenant...', connection: 'Blessing through the seed' },
  ],
  'Genesis 49:10': [
    { ref: 'Numbers 24:17', text: 'There shall come a Star out of Ya\'akov, and a Sceptre shall rise out of Yisra\'el...', connection: 'Messianic prophecy from Balaam' },
    { ref: 'Revelation 5:5', text: 'Behold, the Lion of the tribe of Yahudah, the Root of David, hath prevailed...', connection: 'Lion of Judah' },
    { ref: 'Hebrews 7:14', text: 'For it is evident that our Master sprang out of Yahudah...', connection: 'Messiah from Judah' },
  ],

  // ===================== EXODUS =====================
  'Exodus 3:14': [
    { ref: 'John 8:58', text: 'Before Abraham was, I am...', connection: 'Yahshua claims the divine name' },
    { ref: 'Revelation 1:8', text: 'I am Alpha and Omega, the beginning and the ending...', connection: 'The eternal I AM' },
    { ref: 'Isaiah 43:10', text: 'Before me there was no El formed, neither shall there be after me...', connection: 'Yahweh alone is Elohim' },
  ],
  'Exodus 12:3': [
    { ref: 'John 1:29', text: 'Behold the Lamb of Elohim, which taketh away the sin of the world...', connection: 'Yahshua the Passover lamb' },
    { ref: '1 Corinthians 5:7', text: 'For even Messiah our passover is sacrificed for us...', connection: 'Messiah is the Passover' },
    { ref: '1 Peter 1:19', text: 'But with the precious blood of Messiah, as of a lamb without blemish...', connection: 'Spotless lamb' },
    { ref: 'Jubilees 49:1', text: 'Remember the commandment which Yahweh commanded thee concerning the passover...', connection: 'Jubilees passover instruction' },
  ],
  'Exodus 12:46': [
    { ref: 'John 19:36', text: 'A bone of him shall not be broken...', connection: 'Passover lamb fulfilled in Yahshua' },
    { ref: 'Psalm 34:20', text: 'He keepeth all his bones: not one of them is broken...', connection: 'Prophetic protection' },
  ],
  'Exodus 19:5': [
    { ref: '1 Peter 2:9', text: 'But ye are a chosen generation, a royal priesthood, a set-apart nation...', connection: 'Priesthood of believers' },
    { ref: 'Deuteronomy 7:6', text: 'For thou art a set-apart people unto Yahweh thy Elohim...', connection: 'Chosen people' },
    { ref: 'Jubilees 1:29', text: 'And I will be their Father and they shall be My children...', connection: 'Jubilees covenant promise' },
  ],
  'Exodus 20:2': [
    { ref: 'Deuteronomy 5:6', text: 'I am Yahweh thy Elohim, which brought thee out of the land of Mitsrayim...', connection: 'Deuteronomy parallel' },
    { ref: 'Psalm 81:10', text: 'I am Yahweh thy Elohim, which brought thee out of the land of Mitsrayim...', connection: 'Psalm echoes the commandment' },
    { ref: 'Hosea 13:4', text: 'Yet I am Yahweh thy Elohim from the land of Mitsrayim...', connection: 'Yahweh\'s identity as deliverer' },
  ],
  'Exodus 20:3': [
    { ref: 'Deuteronomy 5:7', text: 'Thou shalt have none other elohim before me...', connection: 'Repeated in Deuteronomy' },
    { ref: 'Matthew 4:10', text: 'Thou shalt worship Yahweh thy Elohim, and him only shalt thou serve...', connection: 'Yahshua upholds the commandment' },
    { ref: 'Isaiah 44:6', text: 'I am the first, and I am the last; and beside me there is no Elohim...', connection: 'No other Elohim' },
  ],
  'Exodus 20:8': [
    { ref: 'Genesis 2:2', text: 'And on the seventh day Elohim ended his work which he had made; and he rested...', connection: 'Shabbat origin at creation' },
    { ref: 'Isaiah 58:13', text: 'If thou turn away thy foot from the shabbat, from doing thy pleasure on my set-apart day...', connection: 'Shabbat delight' },
    { ref: 'Mark 2:27', text: 'The shabbat was made for man, and not man for the shabbat...', connection: 'Yahshua on the shabbat' },
    { ref: 'Hebrews 4:9', text: 'There remaineth therefore a rest to the people of Elohim...', connection: 'Shabbat rest remains' },
    { ref: 'Jubilees 2:24', text: 'And the Creator of all things blessed this day which He had created for blessing and making set-apart...', connection: 'Jubilees on Shabbat\'s sanctity' },
  ],
  'Exodus 24:7': [
    { ref: 'Hebrews 9:19', text: 'For when Mosheh had spoken every precept to all the people according to the Torah...', connection: 'Blood of the covenant' },
    { ref: 'Jasher 82:6', text: 'And Mosheh came and told the people all the words of Yahweh...', connection: 'Jasher on the covenant ceremony' },
  ],
  'Exodus 34:6': [
    { ref: 'Numbers 14:18', text: 'Yahweh is longsuffering, and of great mercy, forgiving iniquity and transgression...', connection: 'Yahweh\'s character repeated' },
    { ref: 'Psalm 86:15', text: 'But thou, O Yahweh, art an El full of compassion, and gracious...', connection: 'Psalm echoes Yahweh\'s attributes' },
    { ref: 'Joel 2:13', text: 'For he is gracious and merciful, slow to anger, and of great kindness...', connection: 'Prophets echo Yahweh\'s nature' },
    { ref: 'Jonah 4:2', text: 'For I knew that thou art a gracious El, and merciful, slow to anger...', connection: 'Jonah knew Yahweh\'s character' },
  ],

  // ===================== LEVITICUS =====================
  'Leviticus 17:11': [
    { ref: 'Hebrews 9:22', text: 'And without shedding of blood is no remission...', connection: 'Blood atonement principle' },
    { ref: 'Romans 3:25', text: 'Whom Elohim hath set forth to be a propitiation through faith in his blood...', connection: 'Messiah\'s blood atonement' },
    { ref: '1 John 1:7', text: 'The blood of Yahshua Messiah his Son cleanseth us from all sin...', connection: 'Cleansing blood' },
  ],
  'Leviticus 23:5': [
    { ref: '1 Corinthians 5:7', text: 'For even Messiah our passover is sacrificed for us...', connection: 'Passover fulfilled' },
    { ref: 'Luke 22:15', text: 'With desire I have desired to eat this passover with you before I suffer...', connection: 'Yahshua\'s final passover' },
    { ref: 'Jubilees 49:1', text: 'Remember the commandment which Yahweh commanded thee concerning the passover...', connection: 'Jubilees passover details' },
  ],

  // ===================== NUMBERS =====================
  'Numbers 24:17': [
    { ref: 'Matthew 2:2', text: 'For we have seen his star in the east, and are come to worship him...', connection: 'Star prophecy fulfilled' },
    { ref: 'Revelation 22:16', text: 'I am the root and the offspring of David, and the bright and morning star...', connection: 'Morning star' },
    { ref: 'Genesis 49:10', text: 'The sceptre shall not depart from Yahudah...', connection: 'Sceptre/star parallel' },
  ],

  // ===================== DEUTERONOMY =====================
  'Deuteronomy 6:4': [
    { ref: 'Mark 12:29', text: 'Hear, O Yisra\'el; Yahweh our Elohim is one Yahweh...', connection: 'Yahshua affirms the Shema' },
    { ref: '1 Corinthians 8:6', text: 'But to us there is but one Elohim, the Father, of whom are all things...', connection: 'One Elohim declaration' },
    { ref: 'James 2:19', text: 'Thou believest that there is one Elohim; thou doest well...', connection: 'Faith in one Elohim' },
  ],
  'Deuteronomy 18:15': [
    { ref: 'Acts 3:22', text: 'A prophet shall Yahweh your Elohim raise up unto you of your brethren, like unto me...', connection: 'Kepha applies to Yahshua' },
    { ref: 'Acts 7:37', text: 'This is that Mosheh, which said unto the children of Yisra\'el, A prophet shall Yahweh your Elohim raise up...', connection: 'Stephen quotes the prophecy' },
    { ref: 'John 6:14', text: 'This is of a truth that prophet that should come into the world...', connection: 'People recognize the prophet' },
  ],
  'Deuteronomy 28:1': [
    { ref: 'Leviticus 26:3', text: 'If ye walk in my statutes, and keep my commandments, and do them...', connection: 'Blessings for obedience parallel' },
    { ref: 'Jasher 88:14', text: 'And Mosheh called unto all the children of Yisra\'el and said unto them...', connection: 'Jasher on Mosheh\'s final address' },
    { ref: 'Jubilees 1:9', text: 'And I will send witnesses unto them, that I may witness against them, but they will not hear...', connection: 'Jubilees on the covenant blessings and warnings' },
  ],
  'Deuteronomy 30:19': [
    { ref: 'Joshua 24:15', text: 'Choose you this day whom ye will serve...', connection: 'Choice between life and death' },
    { ref: 'Sirach 15:17', text: 'Before man is life and death; and whether him liketh shall be given him...', connection: 'Sirach on free will' },
  ],

  // ===================== JOSHUA =====================
  'Joshua 10:13': [
    { ref: 'Jasher 88:63', text: 'And the sun stood still in the midst of heaven, and it stood still thirty-six moments...', connection: 'Jasher confirms the sun standing still' },
    { ref: '2 Samuel 1:18', text: 'Also he bade them teach the children of Yahudah the use of the bow: behold, it is written in the book of Jasher...', connection: 'Scripture references the Book of Jasher' },
    { ref: 'Habakkuk 3:11', text: 'The sun and moon stood still in their habitation...', connection: 'Habakkuk references the event' },
  ],

  // ===================== PSALMS =====================
  'Psalm 2:7': [
    { ref: 'Acts 13:33', text: 'Thou art my Son, this day have I begotten thee...', connection: 'Applied to Yahshua\'s resurrection' },
    { ref: 'Hebrews 1:5', text: 'Thou art my Son, this day have I begotten thee...', connection: 'Son declaration' },
    { ref: 'Hebrews 5:5', text: 'Thou art my Son, to day have I begotten thee...', connection: 'High priest declared' },
    { ref: 'Enoch 48:10', text: 'For they have denied the Name of Yahweh of Spirits and His Anointed...', connection: 'Enoch on the Anointed One' },
  ],
  'Psalm 8:4': [
    { ref: 'Hebrews 2:6', text: 'What is man, that thou art mindful of him? or the son of man, that thou visitest him?', connection: 'Applied to Yahshua' },
    { ref: 'Job 7:17', text: 'What is man, that thou shouldest magnify him? and that thou shouldest set thine heart upon him?', connection: 'Job\'s parallel question' },
  ],
  'Psalm 16:10': [
    { ref: 'Acts 2:27', text: 'Thou wilt not leave my soul in the grave, neither wilt thou suffer thine Set-apart One to see corruption...', connection: 'Kepha applies to Yahshua\'s resurrection' },
    { ref: 'Acts 13:35', text: 'Thou shalt not suffer thine Set-apart One to see corruption...', connection: 'Paul applies to Yahshua' },
  ],
  'Psalm 22:1': [
    { ref: 'Matthew 27:46', text: 'My El, my El, why hast thou forsaken me?', connection: 'Yahshua quotes this on the cross' },
    { ref: 'Mark 15:34', text: 'My El, my El, why hast thou forsaken me?', connection: 'Parallel account' },
    { ref: 'Hebrews 2:12', text: 'I will declare thy name unto my brethren...', connection: 'From Psalm 22:22 — fulfilled' },
  ],
  'Psalm 22:16': [
    { ref: 'John 20:25', text: 'Except I shall see in his hands the print of the nails...', connection: 'Pierced hands fulfilled' },
    { ref: 'Zechariah 12:10', text: 'And they shall look upon me whom they have pierced...', connection: 'Piercing prophesied' },
    { ref: 'Revelation 1:7', text: 'And every eye shall see him, and they also which pierced him...', connection: 'Pierced one returns' },
  ],
  'Psalm 22:18': [
    { ref: 'John 19:24', text: 'They parted my raiment among them, and for my vesture they did cast lots...', connection: 'Fulfilled at the crucifixion' },
    { ref: 'Matthew 27:35', text: 'And they crucified him, and parted his garments, casting lots...', connection: 'Parallel fulfillment' },
  ],
  'Psalm 23:1': [
    { ref: 'John 10:11', text: 'I am the good shepherd...', connection: 'Yahshua the shepherd' },
    { ref: 'Ezekiel 34:23', text: 'I will set up one shepherd over them...', connection: 'Prophesied shepherd' },
    { ref: 'Hebrews 13:20', text: 'That great shepherd of the sheep...', connection: 'The great shepherd' },
    { ref: '1 Peter 2:25', text: 'Ye were as sheep going astray; but are now returned unto the Shepherd...', connection: 'Returned to the Shepherd' },
  ],
  'Psalm 34:20': [
    { ref: 'John 19:36', text: 'A bone of him shall not be broken...', connection: 'Fulfilled in Yahshua' },
    { ref: 'Exodus 12:46', text: 'Neither shall ye break a bone thereof...', connection: 'Passover lamb parallel' },
  ],
  'Psalm 40:6': [
    { ref: 'Hebrews 10:5', text: 'Sacrifice and offering thou didst not desire, but a body hast thou prepared me...', connection: 'Applied to Messiah' },
    { ref: '1 Samuel 15:22', text: 'Hath Yahweh as great delight in burnt offerings and sacrifices, as in obeying the voice of Yahweh?', connection: 'Obedience over sacrifice' },
  ],
  'Psalm 69:9': [
    { ref: 'John 2:17', text: 'The zeal of thine house hath eaten me up...', connection: 'Yahshua cleanses the temple' },
    { ref: 'Romans 15:3', text: 'For even Messiah pleased not himself; but, as it is written...', connection: 'Paul applies to Messiah' },
  ],
  'Psalm 82:6': [
    { ref: 'John 10:34', text: 'Is it not written in your law, I said, Ye are elohim?', connection: 'Yahshua quotes this psalm' },
  ],
  'Psalm 110:1': [
    { ref: 'Matthew 22:44', text: 'Yahweh said unto my Master, Sit thou on my right hand...', connection: 'Yahshua quotes this Psalm' },
    { ref: 'Acts 2:34', text: 'Yahweh said unto my Master, Sit thou on my right hand...', connection: 'Kepha applies to Yahshua' },
    { ref: 'Hebrews 1:13', text: 'Sit on my right hand, until I make thine enemies thy footstool...', connection: 'Exaltation of the Son' },
  ],
  'Psalm 110:4': [
    { ref: 'Hebrews 5:6', text: 'Thou art a priest for ever after the order of Melchisedec...', connection: 'Eternal priesthood' },
    { ref: 'Hebrews 7:17', text: 'Thou art a priest for ever after the order of Melchisedec...', connection: 'Yahshua\'s priesthood' },
    { ref: 'Genesis 14:18', text: 'And Melchizedek king of Salem brought forth bread and wine...', connection: 'First mention of Melchizedek' },
  ],
  'Psalm 118:22': [
    { ref: 'Matthew 21:42', text: 'The stone which the builders rejected is become the head of the corner...', connection: 'Yahshua the rejected stone' },
    { ref: 'Acts 4:11', text: 'This is the stone which was set at nought of you builders...', connection: 'Kepha applies to Yahshua' },
    { ref: '1 Peter 2:7', text: 'The stone which the builders disallowed, the same is made the head of the corner...', connection: 'Cornerstone prophecy' },
  ],
  'Psalm 119:105': [
    { ref: '2 Peter 1:19', text: 'A light that shineth in a dark place, until the day dawn...', connection: 'Light of the word' },
    { ref: 'Proverbs 6:23', text: 'For the commandment is a lamp; and the Torah is light...', connection: 'Torah as light' },
  ],

  // ===================== PROVERBS =====================
  'Proverbs 3:5': [
    { ref: 'Psalm 37:5', text: 'Commit thy way unto Yahweh; trust also in him...', connection: 'Trust in Yahweh' },
    { ref: 'Jeremiah 17:7', text: 'Blessed is the man that trusteth in Yahweh...', connection: 'Blessing of trust' },
    { ref: 'Isaiah 26:3', text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee...', connection: 'Peace through trust' },
  ],
  'Proverbs 8:22': [
    { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with Elohim...', connection: 'Wisdom/Word at creation' },
    { ref: 'Colossians 1:15', text: 'Who is the image of the invisible Elohim, the firstborn of every creature...', connection: 'Firstborn of creation' },
    { ref: 'Sirach 24:9', text: 'He created me from the beginning before the world, and I shall never fail...', connection: 'Sirach on preexistent wisdom' },
    { ref: 'Wisdom 7:25', text: 'For she is the breath of the power of Elohim, and a pure influence flowing from the glory of the Almighty...', connection: 'Wisdom of Solomon on wisdom\'s nature' },
    { ref: 'Enoch 42:1', text: 'Wisdom found no place where she might dwell; then a dwelling-place was assigned her in the heavens...', connection: 'Enoch on wisdom\'s dwelling' },
  ],

  // ===================== ISAIAH =====================
  'Isaiah 7:14': [
    { ref: 'Matthew 1:23', text: 'Behold, a virgin shall be with child, and shall bring forth a son...', connection: 'Fulfilled in Yahshua\'s birth' },
    { ref: 'Luke 1:31', text: 'Behold, thou shalt conceive in thy womb, and bring forth a son...', connection: 'Angel announces fulfillment' },
  ],
  'Isaiah 9:6': [
    { ref: 'Luke 2:11', text: 'For unto you is born this day in the city of David a Saviour...', connection: 'Child born — fulfilled' },
    { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with Elohim...', connection: 'The mighty El, everlasting Father' },
    { ref: 'Ephesians 2:14', text: 'For he is our peace, who hath made both one...', connection: 'Prince of Peace' },
    { ref: 'Enoch 48:2', text: 'In that hour was the Son of Man named in the presence of Yahweh of Spirits...', connection: 'Enoch on the naming of the Son of Man' },
  ],
  'Isaiah 14:12': [
    { ref: 'Luke 10:18', text: 'I beheld Satan as lightning fall from heaven...', connection: 'Yahshua sees the fall' },
    { ref: 'Revelation 12:9', text: 'And the great dragon was cast out, that old serpent...', connection: 'Satan cast down' },
    { ref: 'Enoch 86:1', text: 'And again I saw with mine eyes as I slept, and I saw the heaven above, and behold a star fell from heaven...', connection: 'Enoch\'s vision of the fallen star' },
  ],
  'Isaiah 40:3': [
    { ref: 'Matthew 3:3', text: 'The voice of one crying in the wilderness...', connection: 'Yochanan the Immerser fulfills this' },
    { ref: 'Mark 1:3', text: 'The voice of one crying in the wilderness...', connection: 'Parallel account' },
    { ref: 'John 1:23', text: 'I am the voice of one crying in the wilderness...', connection: 'Yochanan identifies himself' },
  ],
  'Isaiah 42:1': [
    { ref: 'Matthew 12:18', text: 'Behold my servant, whom I have chosen; my beloved, in whom my soul is well pleased...', connection: 'Applied to Yahshua' },
    { ref: 'Matthew 3:17', text: 'This is my beloved Son, in whom I am well pleased...', connection: 'Voice at baptism echoes' },
    { ref: 'Enoch 48:4', text: 'He shall be a staff to the righteous and set-apart ones...', connection: 'Enoch on the chosen servant' },
  ],
  'Isaiah 52:13': [
    { ref: 'Acts 3:13', text: 'The Elohim of Abraham hath glorified his Son Yahshua...', connection: 'Servant exalted' },
    { ref: 'Philippians 2:9', text: 'Wherefore Elohim also hath highly exalted him...', connection: 'Exalted after humiliation' },
  ],
  'Isaiah 53:3': [
    { ref: 'John 1:11', text: 'He came unto his own, and his own received him not...', connection: 'Rejected by his own' },
    { ref: 'Luke 9:22', text: 'The Son of man must suffer many things, and be rejected...', connection: 'Rejection foretold' },
  ],
  'Isaiah 53:5': [
    { ref: '1 Peter 2:24', text: 'By whose stripes ye were healed...', connection: 'Healing through suffering' },
    { ref: 'Romans 4:25', text: 'Who was delivered for our offences, and was raised again for our justification...', connection: 'Wounded for our transgressions' },
    { ref: 'Matthew 8:17', text: 'Himself took our infirmities, and bare our sicknesses...', connection: 'Fulfilled in Yahshua\'s ministry' },
  ],
  'Isaiah 53:7': [
    { ref: 'Acts 8:32', text: 'He was led as a sheep to the slaughter...', connection: 'Ethiopian eunuch reads this passage' },
    { ref: 'John 1:29', text: 'Behold the Lamb of Elohim, which taketh away the sin of the world...', connection: 'The silent lamb' },
    { ref: '1 Peter 1:19', text: 'But with the precious blood of Messiah, as of a lamb without blemish...', connection: 'Lamb without blemish' },
  ],
  'Isaiah 61:1': [
    { ref: 'Luke 4:18', text: 'The Spirit of Yahweh is upon me, because he hath anointed me to preach the good news to the poor...', connection: 'Yahshua reads and fulfills this' },
    { ref: 'Matthew 11:5', text: 'The blind receive their sight, and the lame walk, the lepers are cleansed...', connection: 'Evidence of fulfillment' },
  ],

  // ===================== JEREMIAH =====================
  'Jeremiah 23:5': [
    { ref: 'Luke 1:32', text: 'He shall be great, and shall be called the Son of the Highest: and Yahweh Elohim shall give unto him the throne of his father David...', connection: 'Righteous Branch fulfilled' },
    { ref: 'Zechariah 3:8', text: 'I will bring forth my servant the Branch...', connection: 'Branch prophecy chain' },
    { ref: 'Revelation 22:16', text: 'I am the root and the offspring of David...', connection: 'Root of David' },
  ],
  'Jeremiah 29:11': [
    { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love Elohim...', connection: 'Yahweh\'s plan for good' },
    { ref: 'Proverbs 3:5', text: 'Trust in Yahweh with all thine heart...', connection: 'Trust in the plan' },
  ],
  'Jeremiah 31:31': [
    { ref: 'Hebrews 8:8', text: 'Behold, the days come, saith Yahweh, when I will make a new covenant...', connection: 'New covenant quoted in Hebrews' },
    { ref: 'Luke 22:20', text: 'This cup is the new testament in my blood, which is shed for you...', connection: 'Yahshua establishes the new covenant' },
    { ref: 'Hebrews 10:16', text: 'This is the covenant that I will make with them after those days, saith Yahweh...', connection: 'Torah written on hearts' },
  ],

  // ===================== EZEKIEL =====================
  'Ezekiel 37:1': [
    { ref: 'Revelation 20:12', text: 'And I saw the dead, small and great, stand before Elohim...', connection: 'Resurrection of the dead' },
    { ref: 'Romans 8:11', text: 'He that raised up Messiah from the dead shall also quicken your mortal bodies...', connection: 'Life from death' },
    { ref: 'Enoch 51:1', text: 'And in those days shall the earth also give back that which has been entrusted to it, and Sheol also shall give back that which it has received...', connection: 'Enoch on the resurrection' },
  ],

  // ===================== DANIEL =====================
  'Daniel 7:13': [
    { ref: 'Matthew 24:30', text: 'And they shall see the Son of man coming in the clouds of heaven with power and great glory...', connection: 'Yahshua\'s return' },
    { ref: 'Revelation 1:7', text: 'Behold, he cometh with clouds; and every eye shall see him...', connection: 'Coming on the clouds' },
    { ref: 'Mark 14:62', text: 'Ye shall see the Son of man sitting on the right hand of power, and coming in the clouds of heaven...', connection: 'Yahshua claims this before the Sanhedrin' },
    { ref: 'Enoch 46:1', text: 'And there I saw One who had a head of days, and His head was white like wool, and with Him was another being whose countenance had the appearance of a man...', connection: 'Enoch\'s Son of Man vision' },
    { ref: 'Enoch 48:2', text: 'In that hour was that Son of Man named In the presence of Yahweh of Spirits...', connection: 'Son of Man named before creation' },
  ],
  'Daniel 9:25': [
    { ref: 'John 1:41', text: 'We have found the Messiah, which is, being interpreted, the Anointed...', connection: 'Messiah the Prince identified' },
    { ref: 'Luke 3:1', text: 'In the fifteenth year of the reign of Tiberius Caesar...', connection: 'Timeline of Messiah\'s appearance' },
    { ref: 'Galatians 4:4', text: 'But when the fulness of the time was come, Elohim sent forth his Son...', connection: 'Appointed time fulfilled' },
  ],
  'Daniel 12:1': [
    { ref: 'Matthew 24:21', text: 'For then shall be great tribulation, such as was not since the beginning of the world...', connection: 'Time of trouble' },
    { ref: 'Revelation 12:7', text: 'And there was war in heaven: Michael and his angels fought against the dragon...', connection: 'Michael rises' },
    { ref: 'Enoch 20:5', text: 'Michael, one of the set-apart angels, to wit, he that is set over the best part of mankind and over chaos...', connection: 'Enoch on Michael\'s role' },
  ],

  // ===================== HOSEA =====================
  'Hosea 6:6': [
    { ref: 'Matthew 9:13', text: 'I will have mercy, and not sacrifice...', connection: 'Yahshua quotes Hosea' },
    { ref: 'Matthew 12:7', text: 'If ye had known what this meaneth, I will have mercy, and not sacrifice...', connection: 'Mercy over ritual' },
    { ref: '1 Samuel 15:22', text: 'Hath Yahweh as great delight in burnt offerings...as in obeying the voice of Yahweh?', connection: 'Obedience over sacrifice' },
  ],

  // ===================== JOEL =====================
  'Joel 2:28': [
    { ref: 'Acts 2:17', text: 'And it shall come to pass in the last days, saith Elohim, I will pour out of my Spirit upon all flesh...', connection: 'Fulfilled at Pentecost' },
    { ref: 'Ezekiel 39:29', text: 'Neither will I hide my face any more from them: for I have poured out my spirit upon the house of Yisra\'el...', connection: 'Spirit outpouring promised' },
  ],

  // ===================== AMOS =====================
  'Amos 3:7': [
    { ref: 'Revelation 10:7', text: 'In the days of the voice of the seventh angel...the mystery of Elohim should be finished, as he hath declared to his servants the prophets...', connection: 'Prophetic pattern' },
    { ref: '2 Peter 1:21', text: 'For the prophecy came not in old time by the will of man: but set-apart men of Elohim spake...', connection: 'Prophets as vessels' },
  ],

  // ===================== MICAH =====================
  'Micah 5:2': [
    { ref: 'Matthew 2:6', text: 'And thou Bethlehem, in the land of Yahudah, art not the least among the princes of Yahudah...', connection: 'Birth in Bethlehem fulfilled' },
    { ref: 'John 7:42', text: 'Hath not the scripture said, That Messiah cometh of the seed of David, and out of the town of Bethlehem?', connection: 'People knew the prophecy' },
    { ref: 'Luke 2:4', text: 'And Yoseph also went up from Galilee, out of the city of Nazareth, into Yahudah, unto the city of David, which is called Bethlehem...', connection: 'Journey to Bethlehem' },
  ],

  // ===================== ZECHARIAH =====================
  'Zechariah 9:9': [
    { ref: 'Matthew 21:5', text: 'Tell ye the daughter of Tsiyon, Behold, thy King cometh unto thee, meek, and sitting upon a donkey...', connection: 'Triumphal entry fulfilled' },
    { ref: 'John 12:15', text: 'Fear not, daughter of Tsiyon: behold, thy King cometh, sitting on a donkey\'s colt...', connection: 'John records fulfillment' },
  ],
  'Zechariah 12:10': [
    { ref: 'John 19:37', text: 'And again another scripture saith, They shall look on him whom they pierced...', connection: 'Piercing fulfilled' },
    { ref: 'Revelation 1:7', text: 'And every eye shall see him, and they also which pierced him...', connection: 'Future mourning' },
    { ref: 'Psalm 22:16', text: 'They pierced my hands and my feet...', connection: 'Psalm parallel' },
  ],

  // ===================== MALACHI =====================
  'Malachi 3:1': [
    { ref: 'Matthew 11:10', text: 'Behold, I send my messenger before thy face, which shall prepare thy way before thee...', connection: 'Applied to Yochanan' },
    { ref: 'Mark 1:2', text: 'Behold, I send my messenger before thy face...', connection: 'Messenger prophecy' },
    { ref: 'Luke 7:27', text: 'Behold, I send my messenger before thy face, which shall prepare thy way before thee...', connection: 'Yahshua identifies the messenger' },
  ],
  'Malachi 4:5': [
    { ref: 'Matthew 17:12', text: 'Elijah is come already, and they knew him not...', connection: 'Yochanan as Elijah' },
    { ref: 'Luke 1:17', text: 'And he shall go before him in the spirit and power of Elijah...', connection: 'Angel announces Yochanan\'s role' },
    { ref: 'Sirach 48:10', text: 'Who wast ordained for reproofs in their times, to pacify the wrath of Yahweh\'s judgment...', connection: 'Sirach on Elijah\'s return' },
  ],

  // ===================== MATTHEW =====================
  'Matthew 1:23': [
    { ref: 'Isaiah 7:14', text: 'Therefore Yahweh himself shall give you a sign; Behold, a virgin shall conceive...', connection: 'Original prophecy' },
  ],
  'Matthew 4:4': [
    { ref: 'Deuteronomy 8:3', text: 'Man doth not live by bread only, but by every word that proceedeth out of the mouth of Yahweh...', connection: 'Yahshua quotes Torah' },
    { ref: 'Luke 4:4', text: 'It is written, That man shall not live by bread alone, but by every word of Elohim...', connection: 'Luke parallel' },
  ],
  'Matthew 5:17': [
    { ref: 'Romans 3:31', text: 'Do we then make void the Torah through faith? Certainly not...', connection: 'Torah not abolished' },
    { ref: 'Romans 10:4', text: 'For Messiah is the goal of the Torah for righteousness...', connection: 'Messiah the aim of Torah' },
    { ref: 'Luke 16:17', text: 'It is easier for heaven and earth to pass, than one tittle of the Torah to fail...', connection: 'Torah endures' },
    { ref: 'Psalm 119:142', text: 'Thy righteousness is an everlasting righteousness, and thy Torah is the truth...', connection: 'Torah = truth' },
  ],
  'Matthew 24:37': [
    { ref: 'Genesis 6:5', text: 'And Elohim saw that the wickedness of man was great in the earth...', connection: 'Days of Noah' },
    { ref: 'Luke 17:26', text: 'And as it was in the days of Noah, so shall it be also in the days of the Son of man...', connection: 'Parallel account' },
    { ref: 'Enoch 1:3', text: 'Concerning the elect I said, and took up my parable concerning them: The Set-apart Great One will come forth from His dwelling...', connection: 'Enoch prophesies the coming judgment' },
    { ref: '2 Peter 3:6', text: 'Whereby the world that then was, being overflowed with water, perished...', connection: 'Peter references the flood' },
    { ref: 'Jasher 6:11', text: 'And on that day, Yahweh caused the whole earth to shake...', connection: 'Jasher flood account' },
  ],
  'Matthew 28:19': [
    { ref: 'Acts 1:8', text: 'Ye shall be witnesses unto me...unto the uttermost part of the earth...', connection: 'Great commission in action' },
    { ref: 'Mark 16:15', text: 'Go ye into all the world, and proclaim the good news to every creature...', connection: 'Parallel commission' },
    { ref: 'Acts 2:38', text: 'Repent, and be immersed every one of you in the name of Yahshua Messiah...', connection: 'Commission carried out' },
  ],

  // ===================== JOHN =====================
  'John 1:1': [
    { ref: 'Genesis 1:1', text: 'In the beginning Elohim created the heaven and the earth...', connection: 'Parallel opening — the Word at creation' },
    { ref: '1 John 1:1', text: 'That which was from the beginning, which we have heard...', connection: 'The Word of life' },
    { ref: 'Revelation 19:13', text: 'And his name is called The Word of Elohim...', connection: 'The Word identified' },
    { ref: 'Proverbs 8:22', text: 'Yahweh possessed me in the beginning of his way...', connection: 'Wisdom at creation' },
    { ref: 'Colossians 1:17', text: 'He is before all things, and by him all things consist...', connection: 'Pre-existence of the Word' },
    { ref: 'Wisdom 9:1', text: 'O Elohim of my fathers, and Master of mercy, who hast made all things with thy word...', connection: 'Wisdom of Solomon on the creative Word' },
  ],
  'John 1:14': [
    { ref: 'Philippians 2:7', text: 'But made himself of no reputation, and took upon him the form of a servant...', connection: 'The Word made flesh' },
    { ref: '1 Timothy 3:16', text: 'Elohim was manifest in the flesh...', connection: 'Mystery of the incarnation' },
    { ref: 'Hebrews 2:14', text: 'Forasmuch as the children are partakers of flesh and blood, he also took part of the same...', connection: 'Partook of flesh' },
    { ref: 'Sirach 24:8', text: 'The Creator of all things gave me a commandment...He said, Let thy dwelling be in Ya\'akov...', connection: 'Wisdom tabernacles with Israel' },
  ],
  'John 1:29': [
    { ref: 'Exodus 12:3', text: 'In the tenth day of this month they shall take to them every man a lamb...', connection: 'Passover lamb origin' },
    { ref: 'Isaiah 53:7', text: 'He is brought as a lamb to the slaughter...', connection: 'Suffering servant as lamb' },
    { ref: '1 Peter 1:19', text: 'But with the precious blood of Messiah, as of a lamb without blemish...', connection: 'Spotless lamb' },
    { ref: 'Revelation 5:6', text: 'And I beheld, and lo, in the midst of the throne...stood a Lamb as it had been slain...', connection: 'The slain Lamb on the throne' },
  ],
  'John 3:14': [
    { ref: 'Numbers 21:9', text: 'And Mosheh made a serpent of brass, and put it upon a pole...', connection: 'Bronze serpent — type of Messiah' },
    { ref: 'John 12:32', text: 'And I, if I be lifted up from the earth, will draw all men unto me...', connection: 'Lifted up on the cross' },
  ],
  'John 3:16': [
    { ref: 'Romans 5:8', text: 'Elohim commendeth his love toward us, in that while we were yet sinners, Messiah died for us...', connection: 'The depth of Elohim\'s love' },
    { ref: '1 John 4:9', text: 'In this was manifested the love of Elohim toward us...', connection: 'Love through the Son' },
    { ref: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of Elohim is eternal life through Yahshua Messiah...', connection: 'Gift of eternal life' },
    { ref: 'Galatians 2:20', text: 'The Son of Elohim, who loved me, and gave himself for me...', connection: 'Personal application of the love' },
  ],
  'John 6:35': [
    { ref: 'Exodus 16:4', text: 'Then said Yahweh unto Mosheh, Behold, I will rain bread from heaven for you...', connection: 'Manna from heaven — type' },
    { ref: 'John 6:51', text: 'I am the living bread which came down from heaven...', connection: 'Living bread declared' },
    { ref: 'Wisdom 16:20', text: 'Thou didst give thy people the food of angels, and didst send them from heaven bread...', connection: 'Wisdom on heavenly bread' },
  ],
  'John 10:11': [
    { ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall not want...', connection: 'Yahweh the shepherd' },
    { ref: 'Ezekiel 34:11', text: 'For thus saith Yahweh Elohim; Behold, I, even I, will both search my sheep, and seek them out...', connection: 'Yahweh seeks His sheep' },
    { ref: 'Isaiah 40:11', text: 'He shall feed his flock like a shepherd...', connection: 'Shepherd prophecy' },
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
  ],
  'John 15:1': [
    { ref: 'Isaiah 5:1', text: 'Now will I sing to my wellbeloved a song of my beloved touching his vineyard...', connection: 'Yahweh\'s vineyard' },
    { ref: 'Psalm 80:8', text: 'Thou hast brought a vine out of Mitsrayim...', connection: 'Yisra\'el the vine' },
  ],

  // ===================== ACTS =====================
  'Acts 2:38': [
    { ref: 'Matthew 28:19', text: 'Go ye therefore, and teach all nations, immersing them...', connection: 'Great commission' },
    { ref: 'Acts 22:16', text: 'Arise, and be immersed, and wash away thy sins, calling on the name of Yahshua...', connection: 'Paul\'s immersion' },
    { ref: 'Romans 6:4', text: 'We are buried with him by immersion into death...', connection: 'Immersion symbolism' },
  ],

  // ===================== ROMANS =====================
  'Romans 1:17': [
    { ref: 'Habakkuk 2:4', text: 'The just shall live by his faith...', connection: 'Paul quotes Habakkuk' },
    { ref: 'Galatians 3:11', text: 'The just shall live by faith...', connection: 'Repeated in Galatians' },
    { ref: 'Hebrews 10:38', text: 'Now the just shall live by faith...', connection: 'Repeated in Hebrews' },
  ],
  'Romans 3:23': [
    { ref: 'Romans 5:12', text: 'By one man sin entered into the world, and death by sin...', connection: 'All have sinned — origin' },
    { ref: 'Ecclesiastes 7:20', text: 'There is not a just man upon earth, that doeth good, and sinneth not...', connection: 'Universal sinfulness' },
    { ref: '1 John 1:8', text: 'If we say that we have no sin, we deceive ourselves...', connection: 'No one is without sin' },
    { ref: 'Isaiah 64:6', text: 'We are all as an unclean thing, and all our righteousnesses are as filthy rags...', connection: 'Human righteousness falls short' },
  ],
  'Romans 6:23': [
    { ref: 'John 3:16', text: 'For Elohim so loved the world, that he gave his only begotten Son...', connection: 'The gift of life' },
    { ref: 'Ezekiel 18:20', text: 'The soul that sinneth, it shall die...', connection: 'Wages of sin = death' },
    { ref: 'Genesis 2:17', text: 'For in the day that thou eatest thereof thou shalt surely die...', connection: 'Death promised for disobedience' },
  ],
  'Romans 8:28': [
    { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith Yahweh...', connection: 'Yahweh\'s plan for good' },
    { ref: 'Genesis 50:20', text: 'Ye thought evil against me; but Elohim meant it unto good...', connection: 'Evil turned to good' },
  ],

  // ===================== 1 CORINTHIANS =====================
  ' Corinthians 15:45': [
    { ref: 'Genesis 2:7', text: 'And Yahweh Elohim formed man of the dust of the ground...', connection: 'First Adam' },
    { ref: 'Romans 5:14', text: 'Death reigned from Adam to Mosheh, even over them that had not sinned after the similitude of Adam\'s transgression...', connection: 'Adam as a type' },
  ],

  // ===================== HEBREWS =====================
  'Hebrews 11:1': [
    { ref: 'Romans 8:24', text: 'For we are saved by hope: but hope that is seen is not hope...', connection: 'Hope in the unseen' },
    { ref: '2 Corinthians 5:7', text: 'For we walk by faith, not by sight...', connection: 'Faith over sight' },
  ],
  'Hebrews 11:5': [
    { ref: 'Genesis 5:24', text: 'And Enoch walked with Elohim: and he was not; for Elohim took him...', connection: 'Genesis account of Enoch' },
    { ref: 'Enoch 1:1', text: 'The words of the blessing of Enoch, wherewith he blessed the elect and righteous...', connection: 'Enoch\'s own testimony' },
    { ref: 'Jude 1:14', text: 'And Enoch also, the seventh from Adam, prophesied of these...', connection: 'Jude quotes from Enoch' },
    { ref: 'Sirach 44:16', text: 'Enoch pleased Yahweh, and was translated...', connection: 'Sirach on Enoch' },
  ],

  // ===================== JUDE =====================
  'Jude 1:6': [
    { ref: 'Genesis 6:1', text: 'The sons of Elohim saw the daughters of men that they were fair...', connection: 'The Watchers incident' },
    { ref: 'Enoch 6:1', text: 'And it came to pass when the children of men had multiplied...the angels, the children of the heaven, saw and lusted after them...', connection: 'Enoch\'s Watchers account' },
    { ref: '2 Peter 2:4', text: 'For if Elohim spared not the angels that sinned, but cast them down to tartarus...', connection: 'Peter on fallen angels' },
    { ref: 'Enoch 10:4', text: 'And again Yahweh said to Raphael: Bind Azazel hand and foot, and cast him into the darkness...', connection: 'Enoch on the binding of the Watchers' },
  ],
  'Jude 1:9': [
    { ref: 'Daniel 12:1', text: 'And at that time shall Michael stand up, the great prince...', connection: 'Michael the archangel' },
    { ref: 'Zechariah 3:2', text: 'And Yahweh said unto Satan, Yahweh rebuke thee, O Satan...', connection: 'Rebuke pattern' },
    { ref: 'Enoch 20:5', text: 'Michael, one of the set-apart angels, to wit, he that is set over the best part of mankind...', connection: 'Enoch on Michael' },
  ],
  'Jude 1:14': [
    { ref: 'Genesis 5:24', text: 'And Enoch walked with Elohim: and he was not; for Elohim took him...', connection: 'Enoch in Genesis' },
    { ref: 'Enoch 1:9', text: 'And behold! He cometh with ten thousands of His set-apart ones to execute judgment upon all...', connection: 'The actual quote from Enoch Jude references' },
    { ref: 'Enoch 2:1', text: 'Observe ye everything that takes place in the heaven...', connection: 'Enoch\'s prophetic witness' },
    { ref: 'Deuteronomy 33:2', text: 'Yahweh came from Sinai, and rose up from Seir unto them; he came with ten thousands of set-apart ones...', connection: 'Torah parallel — coming with the set-apart ones' },
  ],

  // ===================== REVELATION =====================
  'Revelation 1:7': [
    { ref: 'Daniel 7:13', text: 'One like the Son of man came with the clouds of heaven...', connection: 'Son of Man on the clouds' },
    { ref: 'Zechariah 12:10', text: 'And they shall look upon me whom they have pierced...', connection: 'Mourning for the pierced one' },
    { ref: 'Matthew 24:30', text: 'They shall see the Son of man coming in the clouds of heaven with power and great glory...', connection: 'Yahshua prophesies his return' },
  ],
  'Revelation 1:8': [
    { ref: 'Isaiah 44:6', text: 'I am the first, and I am the last; and beside me there is no Elohim...', connection: 'Alpha and Omega — the Eternal' },
    { ref: 'Revelation 22:13', text: 'I am Alpha and Omega, the beginning and the end...', connection: 'Bookend declaration' },
    { ref: 'Exodus 3:14', text: 'I AM THAT I AM...', connection: 'The self-existent One' },
  ],
  'Revelation 5:5': [
    { ref: 'Genesis 49:10', text: 'The sceptre shall not depart from Yahudah...', connection: 'Lion of Judah from Genesis' },
    { ref: 'Isaiah 11:1', text: 'And there shall come forth a rod out of the stem of Jesse...', connection: 'Root of David' },
    { ref: 'Hebrews 7:14', text: 'For it is evident that our Master sprang out of Yahudah...', connection: 'Tribe of Judah' },
  ],
  'Revelation 12:7': [
    { ref: 'Daniel 10:13', text: 'But the prince of the kingdom of Persia withstood me one and twenty days: but, lo, Michael, one of the chief princes, came to help me...', connection: 'Michael wars in the heavenly realm' },
    { ref: 'Daniel 12:1', text: 'And at that time shall Michael stand up, the great prince which standeth for the children of thy people...', connection: 'Michael defends Yisra\'el' },
    { ref: 'Enoch 54:6', text: 'And Michael, and Gabriel, and Raphael, and Phanuel shall take hold of them on that great day...', connection: 'Enoch on the archangels in the final judgment' },
  ],
  'Revelation 12:9': [
    { ref: 'Genesis 3:1', text: 'Now the serpent was more subtil than any beast of the field...', connection: 'Original serpent from Genesis' },
    { ref: 'Isaiah 14:12', text: 'How art thou fallen from heaven, O Helel, son of the morning...', connection: 'Fall of the adversary' },
    { ref: 'Enoch 86:1', text: 'And again I saw with mine eyes as I slept, and I saw the heaven above, and behold a star fell from heaven...', connection: 'Enoch sees the fall' },
    { ref: 'Luke 10:18', text: 'I beheld Satan as lightning fall from heaven...', connection: 'Yahshua witnesses the fall' },
  ],
  'Revelation 19:13': [
    { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with Elohim, and the Word was Elohim...', connection: 'The Word identified' },
    { ref: 'John 1:14', text: 'And the Word was made flesh, and dwelt among us...', connection: 'The Word incarnate' },
    { ref: 'Hebrews 4:12', text: 'For the word of Elohim is quick, and powerful, and sharper than any twoedged sword...', connection: 'The living Word' },
  ],
  'Revelation 20:12': [
    { ref: 'Daniel 7:10', text: 'The judgment was set, and the books were opened...', connection: 'Books of judgment opened' },
    { ref: 'Enoch 47:3', text: 'In those days I saw the Head of Days when He seated himself upon the throne of His glory, and the books of the living were opened before Him...', connection: 'Enoch on the heavenly books' },
    { ref: 'Enoch 90:20', text: 'And I saw till a throne was erected in the pleasant land, and the Yahweh of the sheep sat Himself thereon, and the other took the sealed books and opened those books before the Yahweh of the sheep...', connection: 'Enoch\'s animal vision of judgment' },
  ],
  'Revelation 21:1': [
    { ref: 'Isaiah 65:17', text: 'For, behold, I create new heavens and a new earth...', connection: 'Isaiah\'s new creation promise' },
    { ref: '2 Peter 3:13', text: 'We, according to his promise, look for new heavens and a new earth, wherein dwelleth righteousness...', connection: 'Peter on the new earth' },
    { ref: 'Enoch 45:4', text: 'I will transform the heaven and make it an eternal blessing and light...', connection: 'Enoch on the new creation' },
  ],
  'Revelation 21:4': [
    { ref: 'Isaiah 25:8', text: 'He will swallow up death in victory; and Yahweh Elohim will wipe away tears...', connection: 'No more tears — prophesied' },
    { ref: '1 Corinthians 15:54', text: 'Death is swallowed up in victory...', connection: 'Victory over death' },
  ],

  // ===================== ENOCH (cross-linked from Enoch outward) =====================
  'Enoch 1:1': [
    { ref: 'Genesis 5:24', text: 'And Enoch walked with Elohim: and he was not; for Elohim took him...', connection: 'Genesis account of Enoch' },
    { ref: 'Jude 1:14', text: 'And Enoch also, the seventh from Adam, prophesied of these, saying...', connection: 'Jude quotes Enoch' },
    { ref: 'Hebrews 11:5', text: 'By faith Enoch was translated that he should not see death...', connection: 'Hebrews on Enoch\'s faith' },
  ],
  'Enoch 1:9': [
    { ref: 'Jude 1:14', text: 'Behold, Yahweh cometh with ten thousands of his set-apart ones...', connection: 'Jude directly quotes this verse' },
    { ref: 'Deuteronomy 33:2', text: 'Yahweh came from Sinai...he came with ten thousands of set-apart ones...', connection: 'Torah parallel' },
    { ref: 'Zechariah 14:5', text: 'And Yahweh my Elohim shall come, and all the set-apart ones with thee...', connection: 'Coming with the set-apart ones' },
  ],
  'Enoch 6:1': [
    { ref: 'Genesis 6:1', text: 'And it came to pass, when men began to multiply on the face of the earth, and daughters were born unto them...', connection: 'Genesis Watcher account' },
    { ref: 'Jude 1:6', text: 'And the angels which kept not their first estate...', connection: 'Jude on the fallen angels' },
    { ref: '2 Peter 2:4', text: 'For if Elohim spared not the angels that sinned...', connection: 'Peter on fallen angels' },
    { ref: 'Jubilees 5:1', text: 'And it came to pass when the children of men began to multiply...the angels of Yahweh saw them...', connection: 'Jubilees parallel' },
  ],
  'Enoch 7:1': [
    { ref: 'Genesis 6:4', text: 'There were giants in the earth in those days...', connection: 'The Nephilim' },
    { ref: 'Numbers 13:33', text: 'And there we saw the giants, the sons of Anak...', connection: 'Giants in Canaan' },
    { ref: 'Baruch 3:26', text: 'There were the giants famous from the beginning...', connection: 'Baruch on the ancient giants' },
  ],
  'Enoch 10:4': [
    { ref: 'Revelation 20:2', text: 'And he laid hold on the dragon, that old serpent, which is the Devil, and Satan, and bound him a thousand years...', connection: 'Binding pattern — Azazel to Satan' },
    { ref: 'Jude 1:6', text: 'And the angels which kept not their first estate, he hath reserved in everlasting chains under darkness...', connection: 'Chains of darkness' },
    { ref: 'Leviticus 16:10', text: 'But the goat, on which the lot fell to be the scapegoat, shall be presented alive...', connection: 'Azazel — the scapegoat connection' },
  ],
  'Enoch 46:1': [
    { ref: 'Daniel 7:9', text: 'I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow...', connection: 'Ancient of Days parallel' },
    { ref: 'Daniel 7:13', text: 'One like the Son of man came with the clouds of heaven...', connection: 'Son of Man vision' },
    { ref: 'Revelation 1:14', text: 'His head and his hairs were white like wool, as white as snow...', connection: 'White-haired figure in Revelation' },
  ],
  'Enoch 48:2': [
    { ref: 'John 17:5', text: 'And now, O Father, glorify thou me with thine own self with the glory which I had with thee before the world was...', connection: 'Pre-existence of the Son' },
    { ref: 'Colossians 1:15', text: 'Who is the image of the invisible Elohim, the firstborn of every creature...', connection: 'Named before creation' },
    { ref: 'Micah 5:2', text: 'Whose goings forth have been from of old, from everlasting...', connection: 'From everlasting' },
  ],
  'Enoch 72:1': [
    { ref: 'Genesis 1:14', text: 'And Elohim said, Let there be lights in the firmament of the heaven to divide the day from the night...', connection: 'Luminaries for appointed times' },
    { ref: 'Psalm 19:1', text: 'The heavens declare the glory of El; and the firmament sheweth his handywork...', connection: 'Heavens declare glory' },
    { ref: 'Jubilees 2:8', text: 'And Elohim appointed the sun to be a great sign on the earth for days and for shabbats...', connection: 'Jubilees calendar parallel' },
  ],
  'Enoch 89:1': [
    { ref: 'Genesis 7:11', text: 'The same day were all the fountains of the great deep broken up...', connection: 'The flood begins' },
    { ref: '2 Peter 3:6', text: 'The world that then was, being overflowed with water, perished...', connection: 'Peter on the flood' },
  ],
  'Enoch 91:12': [
    { ref: 'Revelation 21:1', text: 'And I saw a new heaven and a new earth...', connection: 'New heaven and earth' },
    { ref: 'Isaiah 65:17', text: 'For, behold, I create new heavens and a new earth...', connection: 'New creation promised' },
    { ref: '2 Peter 3:13', text: 'We look for new heavens and a new earth, wherein dwelleth righteousness...', connection: 'New earth of righteousness' },
  ],

  // ===================== JUBILEES (cross-linked outward) =====================
  'Jubilees 2:1': [
    { ref: 'Genesis 1:1', text: 'In the beginning Elohim created the heaven and the earth...', connection: 'Genesis creation account' },
    { ref: 'Exodus 20:11', text: 'For in six days Yahweh made heaven and earth...', connection: 'Six-day creation affirmed' },
  ],
  'Jubilees 2:24': [
    { ref: 'Genesis 2:2', text: 'And on the seventh day Elohim ended his work...and he rested on the seventh day...', connection: 'Shabbat origin' },
    { ref: 'Exodus 20:8', text: 'Remember the shabbat day, to keep it set-apart...', connection: 'Shabbat commandment' },
    { ref: 'Hebrews 4:9', text: 'There remaineth therefore a rest to the people of Elohim...', connection: 'Shabbat rest continues' },
  ],
  'Jubilees 4:23': [
    { ref: 'Genesis 5:24', text: 'And Enoch walked with Elohim: and he was not; for Elohim took him...', connection: 'Enoch taken in Genesis' },
    { ref: 'Enoch 1:1', text: 'The words of the blessing of Enoch...', connection: 'Enoch\'s own words' },
    { ref: 'Hebrews 11:5', text: 'By faith Enoch was translated...', connection: 'Translation by faith' },
  ],
  'Jubilees 5:1': [
    { ref: 'Genesis 6:1', text: 'The sons of Elohim saw the daughters of men...', connection: 'Watchers in Genesis' },
    { ref: 'Enoch 6:1', text: 'The angels, the children of the heaven, saw and lusted after them...', connection: 'Enoch\'s detailed Watcher account' },
    { ref: 'Jude 1:6', text: 'And the angels which kept not their first estate...', connection: 'Jude on fallen angels' },
  ],
  'Jubilees 6:7': [
    { ref: 'Genesis 9:4', text: 'But flesh with the life thereof, which is the blood thereof, shall ye not eat...', connection: 'Blood prohibition' },
    { ref: 'Leviticus 17:14', text: 'For the life of all flesh is the blood thereof...', connection: 'Life in the blood' },
    { ref: 'Acts 15:20', text: 'Abstain from...blood...', connection: 'Noahide laws in Acts' },
  ],
  'Jubilees 49:1': [
    { ref: 'Exodus 12:3', text: 'In the tenth day of this month they shall take to them every man a lamb...', connection: 'Passover lamb' },
    { ref: '1 Corinthians 5:7', text: 'For even Messiah our passover is sacrificed for us...', connection: 'Messiah our Passover' },
    { ref: 'Luke 22:15', text: 'With desire I have desired to eat this passover with you before I suffer...', connection: 'Yahshua\'s last Passover' },
  ],

  // ===================== JASHER (cross-linked outward) =====================
  'Jasher 1:25': [
    { ref: 'Genesis 4:8', text: 'And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him...', connection: 'Genesis murder account' },
    { ref: '1 John 3:12', text: 'Not as Cain, who was of that wicked one, and slew his brother...', connection: 'Cain\'s wickedness' },
    { ref: 'Hebrews 11:4', text: 'By faith Abel offered unto Elohim a more excellent sacrifice than Cain...', connection: 'Abel\'s faith' },
  ],
  'Jasher 3:36': [
    { ref: 'Genesis 5:24', text: 'And Enoch walked with Elohim: and he was not; for Elohim took him...', connection: 'Enoch\'s translation' },
    { ref: '2 Kings 2:11', text: 'And Elijah went up by a whirlwind into heaven...', connection: 'Similar ascension pattern' },
    { ref: 'Enoch 1:1', text: 'The words of the blessing of Enoch...', connection: 'Enoch\'s own account' },
  ],
  'Jasher 7:23': [
    { ref: 'Genesis 10:8', text: 'And Cush begat Nimrod: he began to be a mighty one in the earth...', connection: 'Nimrod in Genesis' },
    { ref: 'Micah 5:6', text: 'And they shall waste the land of Assyria...and the land of Nimrod...', connection: 'Nimrod\'s legacy' },
  ],
  'Jasher 9:20': [
    { ref: 'Genesis 11:4', text: 'And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven...', connection: 'Tower of Babel in Genesis' },
    { ref: 'Jubilees 10:18', text: 'And Yahweh sent a mighty wind against the tower and overthrew it...', connection: 'Jubilees on the tower' },
  ],
  'Jasher 16:11': [
    { ref: 'Genesis 14:18', text: 'And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high Elohim...', connection: 'Melchizedek in Genesis' },
    { ref: 'Hebrews 7:1', text: 'For this Melchisedec, king of Salem, priest of the most high Elohim...', connection: 'Hebrews on Melchizedek' },
    { ref: 'Psalm 110:4', text: 'Thou art a priest for ever after the order of Melchizedek...', connection: 'Eternal priesthood' },
  ],

  // ===================== WISDOM OF SOLOMON =====================
  'Wisdom 2:23': [
    { ref: 'Genesis 1:26', text: 'And Elohim said, Let us make man in our image, after our likeness...', connection: 'Image of Elohim' },
    { ref: 'Romans 5:12', text: 'Wherefore, as by one man sin entered into the world, and death by sin...', connection: 'Death through sin — not design' },
  ],
  'Wisdom 7:25': [
    { ref: 'Hebrews 1:3', text: 'Who being the brightness of his glory, and the express image of his person...', connection: 'Radiance of glory parallel' },
    { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with Elohim...', connection: 'Word/Wisdom parallel' },
    { ref: 'Colossians 1:15', text: 'Who is the image of the invisible Elohim, the firstborn of every creature...', connection: 'Image of the invisible' },
  ],

  // ===================== SIRACH =====================
  'Sirach 24:8': [
    { ref: 'John 1:14', text: 'And the Word was made flesh, and dwelt among us...', connection: 'Wisdom/Word tabernacles with Yisra\'el' },
    { ref: 'Exodus 25:8', text: 'And let them make me a sanctuary; that I may dwell among them...', connection: 'Dwelling among the people' },
  ],
  'Sirach 44:16': [
    { ref: 'Genesis 5:24', text: 'And Enoch walked with Elohim: and he was not; for Elohim took him...', connection: 'Enoch in Genesis' },
    { ref: 'Hebrews 11:5', text: 'By faith Enoch was translated...', connection: 'Faith of Enoch' },
    { ref: 'Enoch 1:1', text: 'The words of the blessing of Enoch...', connection: 'Enoch\'s own book' },
  ],

  // ===================== TOBIT =====================
  'Tobit 4:15': [
    { ref: 'Matthew 7:12', text: 'Therefore all things whatsoever ye would that men should do to you, do ye even so to them...', connection: 'The golden rule — Yahshua echoes Tobit' },
    { ref: 'Luke 6:31', text: 'And as ye would that men should do to you, do ye also to them likewise...', connection: 'Luke\'s golden rule parallel' },
  ],

  // ===================== BARUCH =====================
  'Baruch 3:26': [
    { ref: 'Genesis 6:4', text: 'There were giants in the earth in those days...', connection: 'The Nephilim from Genesis' },
    { ref: 'Enoch 7:2', text: 'And they became pregnant, and they bare great giants...', connection: 'Enoch on the giants' },
    { ref: 'Wisdom 14:6', text: 'In the old time also, when the proud giants perished...', connection: 'Wisdom on the giants' },
  ],

  // ===================== 2 ESDRAS =====================
  '2 Esdras 7:28': [
    { ref: 'Revelation 20:4', text: 'And they lived and reigned with Messiah a thousand years...', connection: 'Messianic reign' },
    { ref: 'Daniel 7:14', text: 'And there was given him dominion, and glory, and a kingdom...', connection: 'Kingdom given to the Son of Man' },
    { ref: 'Enoch 48:10', text: 'For they have denied Yahweh of Spirits and His Anointed...', connection: 'Enoch on the Anointed One\'s reign' },
  ],

  // ===================== 1 MACCABEES =====================
  '1 Maccabees 2:52': [
    { ref: 'Genesis 15:6', text: 'And he believed in Yahweh; and he counted it to him for righteousness...', connection: 'Abraham\'s faith' },
    { ref: 'James 2:23', text: 'Abraham believed Elohim, and it was imputed unto him for righteousness: and he was called the Friend of Elohim...', connection: 'James on Abraham' },
    { ref: 'Hebrews 11:17', text: 'By faith Abraham, when he was tried, offered up Isaac...', connection: 'Abraham\'s test of faith' },
  ],

  // ===================== GOSPEL OF THOMAS =====================
  'Gospel of Thomas 77': [
    { ref: 'John 8:12', text: 'I am the light of the world: he that followeth me shall not walk in darkness...', connection: 'Yahshua the light' },
    { ref: 'Colossians 1:17', text: 'He is before all things, and by him all things consist...', connection: 'All things hold together through him' },
    { ref: 'Jeremiah 23:24', text: 'Do not I fill heaven and earth? saith Yahweh...', connection: 'Omnipresence' },
  ],
  'Gospel of Thomas 3': [
    { ref: 'Luke 17:21', text: 'The kingdom of Elohim is within you...', connection: 'Kingdom within' },
    { ref: 'Romans 14:17', text: 'For the kingdom of Elohim is not meat and drink; but righteousness, and peace, and joy in the Set-apart Spirit...', connection: 'Kingdom is spiritual' },
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
