const c = { cyan: "#00C2E0", cyanPale: "#E8F9FC", dark: "#1A1A2E", text: "#2C2C3A", textLight: "#6B7280", offWhite: "#F7F8FA", border: "#E5E7EB", white: "#FFFFFF" };

export const metadata = {
  title: "Free Maths Resources for Years 7 to 10 | Bayside Academics",
  description: "Free maths worksheets, practice exams, study planners and formula sheets for Years 7 to 10, made by the tutors at Bayside Academics in Brighton through our study app, Tuterly.",
  alternates: { canonical: "https://baysideacademics.com.au/free-maths-resources" },
};

const tools = [
  {
    name: "Maths worksheet generator",
    href: "https://www.tuterly.com.au/worksheets",
    use: "For homework practice on one topic. Pick a year level (Years 3 to 10) and a topic, and get six new questions, from foundation to extension, with fully worked solutions.",
  },
  {
    name: "Practice exam generator",
    href: "https://www.tuterly.com.au/exam-generator",
    use: "For the week before a test. Choose the year (7 to 10A) and the topics on the test, and get a printable practice exam with marks, a suggested time and answers.",
  },
  {
    name: "Exam study planner",
    href: "https://www.tuterly.com.au/study-planner",
    use: "For planning revision. Enter the year, the topics and the exam date, and get a night-by-night plan with practice questions, a full practice exam and a view for parents.",
  },
  {
    name: "Maths formula sheets",
    href: "https://www.tuterly.com.au/formula-sheets",
    use: "For quick reference during homework and revision. Every key formula for Years 7, 8, 9, 10 and 10A on one printable page.",
  },
  {
    name: "The Tuterly Method",
    href: "https://www.tuterly.com.au/method",
    use: "For studying smarter. Our three-step approach (snap, fix, ace) focuses revision on the questions your child got wrong, instead of what they already know.",
  },
];

export default function FreeMathsResources() {
  return (
    <div style={{ fontFamily: "'Montserrat','Helvetica Neue',sans-serif", color: c.text, background: c.white, minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Lato:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}a{color:inherit}.tool:hover{border-color:${c.cyan}!important}@media(max-width:768px){.wrap{padding:32px 20px!important}}`}</style>
      <header style={{ background: c.white, borderBottom: `1px solid ${c.border}`, padding: "14px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" aria-label="Bayside Academics home"><img src="/logo.png" alt="Bayside Academics" style={{ height: 44, width: "auto", display: "block" }} /></a>
          <a href="/" style={{ color: c.dark, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none" }}>Home</a>
        </div>
      </header>

      <main className="wrap" style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: c.dark, marginBottom: 14 }}>Free maths resources for Years 7 to 10</h1>
        <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, maxWidth: 720, fontFamily: "'Lato',sans-serif", marginBottom: 12 }}>
          Our tutors built these free tools for the questions parents ask us most: how to practise between sessions, and how to prepare for a test. They live on Tuterly, the maths study app made by the team at Bayside Academics, and follow the Australian Curriculum.
        </p>
        <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, maxWidth: 720, fontFamily: "'Lato',sans-serif", marginBottom: 40 }}>
          The worksheet and practice exam generators ask for an email address before you download.
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          {tools.map((t) => (
            <a key={t.href} className="tool" href={t.href} target="_blank" rel="noopener" style={{ display: "block", textDecoration: "none", background: c.offWhite, border: `1px solid ${c.border}`, borderRadius: 14, padding: "22px 24px", transition: "border-color 0.2s" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: c.dark, marginBottom: 6 }}>{t.name} <span style={{ color: c.cyan }}>→</span></h2>
              <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, fontFamily: "'Lato',sans-serif" }}>{t.use}</p>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 48, background: c.cyanPale, borderRadius: 14, padding: "26px 24px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: c.dark, marginBottom: 8 }}>Want one-on-one help?</h2>
          <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, fontFamily: "'Lato',sans-serif" }}>
            Our tutors work with students from Prep to Year 12, face to face in Brighton or online. Call <a href="tel:0426787978" style={{ color: c.dark, fontWeight: 700 }}>0426 787 978</a> or email <a href="mailto:admin@baysideacademics.com.au" style={{ color: c.dark, fontWeight: 700 }}>admin@baysideacademics.com.au</a>.
          </p>
        </div>
      </main>

      <footer style={{ background: c.dark, padding: "28px 24px", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
          <span>Bayside Academics · 5/240 Bay St, Brighton VIC 3186 · 0426 787 978</span>
          <span>© 2026 Bayside Academics. ABN: 29 701 561 362</span>
        </div>
      </footer>
    </div>
  );
}
