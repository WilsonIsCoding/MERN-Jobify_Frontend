import { NextResponse } from "next/server";
import connectMongoDB from "../lib/connectDB";

export async function GET(req: any) {
  await connectMongoDB();
  return NextResponse.json({ message: "connect success!" }, { status: 200 });
}
