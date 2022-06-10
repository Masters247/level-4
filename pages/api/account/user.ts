import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email: any = req.query.email;

  const getUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      accounts: true,
    },
  });

  const user = await JSON.parse(JSON.stringify(getUser));

  res.status(200).json(user);
}
