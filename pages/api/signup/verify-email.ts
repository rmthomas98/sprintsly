import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // init prisma
    const prisma = new PrismaClient();
    // get data from frontend
    const { email, secretCode } = req.body;
    console.log(email, secretCode);

    // check to see if email exists in database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(200).send("email not found");

    // if user is found compare codes
    if (user.verificationCode === secretCode.trim()) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          emailVerified: true,
        },
      });
      res.status(200).send("success");
    } else {
      res.status(200).send("incorrect");
    }
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
