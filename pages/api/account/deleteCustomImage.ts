import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.body;

  const deleteCustomImages = await prisma.customImage.delete({
    where: {
      id: id,
    },
  });

  const deletedImages = await JSON.parse(JSON.stringify(deleteCustomImages));

  res.status(200).json(deletedImages);
}
