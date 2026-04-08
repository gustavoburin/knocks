/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "knocks";

module.exports = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : "" },
};
