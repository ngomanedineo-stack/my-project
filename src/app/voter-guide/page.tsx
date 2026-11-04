const IEC = "https://www.elections.org.za";
const Q: [string, string][] = [
  ["How do I check my registration?", "Use the IEC's official registration check (website, SMS or the IEC voter app). Mzansi Votes never asks for or stores your ID number."],
  ["How do I find my voting station?", "Your designated station is shown by the IEC where you are registered. Searching an address here does not prove registration or your station."],
  ["What ID is accepted?", "A valid green barcoded ID book, smart ID card or a valid South African passport/driver’s licence only where the IEC rules allow it. Confirm the current list on the IEC website."],
  ["Ward vs PR councillors", "On the ballot you typically vote for a ward candidate and for a party list. Ward councillors represent one ward; PR councillors are allocated from party lists so that council seats reflect party support."],
  ["How is a mayor chosen?", "The elected council chooses its mayor. Having the most votes does not guarantee governing: parties may form coalitions, and until the council decides no government is confirmed."],
  ["Is my vote valid?", "Follow the IEC’s instructions on each ballot. Unclear or multiple marks can spoil a ballot — read the guidance on the IEC site."],
  ["Something is wrong with my voter details", "Contact the IEC through its official channels well before the registration deadline; the IEC handles complaints and corrections."],
];
export default function Guide() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Voting Guide</h1>
      <p className="text-mute">Plain-language summaries. The IEC is the authority — always confirm details and deadlines at <a className="underline" href={IEC} rel="noopener noreferrer">elections.org.za</a>. <em>These summaries are drafts pending translation and legal review.</em></p>
      <div className="space-y-2">{Q.map(([q, a]) => (
        <details key={q} className="card"><summary className="cursor-pointer font-semibold min-h-[44px] flex items-center">{q}</summary><p className="mt-1 text-sm">{a}</p></details>))}</div>
      <a href={IEC} rel="noopener noreferrer" className="btn inline-flex items-center bg-teal-600 text-white">Go to the official IEC site</a>
    </div>
  );
}
