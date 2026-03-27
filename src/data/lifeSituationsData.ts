export interface LifeSituation {
  id: string;
  title: string;
  icon: string;
  overview: string;
  scriptures: { ref: string; application: string }[];
  principles: string[];
  actionSteps: string[];
}

export const lifeSituations: LifeSituation[] = [
  {
    id: 'enemies',
    title: 'Dealing with Enemies',
    icon: '⚔️',
    overview: 'How do you handle people who come against you? Not with worldly revenge — but with wisdom, boundaries, and trust in Yahweh\'s justice.',
    scriptures: [
      { ref: 'Psalm 27:1-3', application: 'Yahweh is your light and salvation. Fear of people shrinks when you see Yahweh clearly.' },
      { ref: 'Romans 12:19-21', application: 'Vengeance belongs to Yahweh. Overcome evil with good — not with weakness, but with strategic righteousness.' },
      { ref: 'Proverbs 25:21-22', application: 'Feeding your enemy heaps burning coals on his head. Kindness is not weakness — it is a weapon.' },
      { ref: 'Psalm 35:1-8', application: 'David asked Yahweh to fight his battles. You can do the same — but you must also stay clean.' },
      { ref: 'Matthew 5:44', application: 'Pray for those who persecute you. This is not natural — it requires supernatural strength.' },
    ],
    principles: [
      'Do not seek revenge — trust Yahweh\'s timing and justice.',
      'Set boundaries. Forgiveness does not mean access.',
      'Pray for your enemies — it changes YOUR heart more than theirs.',
      'Stay righteous even when wronged. Your conduct is your testimony.',
    ],
    actionSteps: [
      'Identify one person you hold resentment toward. Bring their name before Yahweh in prayer this week.',
      'Read Psalm 35 and 37 — David\'s model for handling enemies through trust in Yahweh.',
      'Write down how Yahweh has protected you from enemies in the past. Build faith for the present.',
    ],
  },
  {
    id: 'money',
    title: 'Money, Greed & Wealth',
    icon: '💰',
    overview: 'Money is not evil — the LOVE of money is. Learn to handle wealth with discipline, generosity, and a kingdom mindset.',
    scriptures: [
      { ref: '1 Timothy 6:10', application: 'The love of money is the root of all evil. Not money itself — the love of it. Check your heart.' },
      { ref: 'Proverbs 13:11', application: 'Wealth gained hastily will dwindle. Steady, disciplined work builds lasting wealth.' },
      { ref: 'Deuteronomy 8:18', application: 'It is Yahweh who gives you the power to get wealth. Do not forget the source.' },
      { ref: 'Matthew 6:19-21', application: 'Store up treasures in heaven. Where your treasure is, there your heart will be.' },
      { ref: 'Proverbs 22:7', application: 'The borrower is servant to the lender. Get out of debt and stay out.' },
    ],
    principles: [
      'Earn honestly. No shortcuts, no exploitation.',
      'Give generously. Tithing and giving break the spirit of greed.',
      'Live below your means. Discipline with money is discipline in life.',
      'Avoid debt. Financial freedom is spiritual freedom.',
      'Remember: Yahweh owns everything. You are a steward.',
    ],
    actionSteps: [
      'Audit your spending this week. Where is money going that does not honor Yahweh?',
      'Set up a giving plan — whether tithe or offering. Start this month.',
      'Read Deuteronomy 28 and note the financial blessings tied to obedience.',
    ],
  },
  {
    id: 'lust',
    title: 'Women, Lust & Discipline',
    icon: '🔥',
    overview: 'Sexual temptation is the oldest trap. Yahweh calls you to purity, self-control, and honoring your body as a temple. No shortcuts.',
    scriptures: [
      { ref: 'Proverbs 5:1-23', application: 'The entire chapter is a warning about the strange woman and a celebration of the wife of your youth.' },
      { ref: 'Matthew 5:28', application: 'Yahshua raised the bar — lust in the heart is already adultery. Guard your eyes.' },
      { ref: '1 Corinthians 6:18-20', application: 'Flee sexual immorality. Every other sin is outside the body, but this one is against your own body.' },
      { ref: 'Job 31:1', application: 'Job made a covenant with his eyes. That level of discipline is the standard.' },
      { ref: 'Proverbs 6:27-29', application: 'Can a man carry fire in his lap and not be burned? Proximity to temptation leads to destruction.' },
    ],
    principles: [
      'Guard your eyes. What enters through the gate of vision shapes the heart.',
      'Flee — do not negotiate with temptation. Leave the situation.',
      'Accountability matters. Find a brother who will challenge you honestly.',
      'Honor marriage. If single, prepare yourself to honor a future spouse.',
      'Purity is strength, not weakness.',
    ],
    actionSteps: [
      'Make Job\'s covenant: "I made a covenant with my eyes not to look lustfully." Start today.',
      'Delete or block content that tempts you. No compromise.',
      'Read Proverbs 5-7 in one sitting and note the warnings and the rewards of faithfulness.',
    ],
  },
  {
    id: 'power',
    title: 'Power & Leadership',
    icon: '👑',
    overview: 'Leadership is not domination — it is service, sacrifice, and accountability. Yahshua modeled servant leadership. Follow His example.',
    scriptures: [
      { ref: 'Mark 10:42-45', application: 'Whoever wants to be great must be a servant. Leadership is measured by service, not status.' },
      { ref: 'Proverbs 29:2', application: 'When the righteous rule, the people rejoice. When the wicked rule, the people groan.' },
      { ref: '1 Peter 5:2-4', application: 'Shepherd the flock — not by compulsion, but willingly. Not for selfish gain, but eagerly.' },
      { ref: 'Micah 6:8', application: 'What does Yahweh require? Justice, mercy, and walking humbly. That is the foundation of true leadership.' },
    ],
    principles: [
      'Lead by example, not by title.',
      'Power without accountability becomes tyranny.',
      'Serve those under your authority — they are not beneath you.',
      'Humility is the mark of real strength.',
    ],
    actionSteps: [
      'Identify one area where you lead (home, work, community). Assess: are you serving or dominating?',
      'Read Mark 10:42-45 and model one specific act of servant leadership this week.',
    ],
  },
  {
    id: 'fear-anxiety',
    title: 'Fear & Anxiety',
    icon: '🌊',
    overview: 'Fear is a prison. Anxiety is a thief. Yahweh says "Do not fear" over 365 times in Scripture. Learn to replace fear with faith in action.',
    scriptures: [
      { ref: 'Isaiah 41:10', application: 'Do not fear, for I am with you. Do not be dismayed, for I am your Elohim. He will strengthen and help you.' },
      { ref: 'Philippians 4:6-7', application: 'Be anxious for nothing. Bring everything to Yahweh in prayer. His peace will guard your heart.' },
      { ref: 'Psalm 23:4', application: 'Even in the valley of the shadow of death — no fear. Because Yahweh is with you.' },
      { ref: '2 Timothy 1:7', application: 'Yahweh did not give you a spirit of fear, but of power, love, and self-control.' },
      { ref: 'Psalm 56:3-4', application: 'When I am afraid, I put my trust in Yahweh. What can man do to me?' },
    ],
    principles: [
      'Fear is not from Yahweh. Identify it and reject it.',
      'Prayer replaces anxiety. Make it your first response, not your last resort.',
      'Speak Scripture over your situation — it is the sword of the Spirit.',
      'Action destroys fear. Move forward even when afraid.',
      'Trust is built by remembering. Recall past deliverances.',
    ],
    actionSteps: [
      'Write down your top three fears. Find a Scripture that directly addresses each one.',
      'Memorize 2 Timothy 1:7 and speak it aloud whenever anxiety rises.',
      'Start a "Yahweh delivered me" journal — record every time He came through. Build faith for the future.',
    ],
  },
];
