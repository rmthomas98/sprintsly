import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async () => {
  await prisma.customer.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.card.deleteMany();
  await prisma.user.deleteMany();
};

handler();
