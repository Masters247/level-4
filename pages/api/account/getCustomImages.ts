import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.id;

  // console.log("id", id);
  const getCustomImages = await prisma.customImage.findMany({
    where: {
      userId: id,
    },
  });

  const customImages = await JSON.parse(JSON.stringify(getCustomImages));
  // console.log("getCustomImages custom Images", customImages);

  res.status(200).json(customImages);
}