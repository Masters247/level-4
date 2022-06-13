import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);

// function for hashing data
const sha256Hash = (text: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(text);
  return hash.digest("hex");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email as string;

  //   Find user

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Exit out early if no user

  if (user === null)
    return res
      .status(500)
      .json({ status: "error", message: "No user exists with that email" });

  // Add reset token to user

  const addResetToken = await prisma.secret.update({
    where: {
      userId: user?.id,
    },
    data: {
      resetToken: sha256Hash(`${user?.email}${Date.now().toString()}`),
    },
  });

  // Create JWT that will be sent to user to authenticate

  const token = jwt.sign(
    {
      userId: user?.id,
      email: user?.email,
      resetToken: addResetToken?.resetToken,
    },
    `${process.env.NEXTAUTH_SECRET}`,
    {
      expiresIn: "10m",
    }
  );

  // Function for sending email

  const sendResetEmail = async (user: User, token: string) => {
    const passwordResetLink = `${
      process.env.NODE_ENV === "development" ? "http" : "https"
    }://${req.headers.host}/api/account/password-reset?token=${token}`;
    const data = {
      to: `${user.email}`,
      from: "info@golfway.com",
      template_id: "d-7b99c1ad5f1a4940aaa07604ab007324",
      dynamic_template_data: {
        resetLink: passwordResetLink,
        firstName: user.name,
      },
    };
    const sendMail = await mail.send(data);
    if (sendMail[0].statusCode === 202 || sendMail[0].statusCode === 200) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(500).json({ status: "error" });
    }
  };

  // Send the email with the password reset token

  if (token) {
    await sendResetEmail(user!, token);
  } else {
    return res.status(500).json({ status: "error" });
  }
}
