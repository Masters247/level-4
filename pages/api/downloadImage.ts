import { NextApiRequest, NextApiResponse } from "next";
import imageToBase64 from "image-to-base64";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.body.url;

  const base64 = await imageToBase64(url);

  res.status(200).json({ base64 });
}
