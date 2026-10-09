/**
 * Single source of truth for copy + links.
 * Anything wrapped in [[double brackets]] is a PLACEHOLDER: it renders highlighted
 * on the site so you can't miss it. Run `npm run placeholders` to list them all.
 */
export const site = {
  name: "Deneo Ngomane",
  title: "Deneo Ngomane — Senior Product Designer & Owner",
  description:
    "Senior product designer and owner in African fintech. Strategy, design and code in one person, focused on retention. Currently at MTN MoMo.",
  email: "hello@deneon.co.za",
  linkedin: "[[https://www.linkedin.com/in/your-handle]]",
  // Paste your Cal.com / Calendly link here. Until then "Book a chat" falls back to email.
  booking: "",
  cv: "/Deneo_CV_25.pdf",
  location: "Johannesburg, South Africa",
  status: "Open to Senior Product Designer & Product Lead roles",
};

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "How I work" },
  { href: "/experience/", label: "Experience" },
  { href: "/contact/", label: "Contact" },
];

export const hero = {
  eyebrow: "Senior product designer · Product owner · Developer",
  lines: ["I design and build", "products people", "keep coming back to."],
  sub: "Strategy, design and code in one person, with retention designed in, not bolted on. African fintech at scale, currently at MTN MoMo.",
};

export const marquee = [
  "Mobile money",
  "Business banking",
  "USSD",
  "Design systems",
  "Retention",
  "Product strategy",
  "Prototyping in code",
  "Accessibility",
];

export const statement =
  "Most designers hand off. I own the outcome: from the first user interview to the shipped component, and the metric that moves after.";

export const pillars = [
  {
    n: "01",
    title: "Retention-led strategy",
    body: "I start with why people come back, then decide what to build. Research, funnel data and market context shape the roadmap before a pixel is drawn.",
    proof: "[[Retention / engagement result from MoMo]]",
  },
  {
    n: "02",
    title: "Design that ships",
    body: "I work in Figma and in code. I prototype in React, build design-system components and talk to engineers in their language, so nothing is lost in handoff.",
    proof: "[[Design system / production components you shipped]]",
  },
  {
    n: "03",
    title: "Ownership at scale",
    body: "I run discovery, prioritisation and trade-offs with stakeholders, for regulated, mobile-first products used by people on every kind of device and connection.",
    proof: "[[Users, markets or channels (app + USSD)]]",
  },
];

export const proof = [
  { value: 15, suffix: "%", label: "Lift in user engagement after leading the business banking app redesign", note: "Capitec Business Bank" },
  { value: 0, suffix: "", placeholder: "[[00M]]", label: "[[People using the wallet experience I design]]", note: "MTN MoMo" },
  { value: 0, suffix: "", placeholder: "[[00%]]", label: "[[Retention or activation metric you moved]]", note: "MTN MoMo" },
  { value: 5, suffix: "+", label: "Years designing regulated, mobile-first financial products", note: "Since 2020" },
];

export const toolkit = {
  Strategy: ["Product discovery", "Retention & funnel analysis", "Roadmapping & prioritisation", "Market analysis"],
  Design: ["User research & testing", "Interaction & visual design", "Design systems", "Accessibility (WCAG)", "USSD & low-bandwidth UX"],
  Build: ["[[React / Next.js / TypeScript]]", "Figma → code prototyping", "HTML / CSS / JS", "Motion (GSAP) & WebGL"],
};

export const principles = [
  { t: "Start from the return visit.", d: "A launch is a hypothesis. I design for the second, tenth and hundredth session, because that's where the product either earns its place or doesn't." },
  { t: "Decide with evidence, move with conviction.", d: "Research and data narrow the options; judgement picks one. I write down the trade-off so the team can disagree with the reasoning, not the taste." },
  { t: "Prototype the risky part first.", d: "I'd rather show a working flow in a day than argue about a static screen for a week. Code is a design material." },
  { t: "Design for the worst device on the best day.", d: "USSD, low data, small screens, patchy networks. Constraints are the brief, not the exception." },
];

export const process = [
  { n: "01", t: "Frame", d: "Define the problem, the user and the metric that proves it worked." },
  { n: "02", t: "Learn", d: "Interviews, analytics, competitor and market scans: fast, to find the real constraint." },
  { n: "03", t: "Shape", d: "Flows, prototypes and system components, tested early with real users." },
  { n: "04", t: "Ship", d: "Pair with engineers, ship in slices, protect accessibility and quality." },
  { n: "05", t: "Retain", d: "Instrument, learn, iterate. The work isn't done at release." },
];

export const experience = [
  {
    company: "MTN MoMo",
    role: "Senior Product Designer",
    period: "Jul 2023 — Present",
    summary: "Designing the mobile wallet experience for one of Africa's largest mobile money platforms.",
    bullets: [
      "Lead user research, design strategy and market analysis for wallet journeys.",
      "Align design decisions with business goals across product, engineering and commercial teams.",
      "[[One concrete outcome, e.g. feature, metric and scale]]",
    ],
  },
  {
    company: "Standard Bank SA",
    role: "UX Designer (6-month contract)",
    period: "Jun — Nov 2022",
    summary: "Brought responsive design, systems thinking and USSD to a banking channel mix.",
    bullets: [
      "Responsive design and information architecture for banking journeys.",
      "Contributed to the design system, and designed for USSD constraints.",
      "[[One concrete outcome]]",
    ],
  },
  {
    company: "Capitec Business Bank",
    role: "UI & UX Designer",
    period: "Aug 2020 — 2023",
    summary: "Part of the team that redesigned the business banking app.",
    bullets: [
      "Contributed to the redesign that lifted user engagement by 15%.",
      "Built and maintained design systems; championed accessibility.",
      "Ran user research and testing; turned qualitative feedback and data into decisions.",
    ],
  },
];

export const education = [
  { year: "2019", name: "University of Cape Town", detail: "User Experience Design" },
  { year: "2018", name: "UX & Web Design Master Course", detail: "Strategy, Design, Development" },
  { year: "2011–12", name: "CTU Training Solutions", detail: "MCITP Digital Media in Interactive Digital Design · Multimedia & Web Development" },
];

export const about = {
  headline: "Designer by training, developer by habit, product owner by instinct.",
  paras: [
    "I grew up in White River, a small town in South Africa, and my ambitions were never small. I started in 2011 with graphic design, photography and web development. UX was where those threads finally made sense: creativity with a problem to solve.",
    "Since 2020 I've worked in African fintech, first in business banking, now in mobile money. The work is high-stakes (people's money), constrained (devices, data, regulation) and deeply human. I love it.",
    "I still build. This site is hand-coded because I believe designers who can ship make better product decisions, and engineers appreciate a designer who understands the cost of a pixel.",
  ],
};
