/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "en-GB"],
    defaultLocale: "en-GB",
  },
};

module.exports = nextConfig;
