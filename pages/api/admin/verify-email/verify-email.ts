import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // init prisma and get id and code from frontend
    const prisma = new PrismaClient();
    const { id, secretCode } = req.body;

    // get user from db
    const user = await prisma.user.findUnique({ where: { id } });
    if (secretCode.trim() === user?.verificationCode) {
      await prisma.user.update({
        where: { id },
        data: { emailVerified: true },
      });
      res.status(200).send("success");
    } else {
      res.status(200).send("invalid");
    }
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
