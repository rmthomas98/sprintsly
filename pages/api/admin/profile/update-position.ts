import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, position } = req.body;
    await prisma.user.update({
      where: { id },
      data: { position },
    });
    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
