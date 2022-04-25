import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const customImg = req.body;

  console.log("customer id", customImg.user.id);
  // console.log("custom image", customImg.image);
  // console.log("custom image", customImg.session.user.email);

  const id = customImg.user.id;

  // const userEmail = customImg.session.user.email;

  const addCustomImage = await prisma.customImage.create({
    data: {
      image: customImg.image,
      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  res.status(200).json(addCustomImage);
}
