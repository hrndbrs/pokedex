/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["raw.githubusercontent.com", "assets.pokemon.com", "github.com"],
  },
};

module.exports = nextConfig;
