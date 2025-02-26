import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import React from "react";
// import Carousel from "../components/Carousel"; // 確保路徑正確
import Carousel from "@/components/Carousel"; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold text-center">歡迎來到我們的商店！</h1>
        <ProductList />
      </main>
      <Cart />
      <Footer />
    </div>
  );
}
