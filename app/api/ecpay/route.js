import { NextResponse } from "next/server";
import ECPAY from "ecpay-payment";

// app/api/ecpay/route.js
export async function POST(req) {
  try {
    // 取得前端傳來的資料
    const { orderId, amount, itemName } = await req.json();

    // 檢查是否有必要的資料
    if (!orderId || !amount || !itemName) {
      return new Response(
        JSON.stringify({ message: '缺少必要的參數' }),
        { status: 400 }
      );
    }

    // 用你的 ECPay 商店資訊替換
    const ecpay = new ECPAY({
      MerchantID: "3444033", // 測試用商店代號
      HashKey: "vNaOYHxsJRfDZbaz", // 替換為你的 HashKey
      HashIV: "Uj7P8Vyoy5paSLgS", // 替換為你的 HashIV
      isSandbox: true, // 設定為 true 表示測試模式
    });

    // 設定付款的參數
    const formData = ecpay.payment_client.aio_check_out_credit_onetime({
      MerchantTradeNo: orderId,
      MerchantTradeDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      TotalAmount: amount,                  // 訂單金額
      TradeDesc: "測試訂單",                 // 訂單描述
      ItemName: itemName,                   // 商品名稱
      ReturnURL: "http://localhost:3000/api/ecpay/notify",  // 付款完成後的回調網址
      ClientBackURL: "http://localhost:3000/checkout",      // 付款完成後的返回頁面
    });

    // 檢查 `formData` 並獲取支付 URL
    console.log('FormData:', formData);  // 這行是為了檢查 formData 中是否有 PaymentURL
    const paymentUrl = formData.PaymentURL; // 從 formData 提取支付 URL

    // 返回付款 URL 給前端
    return NextResponse.json({ success: true, paymentUrl: paymentUrl });

  } catch (error) {
    console.error("ECPay API 錯誤：", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
