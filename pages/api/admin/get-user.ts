import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // get id from frontend
    const { id } = req.body;

    // get data from frontend
    const user = await prisma.user.findUnique({
      where: { id },
      include: { subscription: true },
    });

    const data = {
      name: user?.name,
      email: user?.email,
      username: user?.username,
      image: user?.image,
      role: user?.role,
      subType: user?.subscription?.type,
      tier: user?.subscription?.tier,
    };

    res.status(200).send(data);
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
