const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // -----------------
  // Filters
  // -----------------

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("htmlBaseUrl", (url) => {
    if (!url) return "";
    return url.replace(/\/index\.html$/, "/");
  });

  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    return arr.slice().sort((a, b) => a.localeCompare(b));
  });

  // -----------------
  // Layout aliases
  // -----------------

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("home", "layouts/home.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // -----------------
  // Passthrough
  // -----------------

  eleventyConfig.addPassthroughCopy("img");

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
