/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // fully static: host anywhere (Vercel, Netlify, GitHub Pages, S3)
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};
export default nextConfig;
