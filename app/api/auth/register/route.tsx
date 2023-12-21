import connectMongoDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import User from "@/app/models/UserModel";
import { hashPassword } from "@/app/utils/server/hashPassword";
import { validateRegisterInput } from "@/app/middleware/validationMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "@/app/errors/customError";

export async function POST(req: any, res: NextApiResponse) {
  try {
    await connectMongoDB();
    const createData = await req.json();
    const { email } = createData;
console.log(email)
    // 檢查是否已經存在相同電子郵件的使用者
    const user = await User.findOne({ email });
    // if (user) {
    //   throw new BadRequestError("電子郵件已經存在");
    // }

    // 取消註解並根據需要修改以下部分
    // const isFirstAccount = (await User.countDocuments()) === 0;
    // createData.role = isFirstAccount ? "admin" : "user";
    // const hashedPassword = await hashPassword(createData.password);
    // createData.password = hashedPassword;

    return NextResponse.json(
      { msg: "註冊成功！" },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    console.error("處理註冊時發生錯誤:", error);
    return NextResponse.json(
      { error: "註冊失敗" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
