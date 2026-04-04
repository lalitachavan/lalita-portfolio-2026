export default {
  slug: 'racs',

  // Hero Summary + Hook
  hero: {
    headline: 'CPD mobile application',
    hook: 'Designing a mobile experience for time-poor surgeons to record professional development activities with ease.',
    role: 'UX Researcher, UI Designer',
    team: [
      'Desiree Tsapazis \u2013 Lead Business Analyst',
      'Lalita Chavan \u2013 User Experience Analyst',
    ],
    tools: 'Adobe XD, Adobe Illustrator',
  },

  // Impact Snapshot
  impact: {
    stats: [
      { value: '34', label: 'External interviews conducted' },
      { value: '8', label: 'Internal stakeholder interviews' },
      { value: '5', label: 'Competitor platforms analyzed' },
    ],
  },

  // Context
  context: {
    heading: 'What is RACS and CPD?',
    body: 'The Royal Australasian College of Surgeons (RACS) is responsible for maintaining surgical standards across Australia and New Zealand. Surgeons are required to log Continuing Professional Development (CPD) activities to remain registered with medical boards.',
  },

  // Key Insight
  keyInsight: {
    heading: 'The challenge',
    body: 'Surgeons are extremely time-poor. Logging CPD activities is mandatory but rarely urgent. It often becomes an administrative burden squeezed between surgeries, consultations, and on-call hours.',
    supporting: 'The existing desktop platform was not responsive, required access to a computer, and felt time-consuming to use. As a result, logging activities was delayed, frustrating, and inefficient.',
  },

  // Problem
  problem: {
    heading: 'Framing the problem',
    statement: 'How might we help surgeons quickly and intuitively record CPD activities from anywhere, without adding cognitive load to their already demanding schedules?',
    body: 'This was not just about shrinking a desktop interface onto a smaller screen. It was about rethinking the experience for context: short bursts of time, one-handed use, and minimal friction.',
  },

  // Users & Constraints
  usersAndConstraints: {
    heading: 'The opportunity',
    body: 'Design a mobile-first solution that fits into a surgeon\u2019s real-life workflow \u2014 not the other way around.',
  },

  // My Role
  myRole: {
    heading: 'Design approach',
    body: 'We followed a human-centered, research-led design process:',
    steps: [
      'Understand the user context',
      'Identify pain points in the current workflow',
      'Explore patterns that work in similar high-compliance systems (competitor analysis)',
      'Prototype, test, iterate',
    ],
    principle: 'Because surgeons are time-poor, efficiency and clarity became the primary design principles guiding every decision.',
  },

  // Design Challenges (Challenge -> Decision -> Impact)
  designChallenges: {
    heading: 'Research and why these methods',
    methods: [
      {
        icon: '\uD83D\uDD0D',
        name: 'Competitor analysis',
        detail: 'Analyzed CPD applications by Ausmed, ANZCA, RACGP, CPDme, and ANMF.',
        why: 'These platforms serve similar professional groups with regulatory requirements. The goal was pattern recognition: How do others structure activity logging? What data visualization models are effective? This broadened my understanding of established mental models within this domain.',
      },
      {
        icon: '\uD83C\uDF99\uFE0F',
        name: 'Interviews',
        detail: 'Conducted 34 external and 8 internal interviews.',
        why: 'Interviews were critical in uncovering both behavioral and emotional pain points \u2014 from frustration and cognitive overload to the stress associated with compliance tasks. They were also the only way to gather direct, one-to-one input from surgeons and understand their lived experience firsthand.',
      },
    ],
    insights: [
      'When and where surgeons attempt to log their activities',
      'What prevents them from recording entries immediately',
      'Which information is difficult to locate or interpret',
      'How much time, effort, and form complexity they are willing to tolerate',
    ],
    insightsIntro: 'Through these conversations, we gained clarity on:',
  },

  // Tradeoffs / Key Design Decisions
  tradeoffs: {
    heading: 'Key design decisions',
    decisions: [
      {
        title: 'Mobile-first design',
        body: 'The solution was designed specifically for mobile behavior:',
        points: ['Large tap targets', 'Clear hierarchy', 'Minimal required fields upfront'],
      },
      {
        title: 'Reduce cognitive load',
        body: 'Instead of presenting full data-entry screens immediately:',
        points: [
          'Introduced simplified activity categories',
          'Used structured input formats',
          'Prioritized clarity in labeling and visual grouping',
        ],
      },
      {
        title: 'Efficient use of screen real estate',
        body: 'One of my biggest learnings was letting go of my initial design. My first iteration was visually appealing but not space-efficient. By stepping back and exploring alternative layouts, I improved:',
        points: ['Data density without clutter', 'Scannability', 'Visual balance'],
        note: 'This significantly enhanced usability.',
      },
    ],
  },

  // Design Highlights
  designHighlights: {
    heading: 'Final design',
    // Images will go here later
  },

  // Impact & Outcomes
  impactAndOutcomes: {
    heading: 'Impact & outcomes',
    body: 'These insights grounded the design decisions in real-world context rather than assumptions.',
  },

  // Reflection
  reflection: {
    heading: 'Key learnings',
    items: [
      {
        bold: 'User feedback and user testing are key to good design.',
        body: 'Asking for user feedback from time to time helped me fine-tune the designs.',
      },
      {
        bold: 'Competitor analysis broadens understanding.',
        body: 'The competitor analysis helped me gain insights into what was working well with a similar user group and I could build on it.',
      },
      {
        bold: 'Do not be fixated on the first design.',
        body: "I couldn\u2019t look past my first design since it appealed to me and I held on to it. But taking a step back and visualising different ways the data could be represented helped me make the use of real estate on the screen better.",
      },
    ],
  },
}
