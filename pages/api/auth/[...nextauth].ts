import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const bcrypt = require("bcryptjs");

// init prisma
const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // get credentials
        const email = credentials?.email;
        const password = credentials?.password;

        // look up user in db
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new Error("User not found");

        // compare passwords
        const passwordMatch = await bcrypt.compare(password, user?.password);
        console.log(passwordMatch);
        // if no match return null
        if (!passwordMatch) {
          throw new Error("incorrect password");
        }
        // if match return user
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
});
