import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, id, code } = req.body;
    console.log(email, id, code);

    const user = await prisma.user.findUnique({ where: { id } });

    if (user?.verificationCode !== code.trim()) {
      return res.status(200).send("invalid code");
    }

    await prisma.user.update({
      where: { id },
      data: { email },
    });

    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
