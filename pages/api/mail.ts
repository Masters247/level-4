const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req: any, res: any) {
  const body = JSON.parse(req.body);
  const message = `
  Name: ${body.firstName} ${body.lastName}\r\n
  Email: ${body.email}\r\n
  Message: ${body.message}\r\n
  Marketing: ${
    body.checkbox === undefined
      ? "Marketing Not Ticked! Please Do Not Add To Mailing List"
      : "Marketing Ticked Please Add To Mailing List"
  }
  `;
  const data = {
    to: [
      "dan.couzens@mastersgolf.co.uk",
      "danecouzens@gmail.com",
      //   "mollie@golfway.com",
    ],
    from: "contact@level4.com",
    subject: "New contact form message",
    text: message,
    html: `<p>${message.replace(/\r\n/g, "<br>")}</p>`,
  };

  mail.send(data);
  // console.log('mail.ts', data)
  res.status(200).json({ status: "Ok" });
}
