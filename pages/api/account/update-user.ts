import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  try {
    await prisma.user.update({
      data: { name: body.name, organisation: body.org, email: body.email },

      where: {
        id: body.id,
      },
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error" });
  }
}
