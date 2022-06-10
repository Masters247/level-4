/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.graphcms.com",
      "avatars.githubusercontent.com",
      "media.graphassets.com",
      "mg-webassets.s3.eu-west-2.amazonaws.com",
      "ui-avatars.com",
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
    ],
  },
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "en-GB"],
    defaultLocale: "en-GB",
  },
};

module.exports = nextConfig;
