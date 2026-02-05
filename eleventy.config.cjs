// eleventy.config.cjs

module.exports = function (eleventyConfig) {
  // -----------------------
  // Passthrough (assets)
  // -----------------------
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "content/static": "/" });

  // -----------------------
  // Filters required by templates
  // -----------------------
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString();
  });

  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!url) return "";
    if (!base) return url;
    try {
      return new URL(url, base).toString();
    } catch (e) {
      return url;
    }
  });

  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    if (!Array.isArray(arr)) return arr;
    return [...arr].sort((a, b) =>
      String(a).toLowerCase().localeCompare(String(b).toLowerCase())
    );
  });

  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!Array.isArray(tags)) return tags;
    const ignore = new Set(["all", "nav", "post", "posts", "tagList"]);
    return tags.filter((tag) => !ignore.has(tag));
  });

  // -----------------------
  // Layout aliases
  // -----------------------
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("home", "layouts/home.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // -----------------------
  // Collections
  // -----------------------
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      if ("tags" in item.data) {
        const tags = item.data.tags;
        (Array.isArray(tags) ? tags : [tags]).forEach((t) => tagSet.add(t));
      }
    });
    return [...tagSet]
      .filter((tag) => !["all", "nav", "post", "posts", "tagList"].includes(tag))
      .sort((a, b) => String(a).toLowerCase().localeCompare(String(b).toLowerCase()));
  });

  // -----------------------
  // Directories (IMPORTANT FIX)
  // -----------------------
  return {
    dir: {
      input: "content",
      // these are RELATIVE TO input, so we go back to repo root:
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
