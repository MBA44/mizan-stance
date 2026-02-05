const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  /* =========================
     PASSTHROUGH
     ========================= */

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy({ "public/img": "img" });

  /* =========================
     FILTERS
     ========================= */

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
  });

  /* =========================
     COLLECTIONS
     ========================= */

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/*.md");
  });

  /* =========================
     MARKDOWN
     ========================= */

