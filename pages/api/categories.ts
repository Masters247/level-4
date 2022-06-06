import { NextApiRequest, NextApiResponse } from "next";
import { categoryPagesSlugQuery } from "../../lib/graphcms-querys/categoryQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getCategories = await categoryPagesSlugQuery();

  res.status(200).json(getCategories);
}
