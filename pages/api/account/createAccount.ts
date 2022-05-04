import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const createAccount = req.body;

  console.log("createAccount", createAccount);
  console.log("createAccount", typeof createAccount.name);

  const addUser = await prisma.user.create({
    data: {
      name: createAccount.name,
      organisation: createAccount.organisation,
      email: createAccount.email,
      password: createAccount.password,
    },
  });

  res.status(200).json(addUser);
}
