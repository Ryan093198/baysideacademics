"use client";
import { useEffect } from "react";

export default function BilingualTutoringPage() {
  useEffect(() => {
    // Language toggle function
    window.setLang = function(lang) {
      document.body.classList.toggle('zh', lang === 'zh');
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === (lang === 'zh' ? '中文' : 'EN'));
      });
      const langSelect = document.querySelector('select[name="language"]');
      if (lang === 'zh' && langSelect) {
        langSelect.value = 'Mandarin';
      }
    };
    return () => { delete window.setLang; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone_wechat,
          message: `Role: ${data.role}\nLanguage: ${data.language}\nYear Level: ${data.year_level}\nSubject: ${data.subject}\nNotes: ${data.notes || 'N/A'}`,
          type: "enrol",
          childName: data.name,
          yearLevel: data.year_level,
        }),
      });
      if (r.ok) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', { send_to: 'AW-777828845/DcpxCMie-doBEO3z8vIC' });
        }
        alert('Thank you! We will be in touch within 24 hours.');
        form.reset();
      }
    } catch (err) {
      window.open(`mailto:admin@baysideacademics.com.au?subject=Bilingual Tutor Match Request&body=${encodeURIComponent(JSON.stringify(data, null, 2))}`);
    }
  };

  return (
    <>
      <style>{`
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root { --dark: #1a1a2e; --text: #2c2c2c; --text-muted: #666; --red: #c0392b; --red-bright: #e74c3c; --red-light: #fdf2f0; --red-glow: rgba(192,57,43,0.12); --white: #fff; --bg: #fff; --bg-alt: #f9f9fb; --bg-dark: #1a1a2e; --grey: #777; --grey-border: #e8e8ec; --green: #27ae60; }
html { scroll-behavior: smooth; }
body { font-family: 'Lato', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
.lang-toggle { display: flex; align-items: center; gap: 0.4rem; margin-right: 0.5rem; }
.lang-btn { font-family: 'Montserrat', sans-serif; font-size: 0.72rem; font-weight: 600; padding: 0.35rem 0.7rem; border: 1px solid var(--grey-border); border-radius: 4px; background: transparent; color: var(--text-muted); cursor: pointer; transition: all 0.2s; }
.lang-btn.active { background: var(--red); color: var(--white); border-color: var(--red); }
.lang-btn:hover:not(.active) { border-color: var(--text-muted); }
[data-lang="zh"] { display: none; }
body.zh [data-lang="en"] { display: none; }
body.zh [data-lang="zh"] { display: block; }
body.zh span[data-lang="en"] { display: none; }
body.zh span[data-lang="zh"] { display: inline; }
body.zh .hide-in-zh { display: none !important; }
body.zh .show-in-zh { display: flex !important; }
.bl-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); border-bottom: 1px solid var(--grey-border); }
.nav-logo { display: flex; align-items: center; text-decoration: none; }
.nav-logo img { height: 36px; }
.nav-links { display: flex; gap: 1.5rem; align-items: center; }
.nav-links a { font-family: 'Lato', sans-serif; font-size: 0.88rem; color: var(--text-muted); text-decoration: none; transition: color 0.3s; }
.nav-links a:hover { color: var(--dark); }
.nav-links a.nav-cta { font-family: 'Montserrat', sans-serif; font-size: 0.8rem; font-weight: 600; padding: 0.6rem 1.4rem; background: var(--red); color: #ffffff !important; border: none; border-radius: 6px; cursor: pointer; text-decoration: none; transition: all 0.3s; }
.nav-links a.nav-cta:hover { background: var(--red-bright); }
.hero { padding: 8rem 2rem 4rem; background: var(--bg); }
.hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 3rem; align-items: center; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
.hero-text { animation: fadeUp 0.7s ease-out; }
.hero-badge { display: inline-block; font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--red); background: var(--red-light); padding: 0.5rem 1rem; border-radius: 30px; margin-bottom: 1.5rem; }
.hero h1 { font-family: 'Montserrat', sans-serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.2; margin-bottom: 1.2rem; color: var(--dark); }
.hero h1 em { font-style: normal; color: var(--red); }
.hero-text > p { font-size: 1.02rem; line-height: 1.75; color: var(--text-muted); margin-bottom: 0.8rem; }
.hero-image { border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.08); animation: fadeUp 0.9s ease-out 0.15s both; max-width: 360px; justify-self: end; }
.hero-image img { width: 100%; height: auto; object-fit: cover; display: block; }
.hero-buttons { display: flex; gap: 1rem; margin-top: 1.8rem; flex-wrap: wrap; }
.btn-primary { font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 600; padding: 0.9rem 1.8rem; background: var(--red); color: var(--white); border: none; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
.btn-primary:hover { background: var(--red-bright); box-shadow: 0 4px 20px var(--red-glow); }
.btn-outline { font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 600; padding: 0.9rem 1.8rem; background: transparent; color: var(--text); border: 1px solid var(--grey-border); border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
.btn-outline:hover { border-color: var(--text); }
.stats-bar { background: var(--bg-alt); border-top: 1px solid var(--grey-border); border-bottom: 1px solid var(--grey-border); padding: 2rem; }
.stats-inner { max-width: 700px; margin: 0 auto; display: flex; justify-content: space-around; gap: 2rem; }
.stat { text-align: center; }
.stat-number { font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--dark); }
.stat-label { font-size: 0.8rem; color: var(--grey); margin-top: 0.15rem; }
.bl-section { padding: 5rem 2rem; }
.section-label { font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--red); margin-bottom: 0.8rem; text-align: center; }
.section-title { font-family: 'Montserrat', sans-serif; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; text-align: center; margin-bottom: 0.8rem; color: var(--dark); }
.section-subtitle { font-size: 0.95rem; color: var(--text-muted); text-align: center; max-width: 550px; margin: 0 auto 3rem; line-height: 1.7; }
.how-grid { max-width: 850px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.how-card { text-align: center; padding: 1.5rem; }
.how-number { width: 50px; height: 50px; border-radius: 50%; background: var(--red-light); border: 2px solid var(--red); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1.05rem; color: var(--red); }
.how-card h3 { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--dark); }
.how-card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.65; }
.form-section-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
.form-info h2 { font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--dark); margin-bottom: 1rem; line-height: 1.3; }
.form-info p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 1.5rem; }
.form-checklist { list-style: none; }
.form-checklist li { font-size: 0.9rem; color: var(--text-muted); padding: 0.5rem 0; display: flex; align-items: center; gap: 0.7rem; }
.form-checklist li::before { content: '✓'; color: var(--red); font-weight: 700; flex-shrink: 0; }
.match-form { background: var(--white); border: 1px solid var(--grey-border); border-radius: 16px; padding: 2.2rem; box-shadow: 0 6px 30px rgba(0,0,0,0.05); }
.match-form h3 { font-family: 'Montserrat', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 0.3rem; }
.match-form .form-subtitle { font-size: 0.82rem; color: var(--grey); margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-family: 'Montserrat', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem; }
.form-group select, .form-group input, .form-group textarea { width: 100%; padding: 0.75rem 0.9rem; background: var(--bg-alt); border: 1px solid var(--grey-border); border-radius: 8px; color: var(--text); font-family: 'Lato', sans-serif; font-size: 0.9rem; transition: all 0.3s; }
.form-group textarea { resize: vertical; min-height: 60px; }
.form-group select:focus, .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--red); box-shadow: 0 0 0 3px var(--red-glow); background: var(--white); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.form-submit { width: 100%; padding: 0.85rem; margin-top: 0.3rem; background: var(--red); color: var(--white); border: none; border-radius: 8px; font-family: 'Montserrat', sans-serif; font-size: 0.88rem; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.form-submit:hover { background: var(--red-bright); }
.form-note { text-align: center; font-size: 0.72rem; color: var(--grey); margin-top: 0.7rem; }
.lang-grid { max-width: 680px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 0.7rem; justify-content: center; }
.lang-tag { font-family: 'Montserrat', sans-serif; font-size: 0.82rem; font-weight: 600; padding: 0.6rem 1.2rem; border-radius: 30px; border: 1px solid var(--grey-border); background: var(--white); color: var(--text); transition: all 0.3s; cursor: default; }
.lang-tag:hover { border-color: var(--red); background: var(--red-light); }
.lang-tag.featured { border-color: var(--red); background: var(--red-light); color: var(--red); }
.lang-note { text-align: center; margin-top: 1.8rem; font-size: 0.85rem; color: var(--grey); }
.why-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.why-card { padding: 2rem; border-radius: 12px; border: 1px solid var(--grey-border); background: var(--white); transition: all 0.3s; }
.why-card:hover { box-shadow: 0 6px 25px rgba(0,0,0,0.06); transform: translateY(-3px); }
.why-icon { font-size: 1.5rem; margin-bottom: 0.8rem; }
.why-card h3 { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--dark); }
.why-card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.65; }
.bl-tutors { background: var(--bg-dark); color: var(--white); }
.bl-tutors .section-label { color: var(--red-bright); }
.bl-tutors .section-title { color: var(--white); }
.tutor-cta-box { max-width: 680px; margin: 0 auto; padding: 3rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); text-align: center; }
.tutor-cta-box h3 { font-family: 'Montserrat', sans-serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 0.7rem; }
.tutor-cta-box > p { font-size: 0.95rem; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 2rem; }
.tutor-benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; text-align: left; margin-bottom: 2rem; }
.tutor-benefit { font-size: 0.88rem; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 0.6rem; }
.tutor-benefit::before { content: '✓'; color: var(--red-bright); font-weight: 700; flex-shrink: 0; }
.faq-list { max-width: 680px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid var(--grey-border); padding: 1.3rem 0; }
.faq-q { font-family: 'Montserrat', sans-serif; font-size: 0.92rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--dark); }
.faq-a { font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; }
.cta-bottom { background: var(--bg-alt); padding: 4rem 2rem; text-align: center; border-top: 1px solid var(--grey-border); }
.cta-bottom h2 { font-family: 'Montserrat', sans-serif; font-size: 1.6rem; font-weight: 700; color: var(--dark); margin-bottom: 0.8rem; }
.cta-bottom p { color: var(--text-muted); max-width: 460px; margin: 0 auto 1.8rem; line-height: 1.7; font-size: 0.95rem; }
.bl-footer { background: var(--bg-dark); color: rgba(255,255,255,0.6); padding: 3rem 2rem; }
.footer-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 2rem; }
.footer-brand { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1rem; color: var(--white); margin-bottom: 0.6rem; }
.footer-brand-desc { font-size: 0.82rem; line-height: 1.6; color: rgba(255,255,255,0.5); }
.footer-col h4 { font-family: 'Montserrat', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.8rem; }
.footer-col a { display: block; font-size: 0.85rem; color: rgba(255,255,255,0.6); text-decoration: none; margin-bottom: 0.4rem; transition: color 0.3s; }
.footer-col a:hover { color: var(--white); }
.footer-bottom { max-width: 1000px; margin: 2rem auto 0; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.78rem; color: rgba(255,255,255,0.35); text-align: center; }
@media (max-width: 768px) {
  .bl-nav { padding: 0.8rem 1.2rem; }
  .nav-links { display: none; }
  .hero { padding: 6rem 1.2rem 3rem; }
  .hero-inner { grid-template-columns: 1fr; gap: 2rem; }
  .hero-image { max-width: 280px; justify-self: center; }
  .bl-section { padding: 3.5rem 1.2rem; }
  .how-grid { grid-template-columns: 1fr; }
  .form-section-inner { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .tutor-benefits { grid-template-columns: 1fr; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .stats-inner { flex-direction: column; gap: 1rem; }
}
@media (max-width: 480px) { .footer-inner { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="bl-nav">
        <a href="https://baysideacademics.com.au" className="nav-logo">
          <img src="/logo.png" alt="Bayside Academics" />
        </a>
        <div className="nav-links">
          <a href="https://baysideacademics.com.au">Home</a>
          <a href="#how-it-works"><span data-lang="en">How It Works</span><span data-lang="zh">如何运作</span></a>
          <a href="#languages"><span data-lang="en">Languages</span><span data-lang="zh">语言</span></a>
          <a href="#for-tutors"><span data-lang="en">For Tutors</span><span data-lang="zh">导师招募</span></a>
          <div className="lang-toggle">
            <button className="lang-btn active" onClick={() => window.setLang('en')}>EN</button>
            <button className="lang-btn" onClick={() => window.setLang('zh')}>中文</button>
          </div>
          <a href="#find-tutor" className="nav-cta"><span data-lang="en">Find a Tutor</span><span data-lang="zh">找导师</span></a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <span data-lang="en">For International Students in Australia</span>
              <span data-lang="zh">为在澳大利亚的中国留学生</span>
            </div>
            <h1>
              <span data-lang="en">Lessons for any subject.<br/>With expert <em>bilingual tutors.</em></span>
              <span data-lang="zh">任何科目的专业辅导。<br/><em>中英双语导师。</em></span>
            </h1>
            <p data-lang="en">New to an Australian school and struggling to keep up? We match international students with local tutors who speak your language and understand the Australian curriculum.</p>
            <p data-lang="zh">刚到澳大利亚的学校，跟不上进度？我们为中国留学生匹配会说中文、并且熟悉澳大利亚课程的本地导师。</p>
            <p data-lang="en">Get help in Maths, English, Science and more - explained in Mandarin, Vietnamese, Hindi, Korean, Japanese, Arabic, or your home language.</p>
            <p data-lang="zh">数学、英语、科学等各科辅导 - 用中文讲解，让你轻松理解每一个知识点。</p>
            <div className="hero-buttons">
              <a href="#find-tutor" className="btn-primary"><span data-lang="en">Find a Tutor</span><span data-lang="zh">找导师</span></a>
              <a href="#how-it-works" className="btn-outline"><span data-lang="en">How It Works</span><span data-lang="zh">如何运作</span></a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/bilingual-tutor-hero.jpg" alt="Bilingual tutoring session" />
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat"><div className="stat-number"><span data-lang="en">10+</span><span data-lang="zh">中文</span></div><div className="stat-label"><span data-lang="en">Languages</span><span data-lang="zh">普通话 & 粤语</span></div></div>
          <div className="stat"><div className="stat-number"><span data-lang="en">Prep - University</span><span data-lang="zh">学前班 - 大学</span></div><div className="stat-label"><span data-lang="en">All Levels</span><span data-lang="zh">所有年级</span></div></div>
          <div className="stat"><div className="stat-number">100%</div><div className="stat-label"><span data-lang="en">Curriculum Aligned</span><span data-lang="zh">课程对齐</span></div></div>
        </div>
      </div>

      <section className="bl-section" id="how-it-works">
        <div className="section-label"><span data-lang="en">How It Works</span><span data-lang="zh">如何运作</span></div>
        <div className="section-title"><span data-lang="en">Matched in 24 hours.</span><span data-lang="zh">24小时内匹配。</span></div>
        <div className="section-subtitle"><span data-lang="en">Tell us what you need. We do the rest.</span><span data-lang="zh">告诉我们你的需求，我们来安排。</span></div>
        <div className="how-grid">
          <div className="how-card"><div className="how-number">1</div><h3><span data-lang="en">Tell us what you need</span><span data-lang="zh">告诉我们你的需求</span></h3><p><span data-lang="en">Fill in the form with your year level, the subject you need help with, and the language spoken at home.</span><span data-lang="zh">填写表格，告诉我们你的年级和需要辅导的科目。</span></p></div>
          <div className="how-card"><div className="how-number">2</div><h3><span data-lang="en">We find the right tutor</span><span data-lang="zh">匹配会说中文的导师</span></h3><p><span data-lang="en">We match you with a local tutor who knows the Australian curriculum and speaks your language.</span><span data-lang="zh">我们为你匹配一位熟悉澳大利亚课程、并且会说中文的本地导师。</span></p></div>
          <div className="how-card"><div className="how-number">3</div><h3><span data-lang="en">Start learning</span><span data-lang="zh">开始学习</span></h3><p><span data-lang="en">Sessions are conducted in English to build language skills, but your tutor can explain anything in your first language.</span><span data-lang="zh">课程以英语进行，帮助你提高英语能力。但导师也会说中文，遇到听不懂的内容可以随时用中文解释。</span></p></div>
        </div>
      </section>

      <section className="bl-section" id="find-tutor" style={{background:"var(--bg-alt)"}}>
        <div className="section-label"><span data-lang="en">Get Started</span><span data-lang="zh">开始</span></div>
        <div className="section-title"><span data-lang="en">Find your tutor.</span><span data-lang="zh">找到你的导师。</span></div>
        <div className="section-subtitle"></div>
        <div className="form-section-inner">
          <div className="form-info">
            <h2><span data-lang="en">Tell us what you need and we'll match you with the perfect tutor.</span><span data-lang="zh">告诉我们你的需求，我们会为你匹配最合适的导师。</span></h2>
            <p data-lang="en">Every tutor on our team is a local, high-achieving student or qualified educator who understands the Australian curriculum and can explain concepts in your home language.</p>
            <p data-lang="zh">我们团队的每一位导师都是本地的优秀学生或合格教育工作者，熟悉澳大利亚课程，并能用你的母语解释概念。</p>
            <ul className="form-checklist">
              <li><span data-lang="en">Matched within 24 hours</span><span data-lang="zh">24小时内匹配</span></li>
              <li><span data-lang="en">No sign-up fees or lock-in contracts</span><span data-lang="zh">无注册费或锁定合同</span></li>
              <li><span data-lang="en">Free rematch if the tutor isn't the right fit</span><span data-lang="zh">如果导师不合适，免费重新匹配</span></li>
              <li><span data-lang="en">Detailed report after every session</span><span data-lang="zh">每节课后提供详细报告</span></li>
              <li><span data-lang="en">Sessions available online or face-to-face</span><span data-lang="zh">可在线或面对面上课</span></li>
              <li><span data-lang="en">Pre-arrival programs for students still overseas</span><span data-lang="zh">为还在海外的学生提供预备课程</span></li>
            </ul>
            <div style={{marginTop:"1.5rem",padding:"1.2rem 1.4rem",background:"var(--white)",border:"1px solid var(--grey-border)",borderRadius:12}}>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:"0.75rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"var(--red)",marginBottom:"0.8rem"}}><span data-lang="en">Prefer to get in touch directly?</span><span data-lang="zh">更喜欢直接联系？</span></p>
              <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"0.5rem"}}><span style={{fontSize:"1.1rem"}}>📱</span><a href="tel:0426787978" style={{fontSize:"0.95rem",color:"var(--dark)",fontWeight:600,textDecoration:"none"}}>0426 787 978</a></div>
              <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"0.5rem"}}><span style={{fontSize:"1.1rem"}}>📧</span><a href="mailto:admin@baysideacademics.com.au" style={{fontSize:"0.95rem",color:"var(--dark)",fontWeight:600,textDecoration:"none"}}>admin@baysideacademics.com.au</a></div>
              <div style={{display:"flex",alignItems:"center",gap:"0.7rem"}}><span style={{fontSize:"1.1rem"}}>💬</span><span style={{fontSize:"0.88rem",color:"var(--text-muted)"}}><span data-lang="en">WeChat available on request</span><span data-lang="zh">可提供微信联系方式</span></span></div>
            </div>
          </div>
          <div className="match-form">
            <h3><span data-lang="en">Find Your Tutor</span><span data-lang="zh">找到你的导师</span></h3>
            <p className="form-subtitle"><span data-lang="en">Free to submit. No obligation.</span><span data-lang="zh">免费提交，无需承诺。</span></p>
            <div onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label><span data-lang="en">Your Name</span><span data-lang="zh">你的名字</span></label><input type="text" name="name" required /></div>
                <div className="form-group"><label><span data-lang="en">I am a...</span><span data-lang="zh">我是...</span></label><select name="role" required defaultValue=""><option value="" disabled>—</option><option value="Student">Student / 学生</option><option value="Parent">Parent / 家长</option></select></div>
              </div>
              <div className="form-group"><label><span data-lang="en">Home Language</span><span data-lang="zh">母语</span></label><select name="language" required defaultValue=""><option value="" disabled>—</option><option value="Mandarin">中文 Mandarin</option><option value="Cantonese">廣東話 Cantonese</option><option value="Vietnamese">Tiếng Việt Vietnamese</option><option value="Hindi">हिन्दी Hindi</option><option value="Korean">한국어 Korean</option><option value="Japanese">日本語 Japanese</option><option value="Arabic">العربية Arabic</option><option value="Tamil">தமிழ் Tamil</option><option value="Sinhalese">සිංහල Sinhalese</option><option value="Indonesian">Bahasa Indonesia</option><option value="Thai">ภาษาไทย Thai</option><option value="Other">Other</option></select></div>
              <div className="form-row">
                <div className="form-group"><label><span data-lang="en">Year Level</span><span data-lang="zh">年级</span></label><select name="year_level" required defaultValue=""><option value="" disabled>—</option><option>Prep</option><option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option><option>Year 5</option><option>Year 6</option><option>Year 7</option><option>Year 8</option><option>Year 9</option><option>Year 10</option><option>Year 11</option><option>Year 12</option><option>University</option></select></div>
                <div className="form-group"><label><span data-lang="en">Subject</span><span data-lang="zh">科目</span></label><select name="subject" required defaultValue=""><option value="" disabled>—</option><option>Mathematics</option><option>English</option><option>Science</option><option>Humanities</option><option>Multiple subjects</option></select></div>
              </div>
              <div className="form-group"><label><span data-lang="en">Email</span><span data-lang="zh">邮箱</span></label><input type="email" name="email" required /></div>
              <div className="form-group"><label><span data-lang="en">Phone / WeChat (optional)</span><span data-lang="zh">电话 / 微信（选填）</span></label><input type="text" name="phone_wechat" /></div>
              <div className="form-group"><label><span data-lang="en">Anything else? (optional)</span><span data-lang="zh">其他备注（选填）</span></label><textarea name="notes" rows={2}></textarea></div>
              <button type="button" onClick={(e) => { const form = e.target.closest('.match-form'); const inputs = form.querySelectorAll('[required]'); let valid = true; inputs.forEach(i => { if (!i.value) valid = false; }); if (valid) { const data = {}; form.querySelectorAll('input,select,textarea').forEach(i => { if(i.name) data[i.name] = i.value; }); fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone_wechat, message: "Role: " + data.role + "\nLanguage: " + data.language + "\nYear Level: " + data.year_level + "\nSubject: " + data.subject + "\nNotes: " + (data.notes || "N/A"), type: "enrol", childName: data.name, yearLevel: data.year_level }) }).then(r => { if(r.ok) { if (typeof window !== 'undefined' && typeof window.gtag === 'function') { window.gtag('event', 'conversion', { send_to: 'AW-777828845/DcpxCMie-doBEO3z8vIC' }); } alert('Thank you! We will be in touch within 24 hours.'); form.querySelectorAll('input,textarea').forEach(i => i.value = ''); } }); } else { alert('Please fill in all required fields.'); } }} className="form-submit"><span data-lang="en">Match Me With a Tutor</span><span data-lang="zh">为我匹配导师</span></button>
              <p className="form-note"><span data-lang="en">We'll respond within 24 hours.</span><span data-lang="zh">我们将在24小时内回复。</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="bl-section" id="languages">
        <div className="section-label"><span data-lang="en">Languages Available</span><span data-lang="zh">中文辅导</span></div>
        <div className="section-title"><span data-lang="en">Tutors who speak your language.</span><span data-lang="zh">会说中文的本地导师。</span></div>
        <div className="section-subtitle"><span data-lang="en">Bilingual tutors across the most common languages spoken by international students in Australian schools.</span><span data-lang="zh">我们的导师不仅精通澳大利亚课程，还能用中文为你讲解难点。</span></div>
        <div className="lang-grid hide-in-zh">
          <span className="lang-tag featured">中文 Mandarin</span><span className="lang-tag featured">廣東話 Cantonese</span><span className="lang-tag">Tiếng Việt Vietnamese</span><span className="lang-tag">हिन्दी Hindi</span><span className="lang-tag">한국어 Korean</span><span className="lang-tag">日本語 Japanese</span><span className="lang-tag">العربية Arabic</span><span className="lang-tag">தமிழ் Tamil</span><span className="lang-tag">Bahasa Indonesia</span><span className="lang-tag">ภาษาไทย Thai</span><span className="lang-tag">සිංහල Sinhalese</span>
        </div>
        <div className="lang-grid show-in-zh" style={{display:"none",justifyContent:"center"}}>
          <span className="lang-tag featured">普通话 Mandarin</span><span className="lang-tag featured">粤语 Cantonese</span>
        </div>
        <p className="lang-note hide-in-zh"><span data-lang="en">Don't see your language? Get in touch - we're always expanding our tutor network.</span></p>
      </section>

      <section className="bl-section" style={{background:"var(--bg-alt)"}}>
        <div className="section-label"><span data-lang="en">Why Bayside Academics</span><span data-lang="zh">为什么选择 Bayside Academics</span></div>
        <div className="section-title"><span data-lang="en">More than just tutoring.</span><span data-lang="zh">不仅仅是辅导。</span></div>
        <div className="section-subtitle"><span data-lang="en">We understand what international students go through because we've been there.</span><span data-lang="zh">我们理解国际学生的经历，因为我们也有过同样的体验。</span></div>
        <div className="why-grid">
          <div className="why-card"><div className="why-icon">🎓</div><h3><span data-lang="en">Curriculum Experts</span><span data-lang="zh">课程专家</span></h3><p><span data-lang="en">Every tutor knows the Australian curriculum and can teach exactly what's needed.</span><span data-lang="zh">每位导师都熟悉澳大利亚课程。</span></p></div>
          <div className="why-card"><div className="why-icon">🌏</div><h3><span data-lang="en">Bilingual Tutors</span><span data-lang="zh">中文导师</span></h3><p><span data-lang="en">When a concept is hard in English, your tutor can explain it in your first language.</span><span data-lang="zh">导师可以用中文为你讲解。</span></p></div>
          <div className="why-card"><div className="why-icon">📊</div><h3><span data-lang="en">Detailed Reports</span><span data-lang="zh">详细报告</span></h3><p><span data-lang="en">After every session, receive a summary of what was covered and what to focus on next.</span><span data-lang="zh">每次课程后收到课程报告。</span></p></div>
          <div className="why-card"><div className="why-icon">🏫</div><h3><span data-lang="en">School Preparation</span><span data-lang="zh">入学准备</span></h3><p><span data-lang="en">Arriving in Australia soon? We offer pre-arrival programs.</span><span data-lang="zh">我们提供预备课程。</span></p></div>
          <div className="why-card"><div className="why-icon">📍</div><h3><span data-lang="en">Local & Online</span><span data-lang="zh">本地和在线</span></h3><p><span data-lang="en">Based in Brighton, Melbourne. Sessions available face-to-face or online.</span><span data-lang="zh">位于墨尔本Brighton。</span></p></div>
          <div className="why-card"><div className="why-icon">🤝</div><h3><span data-lang="en">School Selection Help</span><span data-lang="zh">择校建议</span></h3><p><span data-lang="en">Not sure which school is right? We can help guide you.</span><span data-lang="zh">我们可以帮你了解学校选择。</span></p></div>
        </div>
      </section>

      <section className="bl-section bl-tutors" id="for-tutors">
        <div className="section-label"><span data-lang="en">For Tutors</span><span data-lang="zh">导师招募</span></div>
        <div className="section-title"><span data-lang="en">Speak another language? Join our team.</span><span data-lang="zh">会说其他语言？加入我们的团队。</span></div>
        <div className="tutor-cta-box">
          <h3><span data-lang="en">We're looking for bilingual tutors.</span><span data-lang="zh">我们正在寻找双语导师。</span></h3>
          <p><span data-lang="en">If you're a high-achieving student or qualified educator who speaks a second language, we'd love to hear from you.</span><span data-lang="zh">如果你成绩优异并且会说第二种语言，我们期待你的加入。</span></p>
          <div className="tutor-benefits">
            <div className="tutor-benefit"><span data-lang="en">Flexible hours</span><span data-lang="zh">灵活时间</span></div>
            <div className="tutor-benefit"><span data-lang="en">Competitive pay</span><span data-lang="zh">有竞争力的薪酬</span></div>
            <div className="tutor-benefit"><span data-lang="en">Online or face-to-face</span><span data-lang="zh">在线或面对面</span></div>
            <div className="tutor-benefit"><span data-lang="en">Resources provided</span><span data-lang="zh">提供课程资源</span></div>
            <div className="tutor-benefit"><span data-lang="en">Professional support</span><span data-lang="zh">专业支持</span></div>
            <div className="tutor-benefit"><span data-lang="en">Join a growing team</span><span data-lang="zh">加入团队</span></div>
          </div>
          <a href="mailto:admin@baysideacademics.com.au?subject=Tutor Application - Bilingual" className="btn-primary"><span data-lang="en">Apply to Tutor</span><span data-lang="zh">申请成为导师</span></a>
        </div>
      </section>

      <section className="bl-section">
        <div className="section-label"><span data-lang="en">Common Questions</span><span data-lang="zh">常见问题</span></div>
        <div className="section-title"><span data-lang="en">Frequently asked.</span><span data-lang="zh">常见问题解答。</span></div>
        <div className="faq-list">
          <div className="faq-item"><div className="faq-q"><span data-lang="en">I'm still overseas. Can I start now?</span><span data-lang="zh">我还在海外，可以现在开始吗？</span></div><div className="faq-a"><span data-lang="en">Absolutely. We run online sessions for students anywhere in the world.</span><span data-lang="zh">当然可以。我们为世界各地的学生提供在线课程。</span></div></div>
          <div className="faq-item"><div className="faq-q"><span data-lang="en">Will the tutor teach in my language?</span><span data-lang="zh">导师会用中文教课吗？</span></div><div className="faq-a"><span data-lang="en">Sessions are in English to build language skills, but your tutor can explain anything in your first language when needed.</span><span data-lang="zh">课程主要以英语进行，但导师可以随时用中文解释。</span></div></div>
          <div className="faq-item"><div className="faq-q"><span data-lang="en">What subjects do you cover?</span><span data-lang="zh">你们覆盖哪些科目？</span></div><div className="faq-a"><span data-lang="en">All core subjects from Prep to University, including Mathematics, English, Science, and Humanities.</span><span data-lang="zh">从学前班到大学的所有核心科目。</span></div></div>
          <div className="faq-item"><div className="faq-q"><span data-lang="en">What if I'm not happy with the tutor?</span><span data-lang="zh">如果我对导师不满意怎么办？</span></div><div className="faq-a"><span data-lang="en">We'll rematch you with a different tutor at no extra cost.</span><span data-lang="zh">我们会免费为你重新匹配。</span></div></div>
        </div>
      </section>

      <section className="cta-bottom">
        <h2><span data-lang="en">Ready to find the right tutor?</span><span data-lang="zh">准备好找到合适的导师了吗？</span></h2>
        <p><span data-lang="en">Fill in the form and we'll match you within 24 hours. No obligation, no sign-up fees.</span><span data-lang="zh">填写表格，我们将在24小时内为你匹配。无需承诺。</span></p>
        <div style={{display:"flex",gap:"1.5rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1.5rem"}}><a href="tel:0426787978" style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"var(--text-muted)",fontSize:"0.95rem",textDecoration:"none"}}><span>📱</span>0426 787 978</a><a href="mailto:admin@baysideacademics.com.au" style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"var(--text-muted)",fontSize:"0.95rem",textDecoration:"none"}}><span>📧</span>admin@baysideacademics.com.au</a></div>
        <a href="#find-tutor" className="btn-primary"><span data-lang="en">Find a Tutor</span><span data-lang="zh">找导师</span></a>
      </section>

      <footer className="bl-footer">
        <div className="footer-inner">
          <div><div className="footer-brand">Bayside Academics</div><p className="footer-brand-desc">Premium 1-on-1 tutoring for students from Prep to University. Curriculum-aligned support across all subjects.</p></div>
          <div className="footer-col"><h4>Quick Links</h4><a href="https://baysideacademics.com.au">Home</a><a href="https://baysideacademics.com.au/premier-plus">Premier+</a><a href="/bilingualtutoring">Bilingual Tutoring</a></div>
          <div className="footer-col"><h4>Subjects</h4><a href="#">Mathematics</a><a href="#">English</a><a href="#">Sciences</a><a href="#">Humanities</a></div>
          <div className="footer-col"><h4>Contact</h4><a href="#">5/240 Bay St, Brighton VIC 3186</a><a href="mailto:admin@baysideacademics.com.au">admin@baysideacademics.com.au</a><a href="tel:0426787978">0426 787 978</a></div>
        </div>
        <div className="footer-bottom">&copy; 2026 Bayside Academics. ABN: 29 701 561 362</div>
      </footer>
    </>
  );
}
