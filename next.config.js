/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_API: process.env.SHOPIFY_API,
    SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
