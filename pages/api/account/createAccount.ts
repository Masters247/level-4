import { ConfigResolverMap } from "@use-gesture/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  // console.log("body", body);

  const addUser = await prisma.user.create({
    data: {
      name: body.name,
      organisation: body.organisation,
      email: body.email,
      password: body.password,
    },
  });

  res.status(200).json(addUser);
}
