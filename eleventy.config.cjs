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

  // Used in sitemap.xml.njk in many base-blog setups
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString(); // full ISO (safe for sitemaps)
  });

  // Used for making absolute URLs (sitemap/canonical helpers)
  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!url) return "";
    if (!base) return url;
    try {
      return new URL(url, base).toString();
    } catch (e) {
      return url;
    }
  });

  // Used by tags.njk in eleventy-base-blog
  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    if (!Array.isArray(arr)) return arr;
    return [...arr].sort((a, b) =>
      String(a).toLowerCase().localeCompare(String(b).toLowerCase())
    );
  });

  // IMPORTANT: the one you're missing right now
  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!Array.isArray(tags)) return tags;

    // Tags to ignore (base-blog defaults + common noise)
    const ignore = new Set([
      "all",
      "nav",
      "post",
      "posts",
      "tagList",
    ]);

    return tags.filter((tag) => !ignore.has(tag));
  });

  // -----------------------
  // Layout aliases (optional, but helps)
  // -----------------------
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("home", "layouts/home.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // -----------------------
  // Basic collections (optional)
  // -----------------------
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();

    collectionApi.getAll().forEach((item) => {
      if ("tags" in item.data) {
        const tags = item.data.tags;
        (Array.isArray(tags) ? tags : [tags]).forEach((t) => tagSet.add(t));
      }
    });

    // Return filtered + sorted list
    return [...tagSet]
      .filter((tag) => !["all", "nav", "post", "posts", "tagList"].includes(tag))
      .sort((a, b) => String(a).toLowerCase().localeCompare(String(b).toLowerCase()));
  });

  // -----------------------
  // Directories
  // -----------------------
  return {
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
