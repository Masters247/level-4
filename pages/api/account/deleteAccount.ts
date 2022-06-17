import type { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "../../../lib/amazon-s3";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  //   Find users custom images

  const images = await prisma.customImage.findMany({
    where: {
      userId: body.id,
    },
    select: {
      s3Key: true,
    },
  });

  //   Delete images from AWS S3

  if (images.length > 0) {
    const params = {
      Delete: {
        Objects: images.map((image: { s3Key: string }) => {
          return {
            Key: image.s3Key,
          };
        }),
      },
      Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
    };

    await s3.deleteObjects(params).promise();
  }

  //   Delete user from database

  await prisma.user.delete({
    where: {
      id: body.id,
    },
  });

  //   Return success response

  res.status(200).json({ status: "success" });
}
