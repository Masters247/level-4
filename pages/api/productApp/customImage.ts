import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  const image = Buffer.from(
    data.image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Key: `level4-${randomUUID()}-${data.userId}.jpeg`,
    Body: image,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read",
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
  };

  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const upload = await s3.upload(params).promise();

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

  res.status(200).json(addCustomImage);
}
