/**
 * Case studies. Each one follows the same structure so you can add new ones by
 * copying a block. Text in [[brackets]] is a placeholder for details only you know.
 * `accent` + `art` drive the generative cover (see components/Cover.tsx).
 */
export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  tagline: string;
  accent: string;
  art: "rings" | "grid" | "bars";
  tldr: { team: string; scope: string; platform: string; metric: string };
  problem: { heading: string; body: string[] };
  roleDetail: string[];
  process: { t: string; d: string }[];
  decisions: { decision: string; because: string; tradeoff: string }[];
  outcome: { value: string; label: string }[];
  outcomeBody: string;
  next: string[];
};

export const projects: Project[] = [
  {
    slug: "momo-wallet",
    title: "Making the wallet a daily habit",
    client: "MTN MoMo",
    year: "2023 — now",
    role: "Senior Product Designer",
    tagline: "Redesigning the mobile money wallet so people return for more than a transfer.",
    accent: "#C6FF3D",
    art: "rings",
    tldr: {
      team: "[[Team size & mix, e.g. 1 PO, 6 engineers, 2 designers]]",
      scope: "Research · strategy · UX · visual design",
      platform: "Mobile app (+ USSD parity)",
      metric: "[[Headline metric, e.g. +00% 30-day retention]]",
    },
    problem: {
      heading: "Users came for one transaction and left.",
      body: [
        "Mobile money is essential, but for many users the wallet was a tool they opened only when they had to send or withdraw money. Competing channels (cash, bank apps, other wallets) made every session optional.",
        "[[Add the specific insight/data point that framed the problem, e.g. drop-off between first and second transaction.]]",
      ],
    },
    roleDetail: [
      "Owned design strategy and the research plan; partnered with the product owner on roadmap trade-offs.",
      "Designed the end-to-end journey and shipped components with engineering.",
      "[[Anything you led beyond design: workshops, metrics definition, stakeholder alignment]]",
    ],
    process: [
      { t: "Understand", d: "User interviews and funnel analysis to find where habit breaks. [[Number of interviews / data sources]]" },
      { t: "Frame", d: "Defined a single retention metric and three behaviours that predict it." },
      { t: "Prototype", d: "Prototyped candidate flows in code to test with real users on real devices." },
      { t: "Ship & learn", d: "Released in slices behind flags, measured, iterated. [[Rollout approach]]" },
    ],
    decisions: [
      {
        decision: "Optimise the second use, not the first.",
        because: "First-use polish gets attention, but the data showed churn happened after the first successful transaction.",
        tradeoff: "Slower visible 'wow' at onboarding; deferred a full onboarding redesign.",
      },
      {
        decision: "Keep USSD parity for core flows.",
        because: "A large share of users transact through USSD; a feature they can't reach isn't a feature.",
        tradeoff: "Constrained the interaction model and cost delivery time.",
      },
      {
        decision: "[[A third decision you'd defend in an interview]]",
        because: "[[Why]]",
        tradeoff: "[[What it cost]]",
      },
    ],
    outcome: [
      { value: "[[+00%]]", label: "[[Retention / activation metric]]" },
      { value: "[[00M]]", label: "[[Users reached]]" },
      { value: "[[00%]]", label: "[[Task success or support reduction]]" },
    ],
    outcomeBody: "[[Two sentences: what changed for users and for the business, and how you know.]]",
    next: [
      "[[What you'd test next, e.g. personalised reminders or savings nudges]]",
      "Extend the design system to cover the new patterns across app and USSD.",
    ],
  },
  {
    slug: "business-banking",
    title: "Redesigning business banking",
    client: "Capitec Business Bank",
    year: "2020 — 2023",
    role: "UI & UX Designer",
    tagline: "A redesign of the business banking app that lifted user engagement by 15%.",
    accent: "#FF6A3D",
    art: "grid",
    tldr: {
      team: "[[Team size & mix]]",
      scope: "Research · UX · UI · design system · accessibility",
      platform: "Mobile banking app",
      metric: "+15% user engagement",
    },
    problem: {
      heading: "Business owners were fitting the app to their day, not the other way round.",
      body: [
        "Small and medium business owners need to move money, check balances and reconcile quickly, often between customers. The existing app made common tasks slow and hard to find.",
        "[[Add a data point or quote that proves the problem]]",
      ],
    },
    roleDetail: [
      "Part of the team that led the redesign, analysing the existing app, evaluating UX effectiveness and finding where it failed users.",
      "Built and maintained the design system and championed accessibility.",
      "[[Your specific areas: flows, components, research you owned]]",
    ],
    process: [
      { t: "Audit", d: "Heuristic review and analytics to find the highest-friction journeys." },
      { t: "Research", d: "Interviews and usability tests with business customers. [[Number of sessions]]" },
      { t: "Design system", d: "Rebuilt the UI on a tokenised, accessible component library." },
      { t: "Test & iterate", d: "Tested prototypes, shipped, then tracked engagement." },
    ],
    decisions: [
      {
        decision: "Surface the top tasks on the home screen.",
        because: "Research showed a handful of tasks made up most of the sessions.",
        tradeoff: "Less-used features moved deeper into navigation.",
      },
      {
        decision: "Build accessibility into the components, not as a later audit.",
        because: "Fixing it once in the system fixes it everywhere.",
        tradeoff: "More upfront work on the component library.",
      },
      {
        decision: "[[A third decision]]",
        because: "[[Why]]",
        tradeoff: "[[What it cost]]",
      },
    ],
    outcome: [
      { value: "+15%", label: "User engagement" },
      { value: "[[00%]]", label: "[[Task completion or time-on-task]]" },
      { value: "[[00]]", label: "[[Components shipped in the design system]]" },
    ],
    outcomeBody: "The redesign increased user engagement by 15%. [[Add one line on what that meant for the business.]]",
    next: ["[[What you'd improve next]]", "Instrument journeys end to end to tie engagement to revenue."],
  },
  {
    slug: "ussd-banking",
    title: "Banking on the lowest common denominator",
    client: "Standard Bank SA",
    year: "2022",
    role: "UX Designer (contract)",
    tagline: "Responsive design, systems and USSD: banking that works on any phone.",
    accent: "#9DB7FF",
    art: "bars",
    tldr: {
      team: "[[Team size & mix]]",
      scope: "Responsive UX · information architecture · design system · USSD",
      platform: "Responsive web + USSD",
      metric: "[[Headline metric]]",
    },
    problem: {
      heading: "Not every customer has a smartphone or data.",
      body: [
        "Digital banking that assumes a modern device and a good connection excludes the customers who need it most.",
        "[[Add specifics: the journeys, the user group, the constraint]]",
      ],
    },
    roleDetail: [
      "Designed responsive layouts and information architecture across channels.",
      "Contributed to the design system and designed USSD flows within strict character and step limits.",
      "[[Your specific contribution]]",
    ],
    process: [
      { t: "Map", d: "Mapped journeys across web and USSD to find where they should be the same." },
      { t: "Constrain", d: "Defined rules for USSD copy, steps and error recovery." },
      { t: "Systematise", d: "Added reusable patterns so teams design consistently." },
      { t: "Validate", d: "[[How you tested with users or stakeholders]]" },
    ],
    decisions: [
      {
        decision: "Design the USSD flow first.",
        because: "If a journey works under the tightest constraint, richer channels are an enhancement.",
        tradeoff: "Forced hard cuts to content and options.",
      },
      {
        decision: "[[Second decision]]",
        because: "[[Why]]",
        tradeoff: "[[What it cost]]",
      },
    ],
    outcome: [
      { value: "[[00%]]", label: "[[Metric]]" },
      { value: "[[00]]", label: "[[Journeys covered]]" },
    ],
    outcomeBody: "[[What shipped, who it helped, what you learned.]]",
    next: ["[[What you'd do next]]"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
