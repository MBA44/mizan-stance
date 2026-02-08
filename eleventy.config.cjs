const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // ==========================
  // FILTERS
  // ==========================

  // Human readable date (FR)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" })
      .setLocale("fr")
      .toFormat("dd LLLL yyyy");
  });

  // Generic date filter: {{ dateObj | date("yyyy-LL-dd") }}
  eleventyConfig.addFilter("date", (dateObj, format = "yyyy-LL-dd") => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Sitemap-friendly lastmod: YYYY-MM-DD
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
  });

  // Build absolute URL from base + path
  // Usage: {{ page.url | htmlBaseUrl(metadata.url) }}
  eleventyConfig.addFilter("htmlBaseUrl", (path, base) => {
    if (!path) return "";
    if (!base) return path;
    try {
      return new URL(path, base).toString();
    } catch (e) {
      return path;
    }
  });

  // Sort strings alphabetically
  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...arr].sort((a, b) => String(a).localeCompare(String(b)));
  });

  // Return Object.keys safely (your template calls getkeys)
  eleventyConfig.addFilter("getkeys", (obj) => {
    return obj && typeof obj === "object" ? Object.keys(obj) : [];
  });

  // Filter tag list for tag pages/archives
  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!Array.isArray(tags)) return [];
    const blacklist = new Set(["all", "nav", "post", "posts", "tagList"]);
    return tags
      .filter((t) => t && typeof t === "string")
      .filter((t) => !blacklist.has(t))
      .filter((t) => !t.startsWith("_"));
  });

  // ==========================
  // LAYOUT ALIASES
  // NOTE: since dir.layouts points to "_includes/layouts",
  // aliases should be file names (NOT "layouts/xxx")
  // ==========================
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");

  // ==========================
  // STATIC FILES
  // ==========================
  eleventyConfig.addPassthroughCopy("css");

  // ==========================
  // CONFIG
  // ==========================
  return {
    dir: {
      input: "content",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "public",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};


// AUTO-ADDED FILTER (getKeys)
module.exports = (function(orig){return function(eleventyConfig){
  eleventyConfig.addFilter("getKeys", obj => (obj && typeof obj === "object") ? Object.keys(obj) : []);
  return orig(eleventyConfig);
};})(module.exports);
