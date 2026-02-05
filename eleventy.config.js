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

  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");

  const markdownLib = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink()
  });

  eleventyConfig.setLibrary("md", markdownLib);

  /* =========================
     WATCH TARGETS
     ========================= */

  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./_includes/");

  /* =========================
     GLOBAL DATA
     ========================= */

  eleventyConfig.addGlobalData("site", {
    name: "Mizan",
    url: "https://mizan-stance.org",
    language: "fr"
  });

  /* =========================
     RETURN CONFIG
     ========================= */

  return {
    dir: {
      input: ".",          // ⬅️ POINT CLÉ
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
