interface emailType {
  success: boolean;
  message: string;
}

export async function SendVerificationEmail(
  email: string,
  name: string,
  verifiyCode: number,
): Promise<emailType> {
  try {
    const repo1 = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_SENDER_EMAIL,
          name: process.env.BREVO_SENDER_NAME,
        },
        to: [{ email }],
        subject: "Verification Code",
        htmlContent: `...`,
      }),
    });

    const data = await repo1.json();
    console.log("STATUS:", repo1.status);
    console.log("BODY:", JSON.stringify(data, null, 2));

    const repo = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          email: process.env.BROVO_SENDER_EMAIL,
          name: process.env.BREVO_SENDER_NAME,
        },
        to: [{ email }],
        subject: "Verification Code",
        htmlContent: `
                <div style="font-family: sans-serif; max-width: 400px; margin: auto;">
                    <h2>Hello ${name}!</h2>
                    <p>Your OTP verification code is:</p>
                    <div style="
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    color: #4F46E5;
                    padding: 16px;
                    background: #F3F4F6;
                    border-radius: 8px;
                    text-align: center;
                    ">
                    ${verifiyCode}
                    </div>
                    <p style="color: #6B7280; font-size: 14px;">
                    Expires in 5 minutes. Do not share it.
                    </p>
                </div>
                `,
      }),
    });

    console.log(repo);

    if (!repo.ok) {
      return {
        success: false,
        message: "Failed to send verification email",
      };
    }
    return {
      success: true,
      message: "Verificaiton Email send successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
