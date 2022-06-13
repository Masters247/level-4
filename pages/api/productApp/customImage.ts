import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { s3 } from "../../../lib/amazon-s3";
import { randomUUID } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  // Create correct file type from data

  const image = Buffer.from(
    data.image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // S3 params

  const params = {
    Key: `LevelFour/level4-${randomUUID()}-${data.userId}.jpeg`,
    Body: image,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read",
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
    Tagging: `userId=${data.userId}`,
  };

  // Upload image to S3

  const upload = await s3.upload(params).promise();

  // Create custom image in database with S3 key

  const addCustomImage = await prisma.customImage.create({
    data: {
      url: upload.Location,
      productName: data.productName,
      category: data.productCategory,
      s3Key: upload.Key,
      user: {
        connect: {
          id: `${data.userId}`,
        },
      },
    },
  });

  // Return success response

  res.status(200).json(addCustomImage);
}
