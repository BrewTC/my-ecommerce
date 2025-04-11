import crypto from 'crypto';

function calculateCheckMacValue(params) {
  const { HashKey, HashIV } = process.env;

  // 移除 CheckMacValue 並處理 null 值
  delete params.CheckMacValue;
  Object.keys(params).forEach((key) => {
    if (params[key] === null || params[key] === undefined) params[key] = '';
  });

  // 按字母順序排序並生成字串
  const sortedKeys = Object.keys(params).sort();
  const rawData = sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
  const checkValueString = `HashKey=${HashKey}&${rawData}&HashIV=${HashIV}`;

  // URL Encode 並替換特定字符
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

  // SHA-256 並轉為大寫
  const checkMacValue = crypto
    .createHash('sha256')
    .update(encodedString)
    .digest('hex')
    .toUpperCase();

  return checkMacValue;
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { totalAmount, itemName = '烘焙商品' } = req.body;

  // 生成唯一訂單編號
  const orderPrefix = 'ORD';
  const timestamp = Date.now().toString(36).slice(-10);
  const randomStr = Math.random().toString(36).substr(2, 3);
  const MerchantTradeNo = orderPrefix + timestamp + randomStr;

  // 交易日期
  const MerchantTradeDate = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '/') + ' 00:00:00';

  // 綠界支付參數
  const tradeData = {
    MerchantID: process.env.ECPAY_MERCHANT_ID,
    MerchantTradeNo,
    MerchantTradeDate,
    PaymentType: 'aio',
    TotalAmount: Math.round(totalAmount),
    TradeDesc: '自動產生訂單',
    ItemName: itemName,
    ReturnURL: process.env.ECPAY_RETURN_URL,
    ChoosePayment: 'ALL',
    EncryptType: 1,
  };

  tradeData.CheckMacValue = calculateCheckMacValue({ ...tradeData });

  // 生成 HTML 表單
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

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(formHtml);
}