import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
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
          // Check for a user with the given email

          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            include: {
              secret: true,
            },
          });

          // If there is a user in the DB, check if the password is correct

          if (user) {
            const checkPassword = await confirmPasswordHash(
              credentials.password,
              user.secret?.password!
            );

            // If the password is correct, return the user

            if (checkPassword) {
              return user;
            } else {
              // Return null which will create a NextAuth error

              return null;
            }
          } else {
            // If there is no user in the DB, return null which will create a NextAuth error

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
      // This only fires if the new user is created using social log ins
      newUser: "/account/new-account",
      signOut: "/",
    },
    callbacks: {
      async session({ session, token }) {
        // Return the user ID from DB in the session

        session!.user!.userId = token.sub;
        return session;
      },
    },
  });
}
