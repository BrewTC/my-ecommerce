// 'use client'; // 確保是前端頁面

// import { useCart } from "../components/CartContext";
// import { useRouter } from "next/navigation";
// import { useState } from "react"; // 引入 useState 來管理 loading 和 error 狀態

// export default function CheckoutPage() {
//   const { cart } = useCart();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);  // 用來控制按鈕顯示 loading 狀態
//   const [error, setError] = useState(null);  // 用來顯示錯誤訊息

//   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   // 處理付款的函數
//   const handlePayment = async () => {
//     // 發送結帳請求到伺服器
//     try {
//       const response = await fetch('/api/ecpay', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           orderId: `ORDER_${Date.now()}`,
//           amount: totalPrice,
//           itemName: cart.map(item => item.name).join(", "),
//         }),
//       });

//       const result = await response.json();
      
//       if (response.ok) {
//         // 付款網址返回成功，進行跳轉
//         window.location.href = result.paymentUrl; // 跳轉到 ECPay 付款頁面
//       } else {
//         alert('結帳失敗，請再試一次');
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//       alert('發生錯誤，請稍後再試');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">結帳</h2>
//       {cart.length === 0 ? (
//         <p className="text-gray-600">您的購物車是空的</p>
//       ) : (
//         <div>
//           {cart.map((item) => (
//             <div key={item.id} className="flex justify-between items-center border-b py-2">
//               <h3 className="text-sm">{item.name}</h3>
//               <p className="text-gray-600">${item.price} x {item.quantity}</p>
//             </div>
//           ))}
//           <div className="text-right font-bold text-lg mt-4">總金額：${totalPrice}</div>
          
//           {/* 顯示 loading 狀態 */}
//           <button
//             onClick={handlePayment}
//             className="mt-4 w-full bg-green-600 text-white py-2 rounded"
//             disabled={loading}
//           >
//             {loading ? "處理中..." : "確認結帳"}
//           </button>

//           {/* 顯示錯誤訊息 */}
//           {error && <p className="text-red-600 mt-2">{error}</p>}

//           <button
//             onClick={() => router.back()}
//             className="mt-2 w-full bg-gray-500 text-white py-2 rounded"
//           >
//             返回購物車
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client'; // 確保是前端頁面

import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react"; // 引入 useState 來管理 loading 和 error 狀態

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);  // 用來控制按鈕顯示 loading 狀態
  const [error, setError] = useState(null);  // 用來顯示錯誤訊息

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // 處理付款的函數
  const handlePayment = async () => {
    // 發送結帳請求到伺服器
    try {
      const response = await fetch('/api/ecpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: `ORDER_${Date.now()}`,
          amount: totalPrice,
          itemName: cart.map(item => item.name).join(", "),
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        // 付款網址返回成功，進行跳轉
        window.location.href = result.paymentUrl; // 跳轉到 ECPay 付款頁面
      } else {
        alert('結帳失敗，請再試一次');
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert('發生錯誤，請稍後再試');
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
          
          {/* 顯示 loading 狀態 */}
          <button
            onClick={handlePayment}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "處理中..." : "確認結帳"}
          </button>

          {/* 顯示錯誤訊息 */}
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

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("ECPay 回傳資料：", data);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("ECPay 回傳錯誤：", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
