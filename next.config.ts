import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    env: {
    MONGODB_URI: 'mongodb+srv://shazaniyu:royale@cluster0.7i2knqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    // 'mongodb+srv://titidprogrammer:30041987Titile@cluster0.69e5w7x.mongodb.net/?retryWrites=true&w=majority',
    // 'mongodb://127.0.0.1:27017/smnk',
    RENTALS_URL: 'http://localhost:3000/',
    // 'http://localhost:3000/',
    CUSTOMER_SERVICE_ID: '64e35d468b2fcd7a6d3a7df6',
    // 64ff2ee5ecfc57d21e80d3d2 online
    // 64e35d468b2fcd7a6d3a7df6 local
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

export default nextConfig;
