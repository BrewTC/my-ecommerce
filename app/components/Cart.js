"use client";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="fixed top-0 right-0 w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold">購物車</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">購物車是空的</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between p-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                移除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
