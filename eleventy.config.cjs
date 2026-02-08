const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // -------------------------
  // Plugins
  // -------------------------
  eleventyConfig.addPlugin(pluginRss);

  // -------------------------
  // Passthrough (assets)
  // (Garde seulement ce qui existe vraiment dans ton repo)
  // -------------------------
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });

  // -------------------------
  // Filters — dates
  // -------------------------
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // -------------------------
  // Filters — urls
  // htmlBaseUrl(url, base)
  // -------------------------
  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;

    const b = (base || "").toString().replace(/\/$/, "");
    const u = url.toString();
    const path = u.startsWith("/") ? u : `/${u}`;
    return b ? `${b}${path}` : path;
  });

  // -------------------------
  // Collections (optionnel)
  // -------------------------
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("content/posts/**/*.{md,njk,html}")
      .reverse();
  });

  // -------------------------
  // Layout aliases (optionnel)
  // -------------------------
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("default", "base.njk");

  // -------------------------
  // Eleventy dirs
  // -------------------------
  return {
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
  };
};
