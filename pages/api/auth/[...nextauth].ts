import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // init prisma
        const prisma = new PrismaClient();
        // get credentials
        const email = credentials?.email;
        const password = credentials?.password;

        // look up user in db
        const user = await prisma.user.findUnique({ where: { email } });
        const passCheck = bcrypt.hashSync(password);

        if (user?.password == passCheck) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
