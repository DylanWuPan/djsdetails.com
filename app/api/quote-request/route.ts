import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, message } = body;

    await resend.emails.send({
      from: "DJ's Details <quote-request@djsdetails.com>",
      to: "djsdetailsbusiness@gmail.com",
      subject: `New Quote Request from ${name}`,
      html: `
        <div style="background:#09090b;padding:40px 20px;font-family:Arial,sans-serif;color:#ffffff;">
          <div style="max-width:640px;margin:0 auto;background:#18181b;border:1px solid #27272a;border-radius:20px;overflow:hidden;">
            <div style="padding:36px 36px 24px 36px;background:linear-gradient(to right,#eab308,#facc15);color:#000000;">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;opacity:0.8;">
                New Customer Inquiry
              </p>

              <h1 style="margin:12px 0 0 0;font-size:36px;line-height:1;font-weight:900;text-transform:uppercase;">
                Quote Request
              </h1>
            </div>

            <div style="padding:36px;">
              <div style="margin-bottom:32px;">
                <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">
                  Customer Name
                </p>

                <p style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">
                  ${name}
                </p>
              </div>

              <div style="display:grid;grid-template-columns:1fr;gap:20px;margin-bottom:20px;">
                <div style="background:#09090b;border:1px solid #27272a;border-radius:14px;padding:18px;">
                  <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                    Email Address
                  </p>

                  <p style="margin:0;font-size:16px;font-weight:600;color:#ffffff;">
                    ${email}
                  </p>
                </div>

                <div style="background:#09090b;border:1px solid #27272a;border-radius:14px;padding:18px;">
                  <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                    Phone Number
                  </p>

                  <p style="margin:0;font-size:16px;font-weight:600;color:#ffffff;">
                    ${phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div style="margin-bottom:36px;background:#09090b;border:1px solid #27272a;border-radius:14px;padding:24px;">
                <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                  Customer Message
                </p>

                <p style="margin:0;font-size:16px;line-height:1.7;color:#e4e4e7;white-space:normal;">
                  ${message || "No message provided."}
                </p>
              </div>

              <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;">
                <a
                  href="mailto:${email}"
                  style="display:inline-block;background:#eab308;color:#000000;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;"
                >
                  Reply by Email
                </a>

                <a
                  href="tel:${phone}"
                  style="display:inline-block;background:#27272a;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;border:1px solid #3f3f46;"
                >
                  Call Customer
                </a>
              </div>
            </div>

            <div style="border-top:1px solid #27272a;padding:24px 36px;background:#09090b; text-align:center;">
              <p style="margin:0;color:#71717a;font-size:13px;line-height:1.6;">
                DJ's Details • djsdetails.com
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
