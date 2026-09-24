/**
 * Every string, number and link on the site lives here.
 * Edit this file to update the site; components never hardcode copy.
 *
 * A URL set to TODO hides the element that uses it (see `isSet`).
 */

export const TODO = 'TODO';

export const isSet = (value: string | undefined): value is string =>
  typeof value === 'string' && value.trim() !== '' && value !== TODO;

export type ActionLink = {
  label: string;
  href: string;
  kind: 'primary' | 'secondary' | 'text';
  external?: boolean;
  download?: boolean;
};

/**
 * A number that counts up. `prefix` and `suffix` stay fixed while `value` animates.
 * Use `display` instead of `value` for things that shouldn't count (ranges, for example).
 */
export type Stat = {
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  display?: string;
};

export type Project = {
  id: string;
  name: string;
  meta?: string;
  description: string;
  roleHeading: string;
  role: string[];
  stats: Stat[];
  stack: string[];
  footnote?: string;
};

export type ContributedProduct = {
  id: string;
  name: string;
  description: string;
  participation: string;
  stat?: string;
  stack: string[];
};

export type ExperienceItem = {
  period: string;
  title: string;
  org?: string;
  description?: string;
};

export type StackGroup = { group: string; items: string[] };

export type Worktree = {
  branch: string;
  running: string;
  done: string;
  /** Seconds the progress bar takes to fill. */
  duration: number;
};

export const identity = {
  name: 'Guilherme Holanda',
  title: 'Senior Software Engineer, Backend & Full Stack',
  location: 'Recife, Brazil. Working remotely.',
  locality: 'Recife',
  email: 'guilhermeholanda519@gmail.com',
  linkedin: 'https://linkedin.com/in/guilherme-holanda-56359124a',
  github: TODO,
  resume: '/resume-guilherme-holanda.pdf',
  portfolio: '/portfolio-guilherme-holanda.pdf',
} as const;

export const site = {
  // TODO: set to the production URL (no trailing slash). Until then canonical and og:url are omitted.
  url: TODO,
  title: 'Guilherme Holanda, Senior Software Engineer',
  description:
    'Senior software engineer building backend and full stack products in TypeScript. Messaging, payments and AI integrations for healthcare businesses across Brazil.',
  ogImage: '/og-image.png',
  ogImageAlt: 'Guilherme Holanda, Senior Software Engineer',
  skipLink: 'Skip to content',
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'How I work', href: '#how-i-work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  theme: {
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
  },
  footer: {
    githubLabel: 'GitHub',
  },
};

export const hero = {
  status: 'Currently Senior Software Engineer at Amigo Tech.',
  headline: identity.name,
  lead: 'Senior software engineer building backend and full stack products in TypeScript.',
  supporting:
    'I work on messaging, payments and AI integrations for healthcare businesses across Brazil, and I like the parts where the volume gets real.',
  actions: [
    { label: 'Download résumé', href: identity.resume, kind: 'primary', download: true },
    { label: 'Portfolio', href: identity.portfolio, kind: 'secondary', external: true },
    { label: 'LinkedIn', href: identity.linkedin, kind: 'text', external: true },
    { label: 'Email', href: `mailto:${identity.email}`, kind: 'text' },
    { label: 'GitHub', href: identity.github, kind: 'text', external: true },
  ] satisfies ActionLink[],
};

export const selectedWork = {
  heading: 'Selected work',
  intro:
    'Amigo Tech is a clinic management platform used by 50K+ doctors and 5K+ clinics across Brazil.',
  stackLabel: 'Stack',
  projects: [
    {
      id: 'amigo-flow',
      name: 'Amigo Flow',
      description:
        'Multichannel AI messaging hub. Clinics set up AI agents with their own knowledge bases, connected to the scheduling API via MCP, so patients can book appointments end to end by voice or text.',
      roleHeading: 'My part',
      role: [
        'Core engineer from the first version, and one of the main technical contacts for product and the pilot clinics.',
        'Designed the event-driven processing for WhatsApp webhooks and campaigns, with Redis queues and Socket.IO for real-time messages.',
        'Worked closely with the AI team to integrate their agents with our scheduling API through MCP.',
        'Built scheduling, confirmations, Kanban automation, campaigns and Meta template management.',
      ],
      stats: [
        { prefix: 'R$', value: 400, suffix: 'K', label: 'MRR within 6 months' },
        { value: 10, suffix: 'M+', label: 'messages in the first 90 days' },
        { value: 43, suffix: '%', label: 'of conversations resolved without a human' },
        { value: 80, suffix: '%+', label: 'of patient conversations handled by AI agents' },
      ],
      stack: [
        'NestJS',
        'Node.js',
        'React',
        'Angular',
        'Socket.IO',
        'Redis',
        'PostgreSQL',
        'MongoDB',
        'RAG',
        'MCP',
        'WhatsApp Cloud API',
        'AWS',
      ],
      footnote: "Became the company's fastest-growing and top-selling product.",
    },
    {
      id: 'amigopay',
      name: 'AmigoPay',
      description:
        'Banking-as-a-Service module inside the clinic platform, with digital accounts, PIX, boleto, card terminals, installments, automated accounts payable and access controls by IP, location and device.',
      roleHeading: 'My part',
      role: [
        'Built bank account setup and management workflows, and internal transactions between modules.',
        'Integrated PIX, boleto issuance, card terminals and installment billing.',
        'Built webhook-driven event tracking, account statements, reconciliation flows and automated payment pipelines.',
      ],
      stats: [
        { prefix: 'BRL ', value: 20, suffix: 'M+', label: 'processed every month' },
        { value: 1000, suffix: '+', label: 'clinics' },
        { value: 0, label: 'vulnerabilities in the external pentest' },
      ],
      stack: ['NestJS', 'PostgreSQL', 'AWS', 'Dock BaaS', 'Webhooks', 'PIX', 'Boleto'],
    },
  ] satisfies Project[],
};

export const otherProducts = {
  heading: "Other products I've contributed to",
  participationLabel: 'My participation',
  products: [
    {
      id: 'agende-mais',
      name: 'Agende Mais',
      description:
        'Omnichannel automation engine for the clinic and patient lifecycle, on a serverless architecture.',
      participation:
        'Took part in development, mainly on CRM workflows, campaign automation and patient journey features.',
      stat: 'Campaigns up to 200K recipients per dispatch.',
      stack: ['Node.js', 'AWS SQS', 'Lambda', 'CloudWatch', 'WhatsApp API', 'Zenvia', 'Sinch'],
    },
    {
      id: 'amigo-one',
      name: 'Amigo One',
      description:
        'Mobile app for physicians with schedule management, patient records, a financial dashboard, invoice (NF) issuance and a specialty-based professional network.',
      participation:
        'Taking part in the integration between Amigo One and Amigo Flow, working alongside the mobile team.',
      stack: ['React Native', 'NestJS', 'PostgreSQL'],
    },
    {
      id: 'signbox',
      name: 'Signbox',
      description:
        'Digital signature platform with government validation through ITI and 20-year legal retention, replacing paper documents in hospitals.',
      participation:
        "Took part in development, implementing features and working through the platform's business rules.",
      stack: ['Node.js', 'ITI integration', 'WhatsApp', 'SMS'],
    },
  ] satisfies ContributedProduct[],
};

export const personalProject = {
  heading: 'Personal project',
  project: {
    id: 'hello-diet',
    name: 'Hello Diet',
    meta: 'My B.Sc. final project in Computer Science at UNICAP (2026)',
    description:
      "SaaS platform for nutritionists to manage patients, appointments, clinical records and meal plans in one place, with dashboards that show each patient's progress over time.",
    roleHeading: 'What I built',
    role: [
      'Took the product from interviews with nutritionists to data modeling, API design and a working platform.',
      "Multi-tenant architecture, with each clinic's data isolated so many clinics can share one instance safely.",
      'JWT authentication with role-based access, audit logs and soft deletes for sensitive records.',
      "Turned user feedback into a shipped feature: linking each appointment directly to the patient's record.",
    ],
    stats: [
      { value: 3, label: 'nutritionists validated the product' },
      { display: '150–200 ms', label: 'typical API response time' },
    ],
    stack: ['React', 'Zustand', 'Vite', 'NestJS', 'PostgreSQL', 'Sequelize', 'JWT'],
  } satisfies Project,
};

export const howIWork = {
  heading: 'How I work',
  intro: 'I write a lot of code, just not one thing at a time.',
  paragraphs: [
    'I use Claude Code and Codex every day, running them in Orca, where each task gets its own git worktree and its own agent. A bug fix, a test suite and a refactor can all move forward at the same time.',
    'For bigger tasks I use agent orchestrators that split the work into pieces and hand each one to a subagent with its own context. I try new models, skills and MCP servers as soon as they come out, and keep the ones that actually help.',
    'I presented this way of working to my whole company, to show how running things in parallel can make a team faster while improving the quality of our work.',
  ],
  panel: {
    title: '~/amigo-flow',
    meta: '4 worktrees',
    caption: 'A typical afternoon, four worktrees at once.',
    worktrees: [
      { branch: 'fix/webhook-retry', running: 'running tests', done: 'all green', duration: 2.2 },
      {
        branch: 'test/e2e-scheduling',
        running: 'writing specs',
        done: 'ready for review',
        duration: 3.4,
      },
      {
        branch: 'feat/campaign-filters',
        running: 'building UI',
        done: 'ready for review',
        duration: 4.1,
      },
      {
        branch: 'refactor/queue-worker',
        running: 'planning',
        done: 'plan approved',
        duration: 1.6,
      },
    ] satisfies Worktree[],
    /** Seconds to wait after finishing before the single replay. */
    replayAfter: 6,
  },
};

export const experience = {
  heading: 'Experience',
  items: [
    {
      period: 'Jun 2024 to now',
      title: 'Senior Software Engineer & Tech Lead',
      org: 'Amigo Tech (Recife)',
      description:
        'Started as a junior engineer, then mid-level, then senior. Today I drive technical direction for Amigo Flow while shipping features every day, and I maintain the Jenkins pipelines that run our unit, integration and E2E tests.',
    },
    {
      period: '2023 to May 2024',
      title: 'Freelance Software Developer',
      description:
        'Built web apps and APIs for clients with TypeScript, Node.js, React and PostgreSQL, from scoping to deployment and support.',
    },
    {
      period: '2022 to 2026',
      title: 'B.Sc. in Computer Science',
      org: 'Universidade Católica de Pernambuco (UNICAP)',
    },
  ] satisfies ExperienceItem[],
};

export const stack = {
  heading: 'Stack',
  groups: [
    {
      group: 'Backend',
      items: [
        'Node.js',
        'NestJS',
        'TypeScript',
        'Express',
        'REST APIs',
        'microservices',
        'event-driven architecture',
      ],
    },
    { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'TypeORM', 'Prisma'] },
    {
      group: 'Frontend and mobile',
      items: ['React', 'Next.js', 'Tailwind CSS', 'React Native (integration work)'],
    },
    { group: 'Testing and CI/CD', items: ['Jest', 'Vitest', 'Cypress', 'Playwright', 'Jenkins'] },
    { group: 'AI', items: ['Claude Code', 'Codex', 'agent orchestration', 'RAG', 'MCP'] },
    {
      group: 'Cloud and integrations',
      items: ['AWS (SQS, Lambda, CloudWatch)', 'WhatsApp Cloud API', 'PIX', 'boleto', 'webhooks'],
    },
    { group: 'Languages', items: ['Portuguese (native)', 'English (advanced)'] },
  ] satisfies StackGroup[],
};

export const contact = {
  heading: "Let's talk",
  line: "I'm open to full stack and backend roles, remote. If you're building something I could help with, I'd like to hear about it.",
  email: identity.email,
  links: [
    { label: 'LinkedIn', href: identity.linkedin, kind: 'text', external: true },
    { label: 'Résumé', href: identity.resume, kind: 'text', download: true },
    { label: 'GitHub', href: identity.github, kind: 'text', external: true },
  ] satisfies ActionLink[],
};
