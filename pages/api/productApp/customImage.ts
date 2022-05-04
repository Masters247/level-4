import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const customImg = req.body;

  const id = customImg.user.id;

  const addCustomImage = await prisma.customImage.create({
    data: {
      image: customImg.image,
      category: customImg.productCategory,
      productName: customImg.productName,
      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  res.status(200).json(addCustomImage);
}
