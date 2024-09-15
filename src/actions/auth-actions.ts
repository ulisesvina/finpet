"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";

import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "@/constants";

export async function createSession(uid: string) {
  cookies().set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  redirect(HOME_ROUTE);
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}

export async function addUserToDatabase(
  id: string,
  name: string,
  email: string,
  photoURL: string
) {
  try {
    await prisma.user.create({
      data: {
        id,
        name,
        email,
        photoURL,
      },
    });

    return true;
  } catch (error) {
    console.error("Error adding user to database", error);
    return false;
  }
}

export async function getUserByCookie() {
  const id = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  console.log(user);

  return user;
}
