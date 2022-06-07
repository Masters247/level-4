import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "HEAD") {
    return res.status(200);
  }
  console.log(req.method);
  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID!,
        clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      }),
      EmailProvider({
        from: process.env.SMTP_FROM,
        async sendVerificationRequest({
          identifier: email,
          url,
          provider: { from },
        }) {
          // Sort data for customer email
          const emailData = {
            to: `${email}`,
            from: `${from}`,
            template_id: "d-7b99c1ad5f1a4940aaa07604ab007324",
            dynamic_template_data: {
              url: url,
              user: email,
            },
          };
          // Send signIn email to customer
          const send = await mail.send(emailData);
          console.log("Log In Request: ", send);
        },
      }),
    ],
    pages: {
      signIn: "/signin",
      newUser: "/account/new-account",
      verifyRequest: "/account/verify-request",
      signOut: "/",
    },
    callbacks: {
      async session({ session, token, user }) {
        // @ts-ignore
        session.user?.userId = user.id;
        // @ts-ignore
        session.user.organisation = user.organisation;
        return session;
      },
    },
  });
}
