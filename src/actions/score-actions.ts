"use server";

import prisma from "@/libs/prisma";
import { getUserByCookie } from "./auth-actions";
  

const getScore = async () => {
  const user = await getUserByCookie();
  return user?.score;
};

const calculateScore = async () => {
    
}