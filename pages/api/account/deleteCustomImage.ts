import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "../../../lib/amazon-s3";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  const params = {
    Key: body.key,
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
  };

  // Delete the image relation from the DB

  try {
    await prisma.customImage.delete({
      where: {
        id: body.id,
      },
    });

    // Delete the image from the S3 bucket

    await s3.deleteObject(params).promise();

    // Send a success response

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed" });
  }
}
