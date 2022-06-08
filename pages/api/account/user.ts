import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.id;

  const getUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  const user = await JSON.parse(JSON.stringify(getUser));

  res.status(200).json(user);
}
