"use client";
import { useState, useEffect, useRef } from "react";
const c={cyan:"#00C2E0",cyanLight:"#33D4F0",cyanDark:"#00A3BF",cyanPale:"#E8F9FC",pink:"#FF1E59",dark:"#0E1726",darkMid:"#2D2D44",darkLight:"#3D3D55",text:"#2C2C3A",textLight:"#6B7280",textMuted:"#9CA3AF",white:"#FFFFFF",offWhite:"#F7F8FA",border:"#E5E7EB",success:"#10B981",gold:"#C9A84C"};
function useInView(){const ref=useRef(null);const[inView,setInView]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setInView(true);obs.disconnect();}},{threshold:0.15});obs.observe(el);return()=>obs.disconnect();},[]);return[ref,inView];}
function F({children,delay=0,style={}}){const[ref,inView]=useInView();return(<div ref={ref} style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(28px)",transition:`opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,...style}}>{children}</div>);}

const TUTOR_IMG="/tutors.png";

export default function App({initialPage="home"}){
const[page,setPage]=useState(initialPage);
const[mobileMenu,setMobileMenu]=useState(false);
const[scrolled,setScrolled]=useState(false);
const[showEnrol,setShowEnrol]=useState(false);
const[enrolForm,setEnrolForm]=useState({name:"",email:"",phone:"",childName:"",yearLevel:"",message:""});
const[enrolSent,setEnrolSent]=useState(false);
useEffect(()=>{const h=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
const nav=(p)=>{setPage(p);setMobileMenu(false);window.scrollTo(0,0);};
const[cf,setCf]=useState({name:"",email:"",phone:"",message:"",subject:"General Enquiry"});
const[sent,setSent]=useState(false);
const sendEmail=async(formData,type)=>{
  try{const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...formData,type})});const d=await r.json();if(!r.ok)throw new Error(d.error);
    if(typeof window!=="undefined"&&typeof window.gtag==="function"){window.gtag("event","conversion",{send_to:"AW-777828845/DcpxCMie-doBEO3z8vIC"});}
    return true;}
  catch(err){console.error("Email error:",err);window.open(`mailto:admin@baysideacademics.com.au?subject=${encodeURIComponent(type==="enrol"?"Enrolment Enquiry":"Website Enquiry")}&body=${encodeURIComponent(Object.entries(formData).map(([k,v])=>v?`${k}: ${v}`:"").filter(Boolean).join("\n"))}`);return true;}
};

return(<div style={{fontFamily:"'Montserrat','Helvetica Neue',sans-serif",color:c.text,background:c.white,minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:${c.white};-webkit-font-smoothing:antialiased;overflow-x:hidden}::selection{background:${c.cyanPale};color:${c.dark}}a{text-decoration:none;color:inherit}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.mob-btn{display:none}
@media(max-width:768px){
.hide-sm{display:none!important}
section.shero h1{font-size:36px!important}
section.sp h2,section.sp2 h2{font-size:32px!important}
section.shero img{height:280px!important}
.mob-btn{display:flex!important}
.desk-nav{display:none!important}
div.g1{grid-template-columns:1fr!important;gap:30px!important}
div.g2{grid-template-columns:1fr 1fr!important;gap:10px!important}
div.g3{grid-template-columns:1fr 1fr 1fr!important;gap:6px!important}
div.gf{grid-template-columns:1fr 1fr!important;gap:20px!important}
section.shero{min-height:auto!important;padding:100px 20px 50px!important}
section.sp{padding:60px 20px!important}
section.sp2{padding:50px 20px!important}
section.sp3{padding:40px 20px!important}
section.sph{padding:110px 20px 50px!important}
footer.fpad{padding:40px 20px 30px!important}
nav{padding:0 16px!important}
h1{font-size:30px!important;line-height:1.2!important}
h2{font-size:24px!important}
h3{font-size:20px!important}
}`}</style>

{/* ENROL POPUP */}
{showEnrol&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={(e)=>{if(e.target===e.currentTarget){setShowEnrol(false);setEnrolSent(false)}}}>
<div style={{background:c.white,borderRadius:20,maxWidth:520,width:"100%",maxHeight:"90vh",overflow:"auto",animation:"fadeIn 0.3s ease"}}>
<div style={{background:`linear-gradient(135deg,${c.dark},${c.darkMid})`,padding:"28px 32px",borderRadius:"20px 20px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><h3 style={{fontSize:20,fontWeight:800,color:c.white}}>Get Started with Bayside Academics</h3><p style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:4}}>We'll be in touch within 24 hours</p></div>
<button onClick={()=>{setShowEnrol(false);setEnrolSent(false)}} style={{background:"rgba(255,255,255,0.1)",border:"none",color:c.white,width:32,height:32,borderRadius:8,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
</div>
<div style={{padding:"28px 32px"}}>
{enrolSent?<div style={{textAlign:"center",padding:"20px 0"}}><p style={{fontSize:36,marginBottom:12}}>✓</p><h3 style={{fontSize:20,fontWeight:800,color:c.success,marginBottom:8}}>Enquiry Sent!</h3><p style={{fontSize:14,color:c.textLight}}>We'll get back to you within 24 hours.</p><button onClick={()=>{setShowEnrol(false);setEnrolSent(false);setEnrolForm({name:"",email:"",phone:"",childName:"",yearLevel:"",message:""})}} style={{marginTop:20,padding:"10px 24px",borderRadius:8,border:`1px solid ${c.border}`,background:c.white,fontSize:13,fontWeight:600,cursor:"pointer"}}>Close</button></div>
:<><div style={{display:"grid",gap:10}}>
{[{k:"name",p:"Your name",t:"text"},{k:"email",p:"Email address",t:"email"},{k:"phone",p:"Phone number",t:"tel"},{k:"childName",p:"Child's name",t:"text"},{k:"yearLevel",p:"Child's year level (e.g. Year 8)",t:"text"}].map(f=><input key={f.k} type={f.t} placeholder={f.p} value={enrolForm[f.k]} onChange={e=>setEnrolForm(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:`2px solid ${c.border}`,fontSize:14,outline:"none",fontFamily:"'Lato',sans-serif"}} onFocus={e=>e.target.style.borderColor=c.cyan} onBlur={e=>e.target.style.borderColor=c.border}/>)}
<textarea placeholder="Tell us about your child's needs (optional)" value={enrolForm.message} onChange={e=>setEnrolForm(p=>({...p,message:e.target.value}))} rows={3} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:`2px solid ${c.border}`,fontSize:14,outline:"none",fontFamily:"'Lato',sans-serif",resize:"vertical"}} onFocus={e=>e.target.style.borderColor=c.cyan} onBlur={e=>e.target.style.borderColor=c.border}/>
<button onClick={()=>{sendEmail(enrolForm,"enrol");setEnrolSent(true)}} disabled={!enrolForm.name||!enrolForm.email} style={{width:"100%",padding:"13px",borderRadius:8,border:"none",fontSize:14,fontWeight:700,cursor:enrolForm.name&&enrolForm.email?"pointer":"not-allowed",textTransform:"uppercase",letterSpacing:.5,background:enrolForm.name&&enrolForm.email?`linear-gradient(135deg,${c.cyan},${c.cyanLight})`:c.border,color:enrolForm.name&&enrolForm.email?c.white:c.textMuted}}>Send Enquiry</button>
</div>
<div style={{marginTop:20,paddingTop:16,borderTop:`1px solid ${c.border}`,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
<div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18}}>📱</span><div><p style={{fontWeight:700,fontSize:12}}>Phone</p><p style={{fontSize:13,color:c.textLight}}>0426 787 978</p></div></div>
<div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18}}>📧</span><div><p style={{fontWeight:700,fontSize:12}}>Email</p><p style={{fontSize:12,color:c.textLight}}>admin@baysideacademics.com.au</p></div></div>
</div></>}
</div></div></div>}

{/* NAV */}
<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?"rgba(255,255,255,0.97)":"transparent",backdropFilter:scrolled?"blur(12px)":"none",borderBottom:scrolled?`1px solid ${c.border}`:"none",boxShadow:scrolled?"0 2px 20px rgba(0,0,0,0.06)":"none",transition:"all .4s",padding:"0 20px"}}><div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",height:72}}>
<div onClick={()=>nav("home")} style={{cursor:"pointer"}}>
<img src="/logo.png" alt="Bayside Academics" style={{height:56,display:"block"}}/>
</div>
<div className="desk-nav" style={{display:"flex",gap:6,alignItems:"center"}}>{[{l:"Home",id:"home"},{l:"About",id:"about"},{l:"Services",id:"services"},{l:"Contact",id:"contact"}].map(i=><button key={i.id} onClick={()=>nav(i.id)} style={{padding:"8px 14px",borderRadius:6,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",transition:"all .2s",letterSpacing:.2,fontFamily:"'Lato',sans-serif",background:page===i.id?(scrolled?c.cyanPale:"rgba(255,255,255,0.15)"):"transparent",color:page===i.id?c.cyan:(scrolled?c.text:"rgba(255,255,255,0.8)")}}>{i.l}</button>)}<a href="/free-maths-resources" style={{padding:"8px 14px",borderRadius:6,fontSize:14,fontWeight:600,letterSpacing:.2,fontFamily:"'Lato',sans-serif",color:scrolled?c.text:"rgba(255,255,255,0.8)",textDecoration:"none"}}>Free Resources</a><button onClick={()=>setShowEnrol(true)} style={{padding:"10px 20px",borderRadius:6,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",background:c.cyan,color:"#0E1726",marginLeft:8,fontFamily:"'Lato',sans-serif"}}>Enrol now</button></div>
<button className="mob-btn" onClick={()=>setMobileMenu(!mobileMenu)} style={{display:"none",alignItems:"center",justifyContent:"center",background:"none",border:"none",cursor:"pointer",padding:8}}><div style={{width:22,height:16,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{width:22,height:2,background:scrolled?c.text:c.white,borderRadius:1}}/><div style={{width:22,height:2,background:scrolled?c.text:c.white,borderRadius:1}}/><div style={{width:22,height:2,background:scrolled?c.text:c.white,borderRadius:1}}/></div></button>
</div></nav>
{mobileMenu&&<div style={{position:"fixed",top:72,left:0,right:0,zIndex:999,background:c.white,display:"flex",flexDirection:"column",padding:"12px 16px",borderBottom:`1px solid ${c.border}`,boxShadow:"0 8px 30px rgba(0,0,0,0.1)",animation:"fadeIn 0.2s ease"}}>
{[{l:"Home",id:"home"},{l:"About",id:"about"},{l:"Services",id:"services"},{l:"Contact",id:"contact"}].map(i=><button key={i.id} onClick={()=>nav(i.id)} style={{padding:"12px 14px",borderRadius:8,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",textAlign:"left",textTransform:"uppercase",letterSpacing:.5,background:page===i.id?c.cyanPale:"transparent",color:page===i.id?c.cyan:c.text}}>{i.l}</button>)}
<a href="/free-maths-resources" style={{padding:"12px 14px",borderRadius:8,fontSize:14,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,color:c.text,textDecoration:"none"}}>Free Resources</a>
<button onClick={()=>{setShowEnrol(true);setMobileMenu(false)}} style={{padding:"12px 14px",borderRadius:8,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,color:c.white,textTransform:"uppercase",letterSpacing:.5,marginTop:4}}>Enrol Now</button>
</div>}

{page==="home"&&<HomePage nav={nav} openEnrol={()=>setShowEnrol(true)}/>}
{page==="about"&&<AboutPage nav={nav} openEnrol={()=>setShowEnrol(true)}/>}
{page==="services"&&<ServicesPage nav={nav} openEnrol={()=>setShowEnrol(true)}/>}
{page==="contact"&&<ContactPage form={cf} setForm={setCf} sent={sent} setSent={setSent} sendEmail={sendEmail}/>}
{page==="premier"&&<PremierPage nav={nav} openEnrol={()=>setShowEnrol(true)}/>}

{/* FOOTER */}
<footer className="fpad" style={{background:c.dark,padding:"60px 40px 40px"}}><div style={{maxWidth:1200,margin:"0 auto"}}><div className="gf" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:40}}><div><p style={{fontSize:14,fontWeight:700,color:c.white,textTransform:"uppercase",letterSpacing:1,marginBottom:16}}>Bayside Academics</p><p style={{color:"rgba(255,255,255,0.4)",fontSize:13,lineHeight:1.7,maxWidth:300}}>Premium 1-on-1 tutoring for students from Prep to Year 12. VCAA-aligned curriculum support across all subjects.</p></div><div><h4 style={{color:c.cyan,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:16}}>Quick Links</h4>{["Home","About","Services","Contact"].map(l=><p key={l} onClick={()=>nav(l.toLowerCase())} style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:10,cursor:"pointer"}}>{l}</p>)}<a href="/bilingualtutoring" style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:10,display:"block",textDecoration:"none"}}>Bilingual Tutoring</a><a href="/free-maths-resources" style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:10,display:"block",textDecoration:"none"}}>Free Maths Resources</a></div><div><h4 style={{color:c.cyan,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:16}}>Subjects</h4>{["Mathematics","English","Sciences","Humanities","VCE"].map(s=><p key={s} style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:10}}>{s}</p>)}</div><div><h4 style={{color:c.cyan,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:16}}>Contact</h4><p style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:10}}>5/240 Bay St, Brighton VIC 3186</p><p style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:10}}>admin@baysideacademics.com.au</p><p style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>0426 787 978</p></div></div><div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:24,display:"flex",justifyContent:"space-between"}}><p style={{color:"rgba(255,255,255,0.25)",fontSize:12}}>© 2026 Bayside Academics. ABN: 29 701 561 362</p><p style={{color:"rgba(255,255,255,0.25)",fontSize:12}}>Powered by Premier+</p></div></div></footer>
</div>);}

const ink="#0E1726",paper="#FAF8F4",line="#E7E2D9",gold="#C9A84C";
const serif="'Montserrat','Helvetica Neue',sans-serif";
const sans="'Lato','Helvetica Neue',sans-serif";
function Icon({n,size=22,color="currentColor"}){const p={fill:"none",stroke:color,strokeWidth:1.6,strokeLinecap:"round",strokeLinejoin:"round"};const paths={
target:<><circle cx="12" cy="12" r="9" {...p}/><circle cx="12" cy="12" r="5" {...p}/><circle cx="12" cy="12" r="1.2" {...p}/></>,
users:<><circle cx="9" cy="8" r="3.5" {...p}/><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5" {...p}/><path d="M16 4.6a3.4 3.4 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.4 3.5 5.2" {...p}/></>,
award:<><circle cx="12" cy="9" r="6" {...p}/><path d="M8.5 13.9 7 22l5-2.6 5 2.6-1.5-8.1" {...p}/></>,
book:<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" {...p}/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20" {...p}/></>,
person:<><circle cx="12" cy="8" r="4" {...p}/><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" {...p}/></>,
check:<path d="M5 12.5l4.5 4.5L19 7.5" {...p}/>,
phone:<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" {...p}/>,
mail:<><rect x="3" y="5" width="18" height="14" rx="2" {...p}/><path d="M3.5 6.5 12 13l8.5-6.5" {...p}/></>,
arrow:<path d="M5 12h14M13 6l6 6-6 6" {...p}/>,
};return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{paths[n]}</svg>;}
function Stars({size=14}){return <span style={{display:"inline-flex",gap:2,color:gold,fontSize:size,letterSpacing:1}}>★★★★★</span>;}
function Eyebrow({children,light}){return <p style={{fontFamily:sans,fontSize:12,fontWeight:700,letterSpacing:2.2,textTransform:"uppercase",color:light?"rgba(255,255,255,0.55)":c.cyanDark,marginBottom:14}}>{children}</p>;}
const btnPrimary={padding:"15px 28px",borderRadius:6,border:"none",fontSize:15,fontWeight:700,cursor:"pointer",background:c.cyan,color:ink,fontFamily:sans,letterSpacing:.2};
const btnGhost={padding:"14px 26px",borderRadius:6,border:"1px solid rgba(255,255,255,0.28)",fontSize:15,fontWeight:600,cursor:"pointer",background:"transparent",color:c.white,fontFamily:sans,display:"inline-flex",alignItems:"center",gap:8,textDecoration:"none"};

function HomePage({nav,openEnrol}){
const reviews=[
{q:"Highly recommend Bayside Academics to anyone looking for exceptional and knowledgeable tutors.",p:"AJ",src:"Google review"},
{q:"Our son has become more confident and looks forward to his session with Bayside Academics each week.",p:"Paul",src:"Google review"},
{q:"Bayside Academics truly have the best tutors available! They are a fantastic service and I would advocate for all to try.",p:"Chris",src:"Google review"},
{q:"The session reports are incredible - I actually know what my son is learning and where he needs help. No other tutor has given us this level of detail.",p:"James",src:"Year 10, Brighton Grammar"},
{q:"My daughter's confidence in maths has completely turned around. She went from dreading it to actually asking to do extra practice.",p:"Sarah",src:"Year 8, Firbank Grammar"},
{q:"The fact that the tutor knows exactly what's coming up at school - tests, SACs, everything - means the sessions are always relevant.",p:"Michelle",src:"Year 11, Haileybury"},
];
return(<div style={{background:paper}}>
{/* HERO */}
<section className="shero" style={{background:`radial-gradient(1200px 600px at 85% 20%,rgba(0,194,224,0.10),transparent 60%),${ink}`,padding:"150px 40px 90px",position:"relative",overflow:"hidden"}}>
<div className="g1" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1.05fr 0.95fr",gap:64,alignItems:"center"}}>
<div>
<Eyebrow light>1-on-1 tutoring · Brighton &amp; online</Eyebrow>
<h1 style={{fontFamily:serif,fontSize:52,color:c.white,lineHeight:1.12,marginBottom:22,fontWeight:800,letterSpacing:-1}}>Expert tutoring that helps every student <span style={{color:c.cyan}}>reach their potential</span></h1>
<p style={{fontSize:18,color:"rgba(255,255,255,0.68)",lineHeight:1.7,marginBottom:34,maxWidth:520,fontFamily:sans}}>Face-to-face in Brighton and online, from Prep to VCE. Our tutors know the Victorian Curriculum, and they get to know your child.</p>
<div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:40}}><button onClick={openEnrol} style={btnPrimary}>Book a session</button><a href="tel:0426787978" style={btnGhost}><Icon n="phone" size={17}/> 0426 787 978</a></div>
<div style={{display:"flex",gap:28,flexWrap:"wrap",alignItems:"center",borderTop:"1px solid rgba(255,255,255,0.12)",paddingTop:22}}>
<div><Stars size={15}/><p style={{color:c.white,fontSize:14,fontFamily:sans,marginTop:4}}><b>5.0</b> <span style={{color:"rgba(255,255,255,0.55)"}}>Google rating</span></p></div>
<div style={{width:1,height:34,background:"rgba(255,255,255,0.15)"}} className="hide-sm"/>
<div><p style={{color:c.white,fontFamily:serif,fontSize:24,fontWeight:800,lineHeight:1}}>10 years</p><p style={{color:"rgba(255,255,255,0.55)",fontSize:13,fontFamily:sans,marginTop:4}}>established</p></div>
<div style={{width:1,height:34,background:"rgba(255,255,255,0.15)"}} className="hide-sm"/>
<div><p style={{color:c.white,fontFamily:serif,fontSize:24,fontWeight:800,lineHeight:1}}>2,000+</p><p style={{color:"rgba(255,255,255,0.55)",fontSize:13,fontFamily:sans,marginTop:4}}>satisfied students</p></div>
</div>
</div>
<div style={{position:"relative"}}>
<div style={{borderRadius:18,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.45)"}}><img src="/hero-photo.jpg" alt="A Bayside Academics tutor with a student" style={{width:"100%",display:"block",height:420,objectFit:"cover",objectPosition:"center top"}}/></div>
<div className="hide-sm" style={{position:"absolute",left:-28,bottom:-26,background:c.white,borderRadius:12,padding:"16px 18px",boxShadow:"0 18px 50px rgba(0,0,0,0.25)",display:"flex",gap:12,alignItems:"center",maxWidth:300}}>
<div style={{width:40,height:40,borderRadius:10,background:c.cyanPale,color:c.cyanDark,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon n="book" size={20}/></div>
<div><p style={{fontSize:13,fontWeight:700,color:ink,fontFamily:sans}}>A session report after every lesson</p><p style={{fontSize:12,color:c.textLight,fontFamily:sans}}>With Premier+</p></div></div>
</div>
</div></section>

{/* WHY */}
<section className="sp" style={{padding:"110px 40px",background:paper}}><div style={{maxWidth:1200,margin:"0 auto"}}>
<F><div className="g1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"end",marginBottom:56}}><div><Eyebrow>Why Bayside Academics</Eyebrow><h2 style={{fontFamily:serif,fontSize:36,fontWeight:800,color:ink,lineHeight:1.12,letterSpacing:-.5}}>A tutor who knows your child, and your child's curriculum.</h2></div><p style={{fontSize:16,color:c.textLight,lineHeight:1.8,fontFamily:sans}}>We pride ourselves on delivering the best available educational support at an affordable price, with no lock-in contracts.</p></div></F>
<div className="g1" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:40}}>{[
{icon:"target",title:"Tailored approach",desc:"Not everyone learns the same way. That's why we create unique learning pathways and strategies for each individual student."},
{icon:"users",title:"Every subject covered",desc:"We're fortunate to have a diverse and talented team of tutors. Whatever subject your child needs help with, we've got it covered."},
{icon:"award",title:"Top tutors",desc:"Our tutors are past high-achieving students who also know how to make lessons worthwhile and engaging."}
].map((item,i)=><F key={i} delay={i*.1}><div style={{borderTop:`1px solid ${line}`,paddingTop:28}}><div style={{color:c.cyanDark,marginBottom:18}}><Icon n={item.icon} size={30}/></div><h3 style={{fontFamily:serif,fontSize:20,fontWeight:700,color:ink,marginBottom:10}}>{item.title}</h3><p style={{fontSize:15,color:c.textLight,lineHeight:1.75,fontFamily:sans}}>{item.desc}</p></div></F>)}</div>
<F><div className="g1" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginTop:56}}>{[{icon:"book",label:"Prep to Year 12",desc:"All subjects, including VCE"},{icon:"target",label:"VCAA aligned",desc:"Victorian Curriculum"},{icon:"person",label:"1-on-1 sessions",desc:"Face-to-face or online"}].map((f,i)=><div key={i} style={{background:c.white,border:`1px solid ${line}`,borderRadius:12,padding:"18px 20px",display:"flex",gap:14,alignItems:"center"}}><span style={{color:c.cyanDark}}><Icon n={f.icon}/></span><div><p style={{fontSize:15,fontWeight:700,color:ink,fontFamily:sans}}>{f.label}</p><p style={{fontSize:13,color:c.textLight,fontFamily:sans}}>{f.desc}</p></div></div>)}</div></F>
</div></section>

{/* PREMIER+ */}
<section className="sp" style={{padding:"110px 40px",background:c.white,borderTop:`1px solid ${line}`,borderBottom:`1px solid ${line}`}}><div className="g1" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}><F>
<Eyebrow><span style={{color:gold}}>Premier+</span></Eyebrow>
<h2 style={{fontFamily:serif,fontSize:36,fontWeight:800,color:ink,marginBottom:18,lineHeight:1.12,letterSpacing:-.5}}>More than tutoring: a complete learning system</h2>
<p style={{fontSize:16,color:c.textLight,lineHeight:1.8,marginBottom:28,fontFamily:sans}}>Premier+ combines expert 1-on-1 tutoring with customised reporting, real-time progress tracking, and curriculum-aligned session summaries prepared by your tutor.</p>
<div style={{display:"grid",gap:13}}>{["Detailed session reports prepared after every lesson","VCAA curriculum-aligned progress tracking","Subtopic-level confidence ratings","Practice questions tailored to each topic","Parent dashboard with full visibility","Assessment awareness: your tutor knows what tests are coming"].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12}}><span style={{color:c.cyanDark,display:"flex"}}><Icon n="check" size={18}/></span><span style={{fontSize:15,color:c.text,fontFamily:sans}}>{f}</span></div>)}</div>
<button onClick={()=>nav("premier")} style={{marginTop:32,padding:"14px 24px",borderRadius:6,border:`1px solid ${ink}`,fontSize:15,fontWeight:700,cursor:"pointer",background:"transparent",color:ink,fontFamily:sans,display:"inline-flex",alignItems:"center",gap:8}}>Explore Premier+ <Icon n="arrow" size={16}/></button>
</F><F delay={.15}><div style={{display:"grid",gap:16}}>
<div style={{background:ink,borderRadius:16,padding:24,boxShadow:"0 24px 60px rgba(14,23,38,0.18)"}}><div style={{background:"rgba(255,255,255,0.05)",borderRadius:10,padding:"16px 20px",marginBottom:12}}><p style={{color:"rgba(255,255,255,0.45)",fontSize:11,textTransform:"uppercase",letterSpacing:1.5,marginBottom:4,fontFamily:sans}}>Overall confidence</p><p style={{fontSize:34,color:c.white,fontFamily:serif,fontWeight:800}}>4.2<span style={{color:"rgba(255,255,255,0.4)",fontSize:22}}>/5</span></p></div>{["Quadratic Equations","Trigonometry","Linear Graphs"].map((t,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<2?"1px solid rgba(255,255,255,0.07)":"none"}}><span style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontFamily:sans}}>{t}</span><div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(v=><div key={v} style={{width:8,height:8,borderRadius:2,background:v<=(5-i)?c.cyan:"rgba(255,255,255,0.1)"}}/>)}</div></div>)}</div>
<div style={{background:ink,borderRadius:16,padding:24,boxShadow:"0 24px 60px rgba(14,23,38,0.18)"}}>
<p style={{color:c.white,fontSize:15,fontWeight:700,marginBottom:4,fontFamily:sans}}>Julian's assessment results</p>
<p style={{color:"rgba(255,255,255,0.4)",fontSize:11,textTransform:"uppercase",letterSpacing:1.5,marginBottom:20,fontFamily:sans}}>Mathematics</p>
<div style={{display:"flex",alignItems:"flex-end",gap:14,height:150,paddingLeft:4}}>
{[{term:"Term 1",score:62},{term:"Term 2",score:71},{term:"Term 3",score:79},{term:"Term 4",score:88}].map((d,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
<span style={{fontSize:12,color:c.white,fontWeight:700,fontFamily:sans}}>{d.score}%</span>
<div style={{width:"100%",maxWidth:52,borderRadius:"6px 6px 0 0",background:i===3?c.cyan:"rgba(0,194,224,0.45)",height:`${(d.score/100)*110}px`}}/>
<span style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontFamily:sans}}>{d.term}</span>
</div>)}
</div>
<p style={{fontSize:12,color:"#5EE0B5",fontWeight:700,marginTop:14,fontFamily:sans}}>+26 points over the year</p>
</div>
</div></F></div></section>

{/* REVIEWS */}
<section className="sp" style={{padding:"110px 40px",background:paper}}><div style={{maxWidth:1200,margin:"0 auto"}}>
<F><div style={{textAlign:"center",marginBottom:52}}><Eyebrow>What parents say</Eyebrow><h2 style={{fontFamily:serif,fontSize:36,fontWeight:800,color:ink,lineHeight:1.12,letterSpacing:-.5,marginBottom:14}}>Trusted by Bayside families for 10 years</h2><p style={{fontFamily:sans,fontSize:15,color:c.textLight}}><Stars/> <b style={{color:ink}}>5.0</b> on Google</p></div></F>
<div className="g1" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>{reviews.map((t,i)=><F key={i} delay={(i%3)*.08}><figure style={{background:c.white,borderRadius:14,padding:"30px 28px",border:`1px solid ${line}`,height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div><Stars/><blockquote style={{fontFamily:sans,fontSize:16,color:c.text,lineHeight:1.7,marginTop:14,fontStyle:"italic"}}>"{t.q}"</blockquote></div><figcaption style={{marginTop:22,fontFamily:sans}}><p style={{fontWeight:700,fontSize:14,color:ink}}>{t.p}</p><p style={{fontSize:12,color:c.textMuted}}>{t.src}</p></figcaption></figure></F>)}</div>
</div></section>

{/* FREE RESOURCES */}
<section className="sp3" style={{padding:"0 40px 110px",background:paper}}><F><div className="g1" style={{maxWidth:1200,margin:"0 auto",background:c.white,border:`1px solid ${line}`,borderRadius:16,padding:"36px 40px",display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"center"}}><div><Eyebrow>Free for every family</Eyebrow><h3 style={{fontFamily:serif,fontSize:24,fontWeight:800,color:ink,marginBottom:8}}>Free maths resources for Years 7 to 10</h3><p style={{fontFamily:sans,fontSize:15,color:c.textLight,lineHeight:1.7}}>Worksheets, practice exams, study planners and formula sheets, made by our tutors.</p></div><a href="/free-maths-resources" style={{...btnPrimary,display:"inline-flex",alignItems:"center",gap:8,textDecoration:"none",whiteSpace:"nowrap"}}>See the resources <Icon n="arrow" size={16}/></a></div></F></section>

{/* CTA */}
<section className="sp2" style={{padding:"100px 40px",background:ink,textAlign:"center"}}><F><h2 style={{fontFamily:serif,fontSize:38,fontWeight:800,color:c.white,marginBottom:14,letterSpacing:-.5}}>Ready to see the difference?</h2><p style={{fontSize:17,color:"rgba(255,255,255,0.6)",maxWidth:520,margin:"0 auto 28px",fontFamily:sans}}>Get in touch or enrol your child today. No lock-in contracts.</p><div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:26}}><button onClick={openEnrol} style={btnPrimary}>Enrol now</button><button onClick={()=>nav("contact")} style={btnGhost}>Get in touch</button></div><div style={{display:"flex",gap:26,justifyContent:"center",flexWrap:"wrap",fontFamily:sans}}><a href="tel:0426787978" style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,0.75)",fontSize:15,textDecoration:"none"}}><Icon n="phone" size={17}/>0426 787 978</a><a href="mailto:admin@baysideacademics.com.au" style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,0.75)",fontSize:15,textDecoration:"none"}}><Icon n="mail" size={17}/>admin@baysideacademics.com.au</a></div></F></section>
</div>);}

function AboutPage({nav,openEnrol}){return(<div>
<section className="sph" style={{padding:"140px 40px 80px",background:`linear-gradient(135deg,${c.dark},${c.darkMid})`}}><div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}><h1 style={{fontSize:42,fontWeight:800,color:c.white,marginBottom:16}}>Dedicated to helping students <span style={{color:c.cyan}}>succeed</span></h1><p style={{fontSize:16,color:"rgba(255,255,255,0.55)",lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Bayside Academics is a tutoring centre based in Brighton, VIC. We believe every student deserves a tutor who genuinely cares about their success.</p></div></section>

<section className="sp2" style={{padding:"80px 40px",background:c.white}}><div style={{maxWidth:900,margin:"0 auto"}}><F><div className="g1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}><div><h2 style={{fontSize:28,fontWeight:800,marginBottom:16}}>Our Approach</h2><p style={{fontSize:15,color:c.textLight,lineHeight:1.8,marginBottom:16,fontFamily:"'Lato',sans-serif"}}>Based in Brighton, Victoria, Bayside Academics supports students from Prep to Year 12 across all subjects.</p><p style={{fontSize:15,color:c.textLight,lineHeight:1.8,marginBottom:16,fontFamily:"'Lato',sans-serif"}}>Every session is delivered one-on-one, allowing our tutors to focus entirely on the individual. We identify the exact concept a student doesn't fully understand, and we work through it methodically until it's fully grasped.</p><p style={{fontSize:15,color:c.textLight,lineHeight:1.8,fontFamily:"'Lato',sans-serif"}}>With our Premier+ program, every lesson is tracked through detailed tutor reports. Parents gain clear visibility into progress, confidence levels, and areas of improvement, while upcoming school assessments are seamlessly integrated into each student's learning plan.</p></div>
<div><h2 style={{fontSize:28,fontWeight:800,marginBottom:16}}>What We Believe</h2><div style={{display:"grid",gap:14}}>{[{t:"Parents deserve to know",d:"You shouldn't have to wonder what happened in a session."},{t:"Align with the school",d:"We work alongside your child's school curriculum, not in isolation."},{t:"No lock-in contracts",d:"We keep students because we deliver results, not because of a contract."}].map((b,i)=><div key={i} style={{background:c.offWhite,borderRadius:12,padding:"18px 22px",border:`1px solid ${c.border}`}}><h4 style={{fontSize:15,fontWeight:700,marginBottom:4}}>{b.t}</h4><p style={{fontSize:13,color:c.textLight,lineHeight:1.6,fontFamily:"'Lato',sans-serif"}}>{b.d}</p></div>)}</div></div></div></F>

<F delay={.15}><div style={{marginTop:60,background:`linear-gradient(135deg,${c.dark},${c.darkMid})`,borderRadius:20,padding:"48px 40px",textAlign:"center"}}>
<h3 style={{fontSize:24,fontWeight:800,color:c.white,marginBottom:10}}>Our Tutors</h3>
<p style={{fontSize:15,color:"rgba(255,255,255,0.55)",marginBottom:8,fontFamily:"'Lato',sans-serif"}}>A team of 20+ tutors · Average ATAR of 99.20</p>
<p style={{fontSize:15,color:"rgba(255,255,255,0.55)",marginBottom:24,fontFamily:"'Lato',sans-serif"}}>But above all, they know how to communicate.</p>
<div onClick={openEnrol} style={{cursor:"pointer",maxWidth:400,margin:"0 auto 24px",borderRadius:14,overflow:"hidden",border:"2px solid rgba(255,255,255,0.1)",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.cyan;e.currentTarget.style.transform="scale(1.02)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.transform="scale(1)"}}>
<img src={TUTOR_IMG} alt="Our tutoring team" style={{width:"100%",display:"block"}}/>
</div>
<button onClick={openEnrol} style={{padding:"13px 26px",borderRadius:8,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,color:c.white,textTransform:"uppercase",letterSpacing:.5}}>Enrol Now</button>
</div></F></div></section></div>);}

function ServicesPage({nav,openEnrol}){return(<div>
<section className="sph" style={{padding:"140px 40px 80px",background:`linear-gradient(135deg,${c.dark},${c.darkMid})`}}><div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}><h1 style={{fontSize:42,fontWeight:800,color:c.white,marginBottom:16}}>Two ways to learn <span style={{color:c.cyan}}>with us</span></h1><p style={{fontSize:16,color:"rgba(255,255,255,0.55)",lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Choose the program that suits your child. Both include expert 1-on-1 tutoring.</p></div></section>
<section className="sp2" style={{padding:"80px 40px",background:c.offWhite}}><div style={{maxWidth:1000,margin:"0 auto"}}><F><div className="g1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
<div style={{background:c.white,borderRadius:20,padding:"40px 32px",border:`1px solid ${c.border}`,boxShadow:"0 4px 24px rgba(0,0,0,0.04)"}}><p style={{color:c.textMuted,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>Standard</p><h3 style={{fontSize:26,fontWeight:800,marginBottom:8}}>1-on-1 Tutoring</h3><p style={{fontSize:14,color:c.textLight,lineHeight:1.7,marginBottom:24,fontFamily:"'Lato',sans-serif"}}>Expert tutoring tailored to your child's needs. All subjects, Prep through Year 12.</p><div style={{display:"grid",gap:10,marginBottom:28}}>{["Personalised 1-on-1 sessions","All subjects, Prep to Year 12","VCAA curriculum aligned","Flexible scheduling","No lock-in contracts"].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10}}><span style={{color:c.success,fontSize:13}}>✓</span><span style={{fontSize:13,color:c.textLight,fontFamily:"'Lato',sans-serif"}}>{f}</span></div>)}</div><button onClick={()=>nav("contact")} style={{width:"100%",padding:"13px",borderRadius:8,border:`2px solid ${c.border}`,background:c.white,color:c.text,fontSize:14,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:.5}}>Enquire About Rates</button></div>
<div style={{background:c.dark,borderRadius:20,padding:"40px 32px",border:`2px solid ${c.cyan}`,position:"relative",boxShadow:"0 8px 40px rgba(0,194,224,0.15)"}}><div style={{position:"absolute",top:-12,right:24,background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,borderRadius:20,padding:"4px 14px",fontSize:11,fontWeight:800,color:c.white,textTransform:"uppercase",letterSpacing:1}}>Recommended</div><p style={{color:c.cyan,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>Premier+</p><h3 style={{fontSize:26,fontWeight:800,color:c.white,marginBottom:8}}>The Complete Package</h3><p style={{fontSize:14,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:24,fontFamily:"'Lato',sans-serif"}}>Everything in Standard, plus customised session reports, real-time progress tracking, and a parent dashboard.</p><div style={{display:"grid",gap:10,marginBottom:28}}>{["Everything in Standard","Detailed session reports prepared by your tutor","VCAA-aligned confidence tracking by topic","Parent dashboard with live progress data","Practice questions tailored to each session","Assessment-aware lesson planning","Textbook-specific recommendations"].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10}}><span style={{color:c.cyan,fontSize:13}}>✓</span><span style={{fontSize:13,color:"rgba(255,255,255,0.6)",fontFamily:"'Lato',sans-serif"}}>{f}</span></div>)}</div><button onClick={openEnrol} style={{width:"100%",padding:"13px",borderRadius:8,border:"none",background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,color:c.white,fontSize:14,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:.5}}>Enrol in Premier+</button></div>
</div></F>
<F delay={.15}><div style={{marginTop:60}}><h2 style={{fontSize:28,fontWeight:800,textAlign:"center",marginBottom:8}}>Subjects We Cover</h2><div style={{width:40,height:3,background:c.cyan,margin:"0 auto 32px",borderRadius:2}}/>
<div className="g2" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>{[{icon:"📐",name:"Mathematics",levels:"Prep - Year 12"},{icon:"📖",name:"English",levels:"Prep - Year 12"},{icon:"🔬",name:"Sciences",levels:"Year 7 - VCE"},{icon:"🌏",name:"Humanities",levels:"Year 7 - VCE"},{icon:"📊",name:"VCE General Maths",levels:"Units 1-4"},{icon:"📈",name:"VCE Methods",levels:"Units 1-4"},{icon:"🧮",name:"VCE Specialist",levels:"Units 1-4"},{icon:"✍️",name:"VCE English",levels:"Units 1-4"}].map((s,i)=><div key={i} style={{background:c.white,borderRadius:12,padding:"20px 16px",border:`1px solid ${c.border}`,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.03)"}}><span style={{fontSize:26}}>{s.icon}</span><p style={{fontWeight:700,fontSize:13,marginTop:8}}>{s.name}</p><p style={{fontSize:11,color:c.textMuted,marginTop:2}}>{s.levels}</p></div>)}</div>
<div style={{marginTop:24,background:c.cyanPale,borderRadius:14,padding:"24px 28px",textAlign:"center",border:`1px solid ${c.cyan}30`}}><p style={{fontSize:15,fontWeight:700,marginBottom:6}}>Looking for another VCE subject?</p><p style={{fontSize:14,color:c.textLight,marginBottom:16,fontFamily:"'Lato',sans-serif"}}>We cover almost every VCE subject - get in touch and we'll match you with the right tutor.</p><button onClick={()=>nav("contact")} style={{padding:"12px 24px",borderRadius:8,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,color:c.white,textTransform:"uppercase",letterSpacing:.5}}>Enquire Now</button></div>
</div></F></div></section></div>);}

function ContactPage({form,setForm,sent,setSent,sendEmail}){const set=(f)=>(e)=>setForm(p=>({...p,[f]:e.target.value}));const is={width:"100%",padding:"13px 16px",borderRadius:8,border:`2px solid ${c.border}`,fontSize:14,outline:"none",fontFamily:"'Lato',sans-serif",color:c.text};return(<div>
<section className="sph" style={{padding:"140px 40px 80px",background:`linear-gradient(135deg,${c.dark},${c.darkMid})`}}><div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}><h1 style={{fontSize:42,fontWeight:800,color:c.white,marginBottom:16}}>Get in <span style={{color:c.cyan}}>touch</span></h1><p style={{fontSize:16,color:"rgba(255,255,255,0.55)",lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Have a question or ready to get started? We'd love to hear from you.</p></div></section>
<section className="sp2" style={{padding:"80px 40px",background:c.offWhite}}><div className="g1" style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
<F><div><h2 style={{fontSize:24,fontWeight:800,marginBottom:20}}>Send us a message</h2>{sent?<div style={{background:c.white,borderRadius:16,padding:"40px 32px",textAlign:"center"}}><p style={{fontSize:36,marginBottom:12}}>✓</p><h3 style={{fontSize:22,fontWeight:800,color:c.success,marginBottom:8}}>Message Sent</h3><p style={{fontSize:14,color:c.textLight}}>We'll get back to you within 24 hours.</p></div>:<div style={{display:"grid",gap:12}}><input type="text" placeholder="Your name" value={form.name} onChange={set("name")} style={is} onFocus={e=>e.target.style.borderColor=c.cyan} onBlur={e=>e.target.style.borderColor=c.border}/><input type="email" placeholder="Email address" value={form.email} onChange={set("email")} style={is} onFocus={e=>e.target.style.borderColor=c.cyan} onBlur={e=>e.target.style.borderColor=c.border}/><input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={set("phone")} style={is} onFocus={e=>e.target.style.borderColor=c.cyan} onBlur={e=>e.target.style.borderColor=c.border}/><select value={form.subject} onChange={set("subject")} style={{...is,cursor:"pointer"}}><option>General Enquiry</option><option>Enrolment Enquiry</option><option>Premier+ Information</option><option>Tutoring Application</option></select><textarea placeholder="Your message..." value={form.message} onChange={set("message")} rows={5} style={{...is,resize:"vertical",lineHeight:1.6}} onFocus={e=>e.target.style.borderColor=c.cyan} onBlur={e=>e.target.style.borderColor=c.border}/><button onClick={()=>{sendEmail(form,"contact");setSent(true)}} disabled={!form.name||!form.email||!form.message} style={{padding:"13px",borderRadius:8,border:"none",fontSize:14,fontWeight:700,cursor:form.name&&form.email&&form.message?"pointer":"not-allowed",textTransform:"uppercase",letterSpacing:.5,background:form.name&&form.email&&form.message?`linear-gradient(135deg,${c.cyan},${c.cyanLight})`:c.border,color:form.name&&form.email&&form.message?c.white:c.textMuted}}>Send Message</button></div>}</div></F>
<F delay={.12}><div><h2 style={{fontSize:24,fontWeight:800,marginBottom:20}}>Contact details</h2><div style={{display:"grid",gap:20}}>{[{icon:"📍",l:"Location",v:"5/240 Bay St, Brighton VIC 3186"},{icon:"📧",l:"Email",v:"admin@baysideacademics.com.au"},{icon:"📱",l:"Phone",v:"0426 787 978"},{icon:"🕐",l:"Hours",v:"Monday - Friday until 9pm\nSaturday & Sunday 9am - 5pm"}].map((item,i)=><div key={i} style={{display:"flex",gap:14}}><span style={{fontSize:22}}>{item.icon}</span><div><p style={{fontWeight:700,fontSize:13}}>{item.l}</p><p style={{fontSize:14,color:c.textLight,marginTop:2,fontFamily:"'Lato',sans-serif",whiteSpace:"pre-line"}}>{item.v}</p></div></div>)}</div>
<div style={{marginTop:24,borderRadius:14,overflow:"hidden",border:`1px solid ${c.border}`,maxWidth:320}}><img src="/contact-photo.jpg" alt="Tutoring at Bayside Academics" style={{width:"100%",display:"block",objectFit:"contain"}}/></div>
</div></F>
</div></section></div>);}

function PremierPage({nav,openEnrol}){
const steps=[
{num:"1",title:"Session Delivered",desc:"Your child has a 1-on-1 lesson with their dedicated tutor, tailored to their needs and school curriculum."},
{num:"2",title:"Tutor Writes Notes",desc:"Immediately after the session, the tutor records what was covered, how the student performed, and areas to focus on."},
{num:"3",title:"Report Generated",desc:"A detailed, structured lesson summary is generated and sent to you - covering topics, confidence ratings, and next steps."},
{num:"4",title:"Progress Tracked",desc:"Every session builds on the last. You can see your child's progress across topics over time through the parent dashboard."}
];
return(<div>
<section className="sph" style={{padding:"160px 40px 80px",background:`linear-gradient(135deg,${c.dark} 0%,${c.darkMid} 50%,${c.darkLight} 100%)`,position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:"15%",right:"8%",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,194,224,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
<div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
<div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${c.gold}20`,border:`1px solid ${c.gold}40`,borderRadius:20,padding:"6px 16px",marginBottom:20}}>
<span style={{fontSize:11,color:c.gold,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5}}>Premier+</span>
</div>
<h1 style={{fontSize:48,fontWeight:800,color:c.white,marginBottom:16,lineHeight:1.15}}>More than tutoring.<br/><span style={{color:c.cyan}}>A complete learning system.</span></h1>
<p style={{fontSize:17,color:"rgba(255,255,255,0.55)",lineHeight:1.8,maxWidth:600,margin:"0 auto 32px",fontFamily:"'Lato',sans-serif"}}>Premier+ combines expert 1-on-1 tutoring with detailed session reports, real-time progress tracking, and a parent dashboard - so you always know exactly where your child stands.</p>
<div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
<button onClick={openEnrol} style={{padding:"15px 30px",borderRadius:8,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,color:c.white,textTransform:"uppercase",letterSpacing:1}}>Get Started</button>
<button onClick={()=>nav("contact")} style={{padding:"15px 30px",borderRadius:8,border:"2px solid rgba(255,255,255,0.2)",fontSize:14,fontWeight:600,cursor:"pointer",background:"transparent",color:"rgba(255,255,255,0.8)",textTransform:"uppercase",letterSpacing:1}}>Ask a Question</button>
</div></div></section>

<section id="how-it-works" className="sp" style={{padding:"100px 40px",background:c.offWhite}}>
<div style={{maxWidth:1000,margin:"0 auto"}}>
<F><h2 style={{fontSize:32,fontWeight:800,color:c.cyan,textAlign:"center",marginBottom:8}}>How Premier+ Works</h2>
<div style={{width:40,height:3,background:c.cyan,margin:"0 auto 16px",borderRadius:2}}/>
<p style={{fontSize:15,color:c.textLight,textAlign:"center",maxWidth:550,margin:"0 auto 48px",fontFamily:"'Lato',sans-serif",lineHeight:1.7}}>A structured process that keeps parents informed and students on track - after every single session.</p></F>
<div className="g1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
{steps.map((s,i)=><F key={i} delay={i*.1}><div style={{background:c.white,borderRadius:16,padding:"32px 28px",border:`1px solid ${c.border}`,boxShadow:"0 4px 24px rgba(0,0,0,0.04)",height:"100%"}}>
<div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
<div style={{width:40,height:40,borderRadius:10,background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:c.white,flexShrink:0}}>{s.num}</div>
<h3 style={{fontSize:18,fontWeight:700}}>{s.title}</h3>
</div>
<p style={{fontSize:14,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>{s.desc}</p>
</div></F>)}
</div></div></section>

<section id="whats-included" className="sp" style={{padding:"100px 40px",background:c.white}}>
<div style={{maxWidth:1100,margin:"0 auto"}}>
<F><h2 style={{fontSize:32,fontWeight:800,color:c.cyan,textAlign:"center",marginBottom:8}}>What's Included</h2>
<div style={{width:40,height:3,background:c.cyan,margin:"0 auto 48px",borderRadius:2}}/></F>
<div className="g1" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
{[
{icon:"📋",title:"Session Reports",desc:"After every lesson, you receive a detailed summary of what was covered, how your child performed, and what to focus on before the next session."},
{icon:"📊",title:"Progress Dashboard",desc:"Track your child's confidence across every topic and subtopic. See trends over time and know exactly where they're improving."},
{icon:"🎯",title:"VCAA Curriculum Aligned",desc:"Every session is mapped to the Victorian Curriculum. You'll see exactly which content descriptors your child has covered."},
{icon:"📝",title:"Assessment Awareness",desc:<>Upload your child's school assessment schedule, and your tutor will plan sessions around upcoming tests, SACs, and exams. For extra revision at home, students can also make a free <a href="https://www.tuterly.com.au/exam-generator" target="_blank" rel="noopener" style={{color:c.cyanDark,textDecoration:"underline"}}>maths practice exam</a> on the topics their test covers.</>},
{icon:"📚",title:"Textbook Integration",desc:"We reference your child's actual school textbooks in our reports and recommendations - no generic resources."},
{icon:"🔄",title:"Practice Questions",desc:"Each report includes tailored practice questions at the right difficulty level, directly linked to what was covered in the session."}
].map((f,i)=><F key={i} delay={i*.08}><div style={{background:c.offWhite,borderRadius:14,padding:"28px 24px",border:`1px solid ${c.border}`,height:"100%"}}>
<span style={{fontSize:28}}>{f.icon}</span>
<h3 style={{fontSize:16,fontWeight:700,marginTop:12,marginBottom:8}}>{f.title}</h3>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>{f.desc}</p>
</div></F>)}
</div></div></section>

<section id="sample-report" className="sp" style={{padding:"100px 40px",background:c.offWhite}}>
<div style={{maxWidth:1000,margin:"0 auto"}}>
<F><h2 style={{fontSize:32,fontWeight:800,textAlign:"center",marginBottom:8}}>What a Session Report Looks Like</h2>
<div style={{width:40,height:3,background:c.cyan,margin:"0 auto 16px",borderRadius:2}}/>
<p style={{fontSize:15,color:c.textLight,textAlign:"center",maxWidth:550,margin:"0 auto 40px",fontFamily:"'Lato',sans-serif",lineHeight:1.7}}>Here's an example of what you'll receive after each lesson.</p></F>
<F delay={.15}><div style={{maxWidth:700,margin:"0 auto",background:c.white,borderRadius:20,border:`1px solid ${c.border}`,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,0.06)"}}>
<div style={{background:c.dark,padding:"24px 28px"}}><p style={{color:c.cyan,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>Premier+ Lesson Summary</p><p style={{color:"rgba(255,255,255,0.4)",fontSize:11,marginTop:4}}>by Bayside Academics</p></div>
<div style={{padding:"28px 28px"}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
<div><p style={{fontSize:11,color:c.textMuted,textTransform:"uppercase",letterSpacing:1}}>Student</p><p style={{fontSize:14,fontWeight:700}}>Julian M.</p></div>
<div><p style={{fontSize:11,color:c.textMuted,textTransform:"uppercase",letterSpacing:1}}>Year Level</p><p style={{fontSize:14,fontWeight:700}}>Year 10</p></div>
<div><p style={{fontSize:11,color:c.textMuted,textTransform:"uppercase",letterSpacing:1}}>Subject</p><p style={{fontSize:14,fontWeight:700}}>Mathematics</p></div>
<div><p style={{fontSize:11,color:c.textMuted,textTransform:"uppercase",letterSpacing:1}}>Tutor</p><p style={{fontSize:14,fontWeight:700}}>Ryan</p></div>
</div>

<div style={{borderTop:`1px solid ${c.border}`,paddingTop:16,marginBottom:16}}>
<h4 style={{fontSize:14,fontWeight:700,marginBottom:8,color:c.cyan}}>What We Covered Today</h4>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Today's session focused on factorising quadratic expressions. We started by reviewing how to expand brackets, then moved into factorising monic quadratics (where the leading coefficient is 1). We worked through several examples from Chapter 5 of the Cambridge Essential Maths 10 textbook, progressing from simple positive constant terms to expressions with negative constants. Julian also attempted two challenge problems involving factorising then solving quadratic equations.</p>
</div>

<div style={{borderTop:`1px solid ${c.border}`,paddingTop:16,marginBottom:16}}>
<h4 style={{fontSize:14,fontWeight:700,marginBottom:10,color:c.cyan}}>Topics & VCAA Curriculum Links</h4>
<div style={{display:"grid",gap:8}}>
{[{topic:"Expanding binomial products",vcaa:"Algebra - VCMNA332"},{topic:"Factorising monic quadratic trinomials",vcaa:"Algebra - VCMNA333"},{topic:"Solving quadratic equations by factorising",vcaa:"Algebra - VCMNA335"}].map((t,i)=>
<div key={i} style={{background:c.offWhite,borderRadius:8,padding:"10px 14px"}}>
<p style={{fontSize:13,fontWeight:600,color:c.text}}>{t.topic}</p>
<p style={{fontSize:11,color:c.textMuted,marginTop:2}}>VCAA: {t.vcaa}</p>
</div>)}
</div></div>

<div style={{borderTop:`1px solid ${c.border}`,paddingTop:16,marginBottom:16}}>
<h4 style={{fontSize:14,fontWeight:700,marginBottom:8,color:c.cyan}}>How Julian Went</h4>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Julian engaged well throughout the session and showed strong conceptual understanding of the factorising process. He was able to factorise standard monic quadratics (e.g. x² + 7x + 12) independently by the end of the session. He still needs practice with negative constant terms - specifically identifying factor pairs where one factor is negative (e.g. x² + 2x - 15). He attempted the challenge problems with guidance and was close to solving them independently.</p>
</div>

<div style={{borderTop:`1px solid ${c.border}`,paddingTop:16,marginBottom:16}}>
<h4 style={{fontSize:14,fontWeight:700,marginBottom:10,color:c.cyan}}>Topic Confidence</h4>
<div style={{display:"grid",gap:8}}>
{[{t:"Expanding brackets",r:5},{t:"Factorising monic quadratics (positive terms)",r:4},{t:"Factorising with negative constants",r:3},{t:"Solving quadratics by factorising",r:3}].map((item,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontSize:13,color:c.textLight}}>{item.t}</span>
<div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(v=><div key={v} style={{width:10,height:10,borderRadius:3,background:v<=item.r?c.cyan:`${c.cyan}20`}}/>)}</div>
</div>)}
</div></div>

<div style={{borderTop:`1px solid ${c.border}`,paddingTop:16,marginBottom:16}}>
<h4 style={{fontSize:14,fontWeight:700,marginBottom:8,color:c.cyan}}>Areas to Focus On Before Next Session</h4>
<div style={{display:"grid",gap:6}}>
{["Review factor pairs for numbers up to 50, especially with one negative factor","Practice factorising expressions with negative constant terms (e.g. x² + 2x - 15)","Attempt Exercise 5D Q1-10 in the Cambridge textbook","Review the connection between factorised form and solving for x = 0"].map((a,i)=>
<div key={i} style={{display:"flex",gap:8,alignItems:"start"}}>
<div style={{width:6,height:6,borderRadius:"50%",background:c.cyan,marginTop:6,flexShrink:0}}/>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.6,fontFamily:"'Lato',sans-serif"}}>{a}</p>
</div>)}
</div></div>

<div style={{borderTop:`1px solid ${c.border}`,paddingTop:16,marginBottom:16}}>
<h4 style={{fontSize:14,fontWeight:700,marginBottom:8,color:c.cyan}}>Recommended Resources</h4>
<div style={{display:"grid",gap:6}}>
{[{name:"Khan Academy - Factoring Quadratics",desc:"Interactive exercises with step-by-step hints"},{name:"Cambridge Essential Maths 10, Chapter 5D-5E",desc:"Textbook exercises aligned to today's content"},{name:"Mathspace - Quadratic Expressions module",desc:"Adaptive practice at Julian's level"}].map((r,i)=>
<div key={i} style={{background:c.offWhite,borderRadius:8,padding:"10px 14px"}}>
<p style={{fontSize:13,fontWeight:600,color:c.text}}>{r.name}</p>
<p style={{fontSize:11,color:c.textMuted,marginTop:2}}>{r.desc}</p>
</div>)}
</div></div>

<div style={{borderTop:`1px solid ${c.border}`,paddingTop:16}}>
<h4 style={{fontSize:14,fontWeight:700,marginBottom:12,color:c.cyan}}>Practice Questions</h4>
<div style={{display:"grid",gap:14}}>

<div style={{background:c.offWhite,borderRadius:10,padding:"14px 16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<p style={{fontSize:13,fontWeight:700}}>Question 1</p>
<span style={{fontSize:10,color:c.success,fontWeight:600,background:`${c.success}15`,padding:"2px 8px",borderRadius:10}}>Foundation</span>
</div>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.6,fontFamily:"'Lato',sans-serif"}}>Factorise: x² + 9x + 20</p>
<details style={{marginTop:8}}>
<summary style={{fontSize:12,color:c.cyan,cursor:"pointer",fontWeight:600}}>View Solution</summary>
<div style={{marginTop:8,padding:"10px 12px",background:c.white,borderRadius:6,border:`1px solid ${c.border}`}}>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Find two numbers that multiply to 20 and add to 9.</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Factors of 20: 1×20, 2×10, <strong>4×5</strong></p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>4 + 5 = 9 ✓</p>
<p style={{fontSize:13,color:c.text,fontWeight:600,marginTop:4}}>Answer: (x + 4)(x + 5)</p>
</div></details>
</div>

<div style={{background:c.offWhite,borderRadius:10,padding:"14px 16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<p style={{fontSize:13,fontWeight:700}}>Question 2</p>
<span style={{fontSize:10,color:c.cyan,fontWeight:600,background:`${c.cyan}15`,padding:"2px 8px",borderRadius:10}}>Standard</span>
</div>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.6,fontFamily:"'Lato',sans-serif"}}>Factorise: x² + 2x - 15</p>
<details style={{marginTop:8}}>
<summary style={{fontSize:12,color:c.cyan,cursor:"pointer",fontWeight:600}}>View Solution</summary>
<div style={{marginTop:8,padding:"10px 12px",background:c.white,borderRadius:6,border:`1px solid ${c.border}`}}>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Find two numbers that multiply to -15 and add to +2.</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Factor pairs of -15: -1×15, 1×-15, <strong>-3×5</strong>, 3×-5</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>-3 + 5 = 2 ✓</p>
<p style={{fontSize:13,color:c.text,fontWeight:600,marginTop:4}}>Answer: (x - 3)(x + 5)</p>
</div></details>
</div>

<div style={{background:c.offWhite,borderRadius:10,padding:"14px 16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<p style={{fontSize:13,fontWeight:700}}>Question 3</p>
<span style={{fontSize:10,color:c.cyan,fontWeight:600,background:`${c.cyan}15`,padding:"2px 8px",borderRadius:10}}>Standard</span>
</div>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.6,fontFamily:"'Lato',sans-serif"}}>Factorise: x² - 8x + 12</p>
<details style={{marginTop:8}}>
<summary style={{fontSize:12,color:c.cyan,cursor:"pointer",fontWeight:600}}>View Solution</summary>
<div style={{marginTop:8,padding:"10px 12px",background:c.white,borderRadius:6,border:`1px solid ${c.border}`}}>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Find two numbers that multiply to +12 and add to -8.</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Both must be negative. Factor pairs: <strong>-2×-6</strong>, -3×-4</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>-2 + -6 = -8 ✓</p>
<p style={{fontSize:13,color:c.text,fontWeight:600,marginTop:4}}>Answer: (x - 2)(x - 6)</p>
</div></details>
</div>

<div style={{background:c.offWhite,borderRadius:10,padding:"14px 16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<p style={{fontSize:13,fontWeight:700}}>Question 4</p>
<span style={{fontSize:10,color:`${c.gold}`,fontWeight:600,background:`${c.gold}15`,padding:"2px 8px",borderRadius:10}}>Extension</span>
</div>
<p style={{fontSize:13,color:c.textLight,lineHeight:1.6,fontFamily:"'Lato',sans-serif"}}>Solve for x: x² + 3x - 18 = 0</p>
<details style={{marginTop:8}}>
<summary style={{fontSize:12,color:c.cyan,cursor:"pointer",fontWeight:600}}>View Solution</summary>
<div style={{marginTop:8,padding:"10px 12px",background:c.white,borderRadius:6,border:`1px solid ${c.border}`}}>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Step 1: Factorise x² + 3x - 18</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Find two numbers that multiply to -18 and add to +3: <strong>6 and -3</strong></p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Step 2: (x + 6)(x - 3) = 0</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>Step 3: Set each bracket to 0:</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>x + 6 = 0 → x = -6</p>
<p style={{fontSize:12,color:c.textLight,lineHeight:1.7,fontFamily:"'Lato',sans-serif"}}>x - 3 = 0 → x = 3</p>
<p style={{fontSize:13,color:c.text,fontWeight:600,marginTop:4}}>Answer: x = -6 or x = 3</p>
</div></details>
</div>

</div></div>

</div></div></F>
</div></section>

<section className="sp" style={{padding:"100px 40px",background:c.white}}>
<div style={{maxWidth:900,margin:"0 auto"}}>
<F><h2 style={{fontSize:32,fontWeight:800,textAlign:"center",marginBottom:8}}>Premier+ vs Standard Tutoring</h2>
<div style={{width:40,height:3,background:c.cyan,margin:"0 auto 48px",borderRadius:2}}/></F>
<F delay={.12}><div style={{overflowX:"auto"}}>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:14,fontFamily:"'Lato',sans-serif"}}>
<thead><tr style={{borderBottom:`2px solid ${c.border}`}}>
<th style={{textAlign:"left",padding:"14px 16px",fontWeight:700,fontFamily:"'Montserrat',sans-serif"}}>Feature</th>
<th style={{textAlign:"center",padding:"14px 16px",fontWeight:700,fontFamily:"'Montserrat',sans-serif"}}>Standard</th>
<th style={{textAlign:"center",padding:"14px 16px",fontWeight:700,fontFamily:"'Montserrat',sans-serif",color:c.cyan}}>Premier+</th>
</tr></thead>
<tbody>
{[
["Expert 1-on-1 tutoring","✓","✓"],
["All subjects, Prep to Year 12","✓","✓"],
["VCAA curriculum aligned","✓","✓"],
["Flexible scheduling","✓","✓"],
["Detailed session reports","","✓"],
["Topic confidence tracking","","✓"],
["Parent dashboard","","✓"],
["Practice questions after each session","","✓"],
["Assessment-aware planning","","✓"],
["Textbook-specific recommendations","","✓"],
].map((row,i)=><tr key={i} style={{borderBottom:`1px solid ${c.border}`}}>
<td style={{padding:"12px 16px",color:c.textLight}}>{row[0]}</td>
<td style={{padding:"12px 16px",textAlign:"center",color:row[1]?c.success:c.textMuted}}>{row[1]||"-"}</td>
<td style={{padding:"12px 16px",textAlign:"center",color:c.cyan,fontWeight:600}}>{row[2]}</td>
</tr>)}
</tbody></table>
</div></F>
</div></section>

<section className="sp3" style={{padding:"80px 40px",background:`linear-gradient(135deg,${c.dark},${c.darkMid})`,textAlign:"center"}}>
<F><h2 style={{fontSize:34,fontWeight:800,color:c.white,marginBottom:12}}>Ready to experience Premier+?</h2>
<p style={{fontSize:15,color:"rgba(255,255,255,0.5)",maxWidth:500,margin:"0 auto 24px",fontFamily:"'Lato',sans-serif"}}>Most of our families choose Premier+ for the visibility it gives them into their child's learning. No lock-in contracts.</p>
<div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",marginBottom:24}}><a href="tel:0426787978" style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,0.7)",fontSize:14,textDecoration:"none"}}><span>📱</span>0426 787 978</a><a href="mailto:admin@baysideacademics.com.au" style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,0.7)",fontSize:14,textDecoration:"none"}}><span>📧</span>admin@baysideacademics.com.au</a></div>
<div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
<button onClick={openEnrol} style={{padding:"15px 30px",borderRadius:8,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${c.cyan},${c.cyanLight})`,color:c.white,textTransform:"uppercase",letterSpacing:1}}>Enrol Now</button>
<button onClick={()=>nav("contact")} style={{padding:"15px 30px",borderRadius:8,border:"2px solid rgba(255,255,255,0.2)",fontSize:14,fontWeight:600,cursor:"pointer",background:"transparent",color:c.white,textTransform:"uppercase",letterSpacing:1}}>Get in Touch</button>
</div></F></section>
</div>);}
