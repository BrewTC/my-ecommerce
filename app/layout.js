import { CartProvider } from "./components/CartContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
