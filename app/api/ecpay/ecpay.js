export default async function handler(req, res) {
    
    
    if (!orderId || !amount || !itemName) {
        return res.status(400).json({ message: '缺少必要的參數' });
      }

      
    if (req.method === 'POST') {
      // 這裡處理付款請求
      const { orderId, amount, itemName } = req.body;
  
      // 假設 ECPay SDK 已經引入並配置好
      try {
        // ECPay API 處理，這裡是模擬處理邏輯
        const paymentUrl = `https://payment.ecpay.com.tw/${orderId}`;
  
        res.status(200).json({ paymentUrl }); // 返回付款頁面連結
      } catch (error) {
        console.error("ECPay API 錯誤：", error);
        res.status(500).json({ message: '付款處理失敗' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  