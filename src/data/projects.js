import { colors } from '../design-system/tokens.js'

export const projects = [
  {
    id: 0,
    slug: 'design-system',
    label: 'Design system',
    color: colors['panel-orange'],
    expandedLabelColor: 'rgba(100, 30, 10, 0.4)',
    client: 'Royal Australasian College of Surgeons (RACS)',
    year: '2023',
    title: "Building the organization's first design system",
    description:
      'Typography, color tokens, components, and developer documentation built from scratch for a team of developers and stakeholders.',
    role: 'Design Systems Designer',
    tools: 'Figma, Storybook',
    caseStudyUrl: '/work/design-system',
    imageSrc: '/images/design-system-mockup.png',
  },
  {
    id: 1,
    slug: 'airpals',
    label: 'Usability study',
    color: colors['panel-magenta'],
    expandedLabelColor: 'rgba(80, 15, 45, 0.4)',
    client: 'Airpals',
    year: '2022',
    title: 'Usability testing for a logistics startup',
    description:
      'End-to-end usability research surfacing key friction points and delivering actionable design recommendations.',
    role: 'UX Researcher',
    tools: 'Maze, Figma',
    caseStudyUrl: '/work/airpals',
    imageSrc: '/images/airpals-mockup.png',
  },
  {
    id: 2,
    slug: 'travel-ai',
    label: 'Chatbot design',
    color: colors['panel-yellow'],
    expandedLabelColor: 'rgba(100, 78, 18, 0.4)',
    client: 'Travel AI',
    year: '2024',
    title: 'Conversational UI for an AI travel planner',
    description:
      'Designed intent mapping, response formatting, and error states for an AI-powered travel assistant.',
    role: 'Product Designer',
    tools: 'Figma, ChatGPT',
    caseStudyUrl: '/work/travel-ai',
    imageSrc: '/images/chatbot-mockup.png',
  },
  {
    id: 3,
    slug: 'racs',
    label: 'Mobile-first design',
    color: colors['panel-green'],
    expandedLabelColor: 'rgba(82, 84, 18, 0.4)',
    client: 'Royal Australasian College of Surgeons (RACS)',
    year: '2020',
    title: 'Simplifying professional development activity logging and tracking for surgeons at RACS',
    description:
      'Reducing cognitive load for surgeons by simplifying navigation, surfacing unfinished tasks on the home screen, and creating a one-click path to key actions.',
    role: '0 > 1 UI/UX Designer, UX Researcher, Business Analyst',
    tools: 'Adobe XD, Adobe Illustrator',
    caseStudyUrl: '/work/racs',
    imageSrc: '/images/racs-mockup.png',
  },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)
