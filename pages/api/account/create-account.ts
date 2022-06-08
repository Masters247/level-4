import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  console.log(body);

  const addUser = await prisma.user.create({
    data: {
      id: body.id,
      image: body.image,
      name: body.name,
    },
  });
  res.status(200).json(addUser);
}
