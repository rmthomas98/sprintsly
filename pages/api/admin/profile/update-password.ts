import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const bcrypt = require("bcryptjs");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { password, id } = req.body;
    const hashedPassword = await bcrypt.hashSync(password.trim());
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
