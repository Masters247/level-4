import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, name, organisation } = req.body;

    try {
      const hash = await bcrypt.hash(password, 2);

      await prisma.user.create({
        data: {
          email: email,
          password: hash,
          name: name,
          organisation: organisation,
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
