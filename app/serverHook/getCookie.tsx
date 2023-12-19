"use server";
import { cookies } from "next/headers";
export const getCookie = async (key: string) => {
  cookies().get(key);
};
