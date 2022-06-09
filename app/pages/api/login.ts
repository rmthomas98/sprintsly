// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;
  console.log(email, password);
  setTimeout(() => {
    res.status(200).json({ status: "success" });
  }, 5000);
};

export default handler;
