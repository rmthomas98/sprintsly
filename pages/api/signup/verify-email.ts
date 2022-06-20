import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, secretCode } = req.body;
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
