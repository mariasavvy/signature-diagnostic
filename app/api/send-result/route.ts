import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, resultTitle, resultBody, percentage } = await req.json();

  if (!email || !resultTitle || !resultBody) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const spectrumPercent = Math.round(percentage * 100);
  const filledCells = Math.round(percentage * 20);
  const emptyCells = 20 - filledCells;

  const spectrumCells =
    Array(filledCells).fill('<td style="width:12px;height:4px;background:#c4a882;padding:0;"></td>').join("") +
    Array(emptyCells).fill('<td style="width:12px;height:4px;background:#1e1e1e;padding:0;"></td>').join("");

  const bodyParagraphs = resultBody
    .replace(/<p>/g, "")
    .split("</p>")
    .filter((s: string) => s.trim())
    .map(
      (p: string) =>
        `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#9a948c;font-family:'DM Sans',Arial,sans-serif;">${p.trim()}</p>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Your Signature Diagnostic Result</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'DM Sans',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;min-height:100vh;">
  <tr>
    <td align="center" style="padding:48px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Wordmark -->
        <tr>
          <td style="padding-bottom:48px;">
            <span style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5a5650;font-family:'DM Sans',Arial,sans-serif;">The SAVVY Foundation</span>
          </td>
        </tr>

        <!-- Label -->
        <tr>
          <td style="padding-bottom:16px;">
            <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#5a5650;font-family:'DM Sans',Arial,sans-serif;">Your result</span>
          </td>
        </tr>

        <!-- Spectrum bar -->
        <tr>
          <td style="padding-bottom:8px;">
            <table cellpadding="0" cellspacing="2" style="width:100%;">
              <tr>
                ${spectrumCells}
              </tr>
            </table>
          </td>
        </tr>

        <!-- Spectrum labels -->
        <tr>
          <td style="padding-bottom:48px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${spectrumPercent < 40 ? "#c4a882" : "#5a5650"};font-family:'DM Sans',Arial,sans-serif;">Service</td>
                <td align="right" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${spectrumPercent >= 70 ? "#c4a882" : "#5a5650"};font-family:'DM Sans',Arial,sans-serif;">Signature</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Result title -->
        <tr>
          <td style="padding-bottom:24px;">
            <h2 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:500;line-height:1.3;color:#e8e4df;">${resultTitle}</h2>
          </td>
        </tr>

        <!-- Result body -->
        <tr>
          <td style="padding-bottom:48px;">
            ${bodyParagraphs}
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="border-top:1px solid #1e1e1e;padding-top:32px;padding-bottom:20px;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:500;color:#e8e4df;line-height:1.4;">Two ways to keep thinking.</p>
          </td>
        </tr>

        <!-- CTA 1 -->
        <tr>
          <td style="border-top:1px solid #1e1e1e;">
            <a href="#" style="display:block;padding:16px 0;font-size:14px;color:#c4a882;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;display:flex;justify-content:space-between;">
              <span>The Whitepaper — Building a Signature Business in 2026</span>
            </a>
          </td>
        </tr>

        <!-- CTA 2 -->
        <tr>
          <td style="border-top:1px solid #1e1e1e;border-bottom:1px solid #1e1e1e;">
            <a href="mailto:maria@savvy-foundation.com" style="display:block;padding:16px 0;font-size:14px;color:#c4a882;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;">
              A Working Session with Maria Meermeier
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:48px;">
            <p style="margin:0;font-size:12px;color:#5a5650;line-height:1.6;font-family:'DM Sans',Arial,sans-serif;">The SAVVY Foundation · maria@savvy-foundation.com</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const { error } = await resend.emails.send({
    from: "diagnostic@savvy-foundation.com",
    to: email,
    subject: "Your Signature Diagnostic Result — The SAVVY Foundation",
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
