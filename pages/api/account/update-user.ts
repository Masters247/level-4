import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  try {
    // Update user data or add it

    await prisma.user.upsert({
      create: {
        name: body.name,
        organisation: body.org,
      },
      update: {
        name: body.name,
        organisation: body.org,
        email: body.email,
        image: `https://ui-avatars.com/api/?name=${body.name}`,
      },
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
