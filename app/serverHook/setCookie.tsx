"use server";
import { cookies } from "next/headers";
export const setCookie = async (key, value) => {
  cookies().set(key, value);
};
