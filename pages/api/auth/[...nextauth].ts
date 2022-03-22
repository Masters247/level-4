import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";

import graphcms from "../../../lib/graph-ql";
import { gql } from "graphql-request";

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    nextUser(where: { email: $email }, stage: DRAFT) {
      id
      email
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    createNextUser(data: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jamie@graphcms.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async ({ email, password }: any) => {
        const { user } = await graphcms.request(GetUserByEmail, {
          email,
        });

        console.log("user", user);

        if (!user) {
          const { newUser } = await graphcms.request(CreateNextUserByEmail, {
            email,
            password: await hash(password, 12),
          });

          return {
            id: newUser.id,
            username: email,
            email,
          };
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return {
          id: user.id,
          username: email,
          email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
