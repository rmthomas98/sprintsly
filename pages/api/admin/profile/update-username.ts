import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, username } = req.body;

    const isUsernameTaken = await prisma.user.findUnique({
      where: { username },
    });
    if (isUsernameTaken) return res.status(200).send("username in use");

    await prisma.user.update({
      where: { id },
      data: { username },
    });
    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
