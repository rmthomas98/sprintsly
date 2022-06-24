import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const { email, username } = req.body;

    // check if email already exists
    const isEmailTaken = await prisma.user.findUnique({
      where: { email: email },
    });
    if (isEmailTaken) return res.status(200).send("email");

    // check if username already exists
    const isUsernameTaken = await prisma.user.findUnique({
      where: { username: username },
    });
    if (isUsernameTaken) return res.status(200).send("username");

    res.status(200).send("clear");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
