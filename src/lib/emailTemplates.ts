export function waitlistConfirmationEmail(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700;800&display=swap" rel="stylesheet" />
</head>
<body style="margin:0; padding:0; background:#0a0a0a;">
    <div style="background:#0a0a0a; padding:40px 20px; font-family:'League Spartan', Arial, sans-serif;">
        <div style="max-width:480px; margin:0 auto; background:#111; border:1px solid #222; border-radius:8px; overflow:hidden;">

            <!-- Header -->
            <div style="background:#000; padding:20px 24px; text-align:center; border-bottom:1px solid #222;">
            <span style="display:inline-block; color:#FFE900; font-size:20px; line-height:2; font-weight:700; letter-spacing:0.25em; font-family:'League Spartan', Arial, sans-serif;">
                LIMITNESS
            </span>
            </div>

            <!-- Body -->
            <div style="padding:32px 28px;">
                <h2 style="color:#fff; font-size:18px; margin:0 0 12px; font-family:'League Spartan', Arial, sans-serif;">
                    Received.
                </h2>

                <p style="color:#999; font-size:14px; line-height:1.6; margin:0 0 24px;">
                    You've been added to the field for Controlled Batch 01.
                </p>

                <p style="color:#999; font-size:14px; line-height:1.6; margin:0 0 24px;">
                    Selected applicants will be contacted when the batch is ready.
                </p>
            </div>

            <!-- Footer -->
            <div style="padding:16px 28px; border-top:1px solid #222; text-align:center;">
                <span style="color:#444; font-size:11px; letter-spacing:0.1em;">LIMITNESS © ${new Date().getFullYear()}</span>
            </div>
        </div>
    </div>
</body>
</html>
`
}