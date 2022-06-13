import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
const bcrypt = require("bcrypt");

// function for hashing data
const decodePasswordResetToken = (token: string) => {
  const secret = `${process.env.NEXTAUTH_SECRET}`;
  const verified = jwt.verify(token, secret);
  return verified;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If request is a GET from the reset password link then set the token cookie and push to the new password page

  if (req.method === "GET") {
    res.setHeader(
      "set-cookie",
      serialize("reset_token", String(req.query.token), {
        httpOnly: true,
        sameSite: true,
        path: "/",
      })
    );
    return res.redirect("/account/new-password");
  }

  // If request is a POST from the new password page then set the new password and clear the token cookie

  if (req.method === "POST") {
    const resetToken = req.cookies.reset_token;
    const decodedToken: any = decodePasswordResetToken(resetToken);
    const newPassword = req.body;

    // Find user

    const user = await prisma.user.findUnique({
      where: {
        email: decodedToken.email,
      },
      include: {
        secret: {
          select: {
            resetToken: true,
          },
        },
      },
    });

    // If both the token and user exist then update the password and clear the token cookie

    if (user?.secret?.resetToken === decodedToken.resetToken) {
      const hash = await bcrypt.hash(newPassword, 12);

      //   Update password

      await prisma.secret.update({
        where: {
          userId: user?.id,
        },
        data: {
          password: hash,
        },
      });

      //   Clear reset token from user

      await prisma.secret.update({
        where: {
          userId: user?.id,
        },
        data: {
          resetToken: null,
        },
      });

      //   Clear token cookie

      res.setHeader(
        "Set-Cookie",
        serialize("reset_token", "", {
          httpOnly: true,
          sameSite: true,
          maxAge: -1,
          expires: new Date(0),
          path: "/",
        })
      );

      //   Send new details back to browser to log in

      const loginData = { password: newPassword, email: decodedToken.email };

      return res.status(200).send(loginData);
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "Invalid token" });
    }
  }
}
