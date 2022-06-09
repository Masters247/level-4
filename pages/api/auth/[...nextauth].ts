import NextAuth, { User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
const mail = require("@sendgrid/mail");
import CredentialsProvider from "next-auth/providers/credentials";

const bcrypt = require("bcrypt");

const confirmPasswordHash = (
  plainPassword: string,
  hashedPassword: string | null
) => {
  return new Promise((resolve) => {
    bcrypt.compare(
      plainPassword,
      hashedPassword,
      function (err: any, res: unknown) {
        resolve(res);
      }
    );
  });
};

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    debug: process.env.NODE_ENV === "development",
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        credentials: {},
        async authorize(credentials: any, req) {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            const checkPassword = await confirmPasswordHash(
              credentials.password,
              user.password
            );
            if (checkPassword) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID!,
        clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      }),
    ],
    pages: {
      signIn: "/signin",
      newUser: "/account/new-account",
      signOut: "/",
    },
    callbacks: {
      async session({ session, token, user }) {
        session!.user!.userId = token.sub;
        return session;
      },
    },
  });
}
