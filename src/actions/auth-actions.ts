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
        petId: "",
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}
