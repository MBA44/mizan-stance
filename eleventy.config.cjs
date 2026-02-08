const { DateTime } = require("luxon");

function toJSDate(d) {
  if (!d) return null;
  if (d instanceof Date) return d;
  const parsed = new Date(d);
  return isNaN(parsed) ? null : parsed;
}

module.exports = function (eleventyConfig) {
  // ---------- Date filters (base-blog classics)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = toJSDate(dateObj);
    if (!d) return "";
    return DateTime.fromJSDate(d, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const d = toJSDate(dateObj);
    if (!d) return "";
    return DateTime.fromJSDate(d, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // ---------- Utility filters (also used by base-blog templates)
  eleventyConfig.addFilter("head", (arr, n) => {
    if (!Array.isArray(arr)) return [];
    if (n < 0) return arr.slice(n);
    return arr.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => Math.min(...numbers));

  eleventyConfig.addFilter("getKeys", (target) => {
    if (!target || typeof target !== "object") return [];
    return Object.keys(target);
  });

  eleventyConfig.addFilter("sortAlphabetically", (strings) => {
    if (!Array.isArray(strings)) return [];
    return [...strings].sort((a, b) =>
      String(a).localeCompare(String(b), "en", { sensitivity: "base" })
    );
  });

  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!Array.isArray(tags)) return [];
    return tags.filter((tag) => !["all", "nav", "post", "posts"].includes(tag));
  });

  // ---------- Passthrough (safe defaults)
  eleventyConfig.addPassthroughCopy({ "public": "/" });
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });

  // ---------- Directories
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
