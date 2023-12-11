"use server";
import { cookies } from "next/headers";
export const getCookie = async (key) => {
  cookies().get(key);
};
