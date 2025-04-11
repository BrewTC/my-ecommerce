import crypto from 'crypto';
import { NextResponse } from 'next/server';

function calculateCheckMacValue(params) {
  const { ECPAY_HASH_KEY, ECPAY_HASH_IV } = process.env;

  delete params.CheckMacValue;
  Object.keys(params).forEach((key) => {
    if (params[key] === null || params[key] === undefined) params[key] = '';
  });

  const sortedKeys = Object.keys(params).sort();
  const rawData = sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
  const checkValueString = `HashKey=${ECPAY_HASH_KEY}&${rawData}&HashIV=${ECPAY_HASH_IV}`;

  let encodedString = encodeURIComponent(checkValueString)
    .replace(/%2[dD]/g, '-')
    .replace(/%5[fF]/g, '_')
    .replace(/%2[eE]/g, '.')
    .replace(/%21/g, '!')
    .replace(/%2[aA]/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%20/g, '+')
    .toLowerCase();

  const checkMacValue = crypto
    .createHash('sha256')
    .update(encodedString)
    .digest('hex')
    .toUpperCase();

  return checkMacValue;
}

export async function POST(req) {
  try {
    const { amount, itemName } = await req.json();

    // 記錄傳入參數以便診斷
    console.log('Received payload:', { amount, itemName });

    // 驗證必要參數
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: '金額無效或缺失' },
        { status: 400 }
      );
    }
    if (!itemName || itemName.trim() === '') {
      return NextResponse.json(
        { success: false, message: '商品名稱無效或缺失' },
        { status: 400 }
      );
    }

    // 生成 MerchantTradeNo
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 4);
    const MerchantTradeNo = `ORD${timestamp}${randomStr}`.slice(0, 20);

    // 交易日期
    const MerchantTradeDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
      .replace(/-/g, '/');

    // 綠界支付參數
    const tradeData = {
      MerchantID: process.env.ECPAY_MERCHANT_ID,
      MerchantTradeNo,
      MerchantTradeDate,
      PaymentType: 'aio',
      TotalAmount: Math.round(amount),
      TradeDesc: '網站訂單',
      ItemName: itemName.slice(0, 200),
      ReturnURL: process.env.ECPAY_RETURN_URL,
      ClientBackURL: process.env.ECPAY_CLIENT_BACK_URL,
      ChoosePayment: 'ALL',
      EncryptType: 1,
    };

    tradeData.CheckMacValue = calculateCheckMacValue({ ...tradeData });

    // 生成表單 HTML
    const formHtml = `
      <html>
      <body onload="document.getElementById('ecpay-form').submit();">
        <form id="ecpay-form" action="${process.env.ECPAY_PAYMENT_URL}" method="POST">
          ${Object.keys(tradeData)
            .map(
              (key) => `<input type="hidden" name="${key}" value="${tradeData[key]}">`
            )
            .join('\n')}
          <button type="submit">前往綠界付款</button>
        </form>
      </body>
      </html>
    `;

    return new Response(formHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('綠界支付 API 錯誤:', error);
    return NextResponse.json(
      { success: false, message: '伺服器錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}