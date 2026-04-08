import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  return NextResponse.json({ status: "ok", hasKey: !!apiKey });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject, childName, yearLevel, type } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const isEnrol = type === "enrol";
    const emailSubject = isEnrol
      ? `New Enrolment Enquiry - ${childName || name}`
      : `Website Enquiry - ${subject || "General"}`;

    let htmlBody = `<div style="font-family:Arial,sans-serif;max-width:600px;"><div style="background:#1A1A2E;padding:20px 24px;border-radius:12px 12px 0 0;"><h2 style="color:#00C2E0;margin:0;font-size:18px;">${isEnrol?"New Enrolment Enquiry":"Website Enquiry"}</h2><p style="color:rgba(255,255,255,0.5);margin:4px 0 0;font-size:13px;">via baysideacademics.com.au</p></div><div style="background:#f7f8fa;padding:24px;border:1px solid #e5e7eb;border-radius:0 0 12px 12px;"><table style="width:100%;font-size:14px;border-collapse:collapse;"><tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr><tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00C2E0;">${email}</a></td></tr>${phone?`<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>`:""}${childName?`<tr><td style="padding:8px 0;color:#6b7280;">Child</td><td style="padding:8px 0;font-weight:600;">${childName}</td></tr>`:""}${yearLevel?`<tr><td style="padding:8px 0;color:#6b7280;">Year Level</td><td style="padding:8px 0;">${yearLevel}</td></tr>`:""}${subject&&!isEnrol?`<tr><td style="padding:8px 0;color:#6b7280;">Subject</td><td style="padding:8px 0;">${subject}</td></tr>`:""}</table>${message?`<div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;"><p style="color:#6b7280;font-size:13px;margin:0 0 6px;">Message</p><p style="font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p></div>`:""}</div></div>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Bayside Academics <noreply@baysideacademics.com.au>",
        to: ["learning@baysideacademics.com.au"],
        reply_to: email,
        subject: emailSubject,
        html: htmlBody,
      }),
    });

    const result = await response.text();
    if (!response.ok) {
      console.error("Resend error:", response.status, result);
      return NextResponse.json({ error: `Resend: ${result}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
