import type { RequestHandler } from "express";

const sendgrid = "https://api.sendgrid.com/v3";
const sendgridToken = process.env.SENDGRID_TOKEN;

type ContactEmail = {
  email: string;
  name: string;
  subject: string;
  body: string;
  ip: string;
}
const createContactEmailPayload = ({ email, name, subject, body, ip }: ContactEmail) => {
  let payload = {
    personalizations: [
      {
        to: [
          {
            email: "hacksu@cs.kent.edu",
            name: "Hacksu Leaders",
          },
        ],
      },
    ],
    from: {
      email: "contact-form@hacksu.com",
      name: "Hacksu Contact Form",
    },
    reply_to: {
      email,
      name,
    },
    subject,
    content: [
      {
        type: "text/plain",
        value:
          `HacKSU Contact-Us Website Form
    
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            IP Address: ${ip}
    
            -- MESSAGE BODY --
    
            ${body}`
            .split("\n")
            .map((o) => o.trim())
            .join("\n") +
          `
    
-- END OF MESSAGE BODY --
    
            `,
      },
    ],
  };
  return payload;
}

export const contact: RequestHandler = async (req, res) => {
  let { ip } = req;
  let payload = createContactEmailPayload({
    ...req.body,
    ip,
  });
  try {
    const sendgridRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sendgridToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("sent contact form, status " + sendgridRes.status);
    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
