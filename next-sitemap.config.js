/** @type {import('next-sitemap').IConfig} */
// TODO: need to figure out why blog posts arent being generated in the sitemap, just tags
module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
