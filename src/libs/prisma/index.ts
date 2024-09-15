import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "development") {
  throw new Error(
    "Please add your database URL to .env or set the environment to development."
  );
}

const prisma: PrismaClient = new PrismaClient();

export default prisma;
