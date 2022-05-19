import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import S3 from "aws-sdk/clients/s3";
import s3Config from "../../../s3_config.json";
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
    Key: `${data.productName}-${randomUUID()}-${req.body.userId}.jpeg`,
    Body: image,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    // ACL: "public-read",
    Bucket: "mg-webassets",
  };

  const s3 = new S3(s3Config);

  const upload = await s3.upload(params).promise();

  console.log(upload);

  // const addCustomImage = await prisma.customImage.create({
  //   data: {
  //     image: customImg.image,
  //     category: customImg.productCategory,
  //     productName: customImg.productName,
  //     user: {
  //       connect: {
  //         id: id,
  //       },
  //     },
  //   },
  // });

  res.status(200).json({});
}
