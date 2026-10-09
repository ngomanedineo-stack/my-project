/**
 * Case studies. Add a new one by appending to `caseStudies`: the index, the
 * homepage horizontal scroller and the /work/[slug] page all read from this file.
 *
 * Facts taken from your CV and old site are filled in. Everything in [square brackets]
 * is a prompt for you to replace with real detail. Do not publish numbers you can't back up.
 */
export type Metric = { value: string; label: string };
export type Decision = { title: string; options: string; chose: string; gaveUp: string; why: string };
export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tagline: string;
  tags: string[];
  accent: string;
  role: string;
  team: string;
  timeline: string;
  platform: string;
  metrics: Metric[];
  problem: string;
  myRole: { owned: string[]; shared: string[] };
  process: { t: string; d: string }[];
  decisions: Decision[];
  solution: string;
  outcome: string;
  next: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "momo-wallet",
    title: "Making a mobile wallet worth opening twice",
    client: "MTN MoMo",
    year: "2023 – now",
    tagline: "Retention and habit in a mobile money wallet.",
    tags: ["Product strategy", "Retention", "Fintech"],
    accent: "#FF5A1F",
    role: "Senior Product Designer",
    team: "[Team size and makeup]",
    timeline: "July 2023 – ongoing",
    platform: "iOS, Android",
    metrics: [
      { value: "[X]%", label: "[Retention or repeat-use metric]" },
      { value: "[X]", label: "[Active users or transactions you influenced]" },
      { value: "[X]", label: "[Third metric]" },
    ],
    problem:
      "[Describe the business problem in one or two sentences: what was happening, what it cost, and how you knew.] People were signing up for the wallet but not returning for a second and third use.",
    myRole: {
      owned: ["User research and design strategy", "Market analysis", "Visual design", "Aligning design with business goals"],
      shared: ["[Roadmap with product leadership]", "[Delivery with engineering]"],
    },
    process: [
      { t: "Research", d: "[What you learned from users and data. Name the sample and method.]" },
      { t: "Insight", d: "[The one insight that changed direction.]" },
      { t: "Options", d: "[The 2 or 3 directions you explored.]" },
      { t: "Test", d: "[How you validated the choice before building.]" },
    ],
    decisions: [
      {
        title: "[A decision you're proud of]",
        options: "[Option A versus option B]",
        chose: "[What you chose]",
        gaveUp: "[What it cost]",
        why: "[The reasoning, tied to the metric]",
      },
    ],
    solution: "[Short description of what shipped, with 2 or 3 screens or a prototype video.]",
    outcome: "[What changed, with the baseline and the timeframe. Honest ranges are fine if exact numbers are confidential.]",
    next: ["[The next bet you'd make]", "[What you'd measure]", "[What you learned]"],
  },
  {
    slug: "business-banking",
    title: "Redesigning business banking for daily use",
    client: "Capitec Business Bank",
    year: "2020 – 2023",
    tagline: "A redesign that lifted engagement by 15%.",
    tags: ["Redesign", "Design systems", "Accessibility"],
    accent: "#E9C46A",
    role: "UI & UX Designer",
    team: "[Team size and makeup]",
    timeline: "[Duration of the redesign]",
    platform: "Mobile app",
    metrics: [
      { value: "15%", label: "increase in user engagement after the redesign" },
      { value: "[X]", label: "[Design system components or screens]" },
      { value: "[X]", label: "[Accessibility or task-success metric]" },
    ],
    problem:
      "[What was wrong with the existing business banking app, in the words of the people who used it.] The aim was to understand where the app was failing business owners and fix it in a way the data could confirm.",
    myRole: {
      owned: ["Analysis of the existing app's UX effectiveness", "Design system development", "Accessibility", "User research and testing"],
      shared: ["The redesign, as part of a team", "[Handoff with engineering]"],
    },
    process: [
      { t: "Audit", d: "Evaluated the existing app's UX effectiveness and Human-Computer Interaction issues." },
      { t: "Research", d: "User research and testing, combining data with qualitative feedback." },
      { t: "Systemise", d: "Built a design system so the redesign stayed consistent and fast to extend." },
      { t: "Validate", d: "Measured engagement after launch. [Add the method and timeframe.]" },
    ],
    decisions: [
      {
        title: "[A key trade-off in the redesign]",
        options: "[Option A versus option B]",
        chose: "[What you chose]",
        gaveUp: "[What it cost]",
        why: "[The reasoning]",
      },
    ],
    solution: "[What the new app looks like and what's different, with before and after screens.]",
    outcome: "A 15% increase in user engagement following the redesign. [Add baseline, timeframe and how it was measured.]",
    next: ["[What you'd improve next]", "[What the data suggested]", "[What you learned]"],
  },
  {
    slug: "ussd-banking",
    title: "Banking on the lowest common denominator",
    client: "Standard Bank SA",
    year: "2022",
    tagline: "Responsive and USSD banking for every handset.",
    tags: ["USSD", "Information architecture", "Inclusion"],
    accent: "#8ECAE6",
    role: "UX Designer (contract)",
    team: "[Team size and makeup]",
    timeline: "June – November 2022",
    platform: "Responsive web, USSD",
    metrics: [
      { value: "6", label: "month engagement" },
      { value: "[X]", label: "[Reach, completion rate or task success]" },
      { value: "[X]", label: "[Third metric]" },
    ],
    problem:
      "[Describe who needed to bank on USSD and responsive web, and what was blocking them.] Not everyone has a smartphone or a stable connection, and a bank still has to serve them well.",
    myRole: {
      owned: ["Responsive design", "Design systems", "USSD flows", "Information architecture"],
      shared: ["[Collaboration with product and engineering]"],
    },
    process: [
      { t: "Constrain", d: "USSD gives you a few lines of text and a number pad. Constraint became the brief." },
      { t: "Structure", d: "Information architecture so the fewest keypresses reach the most common tasks." },
      { t: "Systemise", d: "A design system that spans responsive web and USSD patterns." },
      { t: "Test", d: "[How you tested flows with real users.]" },
    ],
    decisions: [
      {
        title: "[A decision about menu depth or flow]",
        options: "[Option A versus option B]",
        chose: "[What you chose]",
        gaveUp: "[What it cost]",
        why: "[The reasoning]",
      },
    ],
    solution: "[Show a USSD flow diagram and the responsive screens.]",
    outcome: "[What changed, with numbers if you can share them.]",
    next: ["[What you'd do next]", "[What you'd measure]", "[What you learned]"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
