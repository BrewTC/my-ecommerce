"use client";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation"; // 用於跳轉頁面

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCart();
  const router = useRouter(); // 取得 router 物件

  return (
    <div className="fixed top-0 right-0 w-64 bg-white shadow-lg p-4">
      <h2 className="text-lg font-bold mb-4">購物車</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">購物車是空的</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-sm">{item.name}</h3>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeFromCart(item)}
                  className="px-2 bg-red-500 text-white rounded"
                >-</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-2 bg-green-500 text-white rounded"
                >+</button>
              </div>
            </div>
          ))}
          <button
            onClick={() => router.push("/checkout")} // 跳轉到 checkout 頁面
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
          >
            前往結帳
          </button>
        </div>
      )}
    </div>
  );
}