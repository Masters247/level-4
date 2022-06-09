import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, name, organisation } = req.body;

    try {
      const hash = await bcrypt.hash(password, 10);

      const addUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          organisation: organisation,
          image: `https://ui-avatars.com/api/?name=${name}`,
        },
      });

      await prisma.secret.create({
        data: {
          password: hash,
          user: {
            connect: {
              id: addUser.id,
            },
          },
        },
      });

      return res.status(200).end();
    } catch (err) {
      // @ts-ignore
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
}
