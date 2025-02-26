"use client";
import { useCart } from "./CartContext";

const products = [
  { id: 1, name: "巧克力蛋糕", price: 300 },
  { id: 2, name: "草莓蛋糕", price: 350 },
  { id: 3, name: "抹茶蛋糕", price: 320 },
];

export default function ProductList() {
  const { addToCart } = useCart(); // 使用購物車功能

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">產品列表</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white py-1 px-3 rounded"
            >
              加入購物車
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
