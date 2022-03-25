import { NextApiRequest, NextApiResponse } from "next";
const mailchimp = require("@mailchimp/mailchimp_marketing");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });

  const email = req.body;

  try {
    // Send request to subscribe user to Mailchimp list - will unsubscribe if already subscribed
    const response = await mailchimp.lists.setListMember(
      "8b9d2d79cb",
      `${email}`,
      {
        email_address: `${email}`,
        status_if_new: "subscribed",
      }
    );

    if (response.status === "pending") res.status(200).json(response);
    if (response.status === "subscribed") res.status(200).json(response);
    if (response.status === "unsubscribed") res.status(200).json(response);
  } catch (err: any) {
    if (err) res.status(404).json(err.response.body);
  }
}
