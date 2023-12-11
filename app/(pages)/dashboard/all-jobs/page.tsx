'use client'
import customFetch from "@/app/utils/fetchUtils";

export default async function Page() {
  async function res() {
    try {
      const res = await customFetch.get("/jobs");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  await res();
  return (
    <>
      <h1>all-job</h1>
    </>
  );
}
