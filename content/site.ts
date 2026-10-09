/**
 * All site-wide copy and links live here so you can edit without touching components.
 * Anything wrapped in [square brackets] is a PLACEHOLDER for you to replace.
 */
export const site = {
  name: "Deneo Ngomane",
  role: "Senior Product Designer · Product Owner",
  url: "https://www.deneon.co.za",
  email: "hello@deneon.co.za",
  phone: "065 890 6690", // [confirm: old site showed two different numbers]
  location: "Johannesburg, South Africa",
  linkedin: "https://www.linkedin.com/in/[your-handle]", // [add LinkedIn URL]
  book: "https://cal.com/[your-handle]", // [add Calendly / Cal.com link]
  cv: "/Deneo_Ngomane_CV.pdf",
  availability: "Open to senior product roles · from [month, year]",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Senior Product Designer · Product Owner · Developer",
  headline: ["I design products", "people come", "back to."],
  emphasis: "back",
  sub: "Product designer and strategist in African fintech. I own the problem from research and product strategy to shipped code, and I measure it in retention.",
  hint: "Move to keep them",
  now: "Now: Senior Product Designer, MTN MoMo",
};

export const pillars = [
  {
    n: "01",
    title: "Retention-first",
    line: "I start with why users leave, not which screens to draw.",
    body: "Every project begins with the behaviour behind the numbers: where people drop, what brings them back, and what the business can realistically change. Design then becomes a way to move one metric, not decorate a flow.",
    stat: { value: "15", suffix: "%", label: "engagement lift on the Capitec business banking redesign" },
  },
  {
    n: "02",
    title: "Strategy to production",
    line: "Direction, design and code in one person, so nothing is lost in handoff.",
    body: "I can write the product brief, prioritise the backlog, design the flow and build the prototype. Engineers get fewer surprises. Stakeholders get decisions sooner.",
    stat: { value: "2011", suffix: "", label: "building for the web, from graphic design to front-end to product" },
  },
  {
    n: "03",
    title: "Built for emerging markets",
    line: "Mobile-first, low-bandwidth, trust-critical.",
    body: "USSD to app, accessible by default, and designed for people whose money decisions carry real weight. Fintech across Capitec, Standard Bank and MTN MoMo.",
    stat: { value: "3", suffix: "", label: "major African financial brands shipped for" },
  },
];

export const principles = [
  { t: "Start from the metric", d: "Name the number we're trying to move before anyone opens Figma." },
  { t: "Decide in the open", d: "Write down options, trade-offs and the reason. Good decisions are reviewable." },
  { t: "Prototype in code when it matters", d: "A working prototype ends more debates than a hundred frames." },
  { t: "Ship small, learn fast", d: "Smaller releases make the signal clearer and the risk smaller." },
  { t: "Accessible is the default", d: "Contrast, keyboard, reduced motion and plain language are table stakes." },
  { t: "Design for the worst network", d: "If it works on a low-end phone with a weak signal, it works everywhere." },
];

export const process = [
  { n: "01", t: "Frame", d: "Define the problem, the user, the metric and the constraints. Align stakeholders on what success means." },
  { n: "02", t: "Understand", d: "Research, analytics and market analysis to find the real behaviour behind the numbers." },
  { n: "03", t: "Shape", d: "Information architecture, flows and options, with the trade-offs written down." },
  { n: "04", t: "Build & test", d: "Prototype, usability-test, build in code where it unblocks the team, and iterate." },
  { n: "05", t: "Measure", d: "Instrument, ship, read the data, and decide what to do next." },
];

export const experience = [
  {
    company: "MTN MoMo",
    role: "Senior Product Designer",
    period: "July 2023 – Present",
    start: 2023,
    summary: "Designing a mobile money wallet used across African markets.",
    points: ["User research and design strategy", "Market analysis and business alignment", "Visual design for a high-trust financial product", "[Add one outcome with a number]"],
  },
  {
    company: "Standard Bank SA",
    role: "UX Designer (contract)",
    period: "June – November 2022",
    start: 2022,
    summary: "Six-month contract on responsive and USSD banking experiences.",
    points: ["Responsive design and design systems", "USSD flows and information architecture", "[Add one outcome with a number]"],
  },
  {
    company: "Capitec Business Bank",
    role: "UI & UX Designer",
    period: "August 2020 – June 2023", // [confirm end date: site said July 2023]
    start: 2020,
    summary: "Part of the team that redesigned the business banking app.",
    points: ["15% increase in user engagement after the redesign", "Built and maintained design systems", "Accessibility, user research and testing", "Turned data and qualitative feedback into decisions"],
  },
];

export const education = [
  { year: "2019", name: "University of Cape Town", detail: "User Experience Design, all units completed" },
  { year: "2018", name: "UX & Web Design Master Course", detail: "Strategy, design and development" },
  { year: "2012", name: "CTU Training Solutions", detail: "Multi-media and Web Development; MCITP Digital Media in Interactive Digital Design" },
  { year: "2011", name: "CTU Training Solutions", detail: "Graphic Design, Photography; MCITP Design Foundation" },
];

export const toolkit = [
  { group: "Strategy", items: ["Product ownership", "Roadmapping", "Market analysis", "Metrics & analytics"] },
  { group: "Design", items: ["User research", "Information architecture", "Design systems", "Prototyping", "Usability testing", "Accessibility"] },
  { group: "Build", items: ["HTML / CSS / JavaScript", "[Add: React, Node, etc.]", "Figma", "Google Analytics"] },
];
