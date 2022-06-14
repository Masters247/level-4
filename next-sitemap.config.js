/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://level-four.co.uk",
  generateRobotsTxt: true,
  changefreq: "daily",
  exclude: [
    "/server-sitemap.xml",
    "/account",
    "/signin",
    "/signup",
    "/forgot-password",
    "/account/new-password",
    "/account/new-account",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
  },
};
