/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  eslint: {
    dirs: ["common", "pages"],
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}
