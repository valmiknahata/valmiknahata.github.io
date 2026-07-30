/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '',
  distDir: 'docs',
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;

