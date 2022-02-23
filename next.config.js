/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "uk"],
    defaultLocale: "uk",
  },
};

module.exports = nextConfig;
