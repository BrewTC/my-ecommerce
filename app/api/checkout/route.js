import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 接收到的請求內容：", body);

    return NextResponse.json({ message: "付款 API 呼叫成功", totalPrice: body.totalPrice });
  } catch (error) {
    console.error("❌ API 錯誤：", error);
    return NextResponse.json({ error: "API 錯誤" }, { status: 500 });
  }
}
