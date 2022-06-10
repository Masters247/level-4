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

  try {
    //   Find user

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Add reset token to user

    const addResetToken = await prisma.secret.update({
      where: {
        userId: user?.id,
      },
      data: {
        resetToken: sha256Hash(`${user?.email}${Date.now().toString()}`),
      },
    });

    // Create token that will be sent to user

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

    // Send the email with the password reset token
    const sendResetEmail = async (user: User, token: string) => {
      const passwordResetLink = `https://${req.headers.host}/api/password-reset?token=${token}`;
      const data = {
        to: `${user.email}`,
        from: "info@golfway.com",
        template_id: "d-86589b799d954040a59c337a1497c599",
        dynamic_template_data: {
          resetLink: passwordResetLink,
          firstName: user.name,
        },
      };
      const sendMail = await mail.send(data);
      console.log(sendMail);
      if (sendMail[0].Response.statusCpde === 202) {
        return res.status(200).json(user);
      }
    };

    if (token) {
      await sendResetEmail(user!, token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
