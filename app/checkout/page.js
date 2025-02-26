// app/checkout/page.js
'use client'; // 確保是前端頁面

import { useState } from 'react';

export default function CheckoutPage() {
  const [cartId, setCartId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartId, totalAmount }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);  // 顯示成功訊息
    } else {
      setMessage('結帳失敗: ' + data.message);  // 顯示錯誤訊息
    }
  };

  return (
    <div>
      <h1>結帳頁面</h1>
      <div>
        <label>購物車 ID:</label>
        <input
          type="text"
          value={cartId}
          onChange={(e) => setCartId(e.target.value)}
        />
      </div>
      <div>
        <label>結帳金額:</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />
      </div>
      <button onClick={handleCheckout}>提交結帳</button>

      {message && <p>{message}</p>}
    </div>
  );
}
