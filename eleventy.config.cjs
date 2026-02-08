const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

  /* =========================
     PLUGINS
  ========================= */
  eleventyConfig.addPlugin(pluginRss);

  /* =========================
     FILTERS
  ========================= */

  // Date lisible (FR)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime
      .fromJSDate(dateObj, { zone: "utc" })
      .setLocale("fr")
      .toFormat("dd LLLL yyyy");
  });

  // Date ISO (sitemap)
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return DateTime
      .fromJSDate(dateObj, { zone: "utc" })
      .toISODate();
  });

  // Base URL absolue
  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!url) return "";
    return new URL(url, base).toString();
  });

  // Tri alphabétique
  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...arr].sort((a, b) => a.localeCompare(b));
  });

  // Extraire les clés d’un objet
  eleventyConfig.addFilter("getKeys", (obj) => {
    if (!obj || typeof obj !== "object") return [];
    return Object.keys(obj);
  });

  // Filtrer les tags système
  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!Array.isArray(tags)) return [];
    return tags.filter(tag =>
      !["all", "nav", "post", "posts"].includes(tag)
    );
  });

  /* =========================
     LAYOUT ALIASES
  ========================= */
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");

  /* =========================
     STATIC FILES
  ========================= */
  eleventyConfig.addPassthroughCopy("css");

  /* =========================
     DIR CONFIG
  ========================= */
  return {
    dir: {
      input: "content",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "public",
    },
  };
};
