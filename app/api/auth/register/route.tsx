import connectMongoDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import User from "@/app/models/UserModel";
import { hashPassword } from "@/app/utils/server/hashPassword";
import { validateRegisterInput } from "@/app/middleware/validationMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    const createData = await req.json();
    const isFirstAccount = (await User.countDocuments()) === 0;
    createData.role = isFirstAccount ? "admin" : "user";
    const hashedPassword = await hashPassword(createData.password);
    createData.password = hashedPassword;
    return NextResponse.json(
      { msg: "Registration Success!" },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
