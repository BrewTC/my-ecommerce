'use client';

import { useCart } from '../components/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 計算總金額
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // 生成商品名稱
  const itemName = cart.map((item) => `${item.name} x${item.quantity}`).join('#');

  const handlePayment = async () => {
    // 驗證輸入
    if (totalPrice <= 0) {
      setError('購物車總金額無效，請確認您的購物車');
      return;
    }
    if (!itemName) {
      setError('商品名稱無效，請確認您的購物車');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ecpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
          itemName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '結帳失敗，請再試一次');
      }

      const html = await response.text();
      const newWindow = window.open('', '_self');
      newWindow.document.write(html);
    } catch (error) {
      console.error('結帳錯誤:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">結帳</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">您的購物車是空的</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <h3 className="text-sm">{item.name}</h3>
              <p className="text-gray-600">${item.price} x {item.quantity}</p>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">總金額：${totalPrice}</div>

          <button
            onClick={handlePayment}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
            disabled={loading || totalPrice === 0 || cart.length === 0}
          >
            {loading ? '處理中...' : '確認結帳'}
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            onClick={() => router.back()}
            className="mt-2 w-full bg-gray-500 text-white py-2 rounded"
          >
            返回購物車
          </button>
        </div>
      )}
    </div>
  );
}