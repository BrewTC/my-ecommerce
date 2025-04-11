// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import dotenv from 'dotenv';
dotenv.config(); // 讀取 .env.local

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ECPAY_MERCHANT_ID: process.env.ECPAY_MERCHANT_ID,
    ECPAY_HASH_KEY: process.env.ECPAY_HASH_KEY,
    ECPAY_HASH_IV: process.env.ECPAY_HASH_IV,
    ECPAY_API_MODE: process.env.ECPAY_API_MODE,
    // ECPAY_RETURN_URL: process.env.ECPAY_RETURN_URL,
    // ECPAY_CLIENT_BACK_URL: process.env.ECPAY_CLIENT_BACK_URL,
  },
};

export default nextConfig;
