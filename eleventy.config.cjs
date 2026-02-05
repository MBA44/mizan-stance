module.exports = function (eleventyConfig) {

  /* ============================
     PASSTHROUGH
  ============================ */
  eleventyConfig.addPassthroughCopy("content/img");
  eleventyConfig.addPassthroughCopy("content/css");

  /* ============================
     LAYOUT ALIAS
  ============================ */
  eleventyConfig.addLayoutAlias("base", "base.njk");

  /* ============================
     FILTERS — URLs
  ============================ */
  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!url) return base || "";
    if (url.startsWith("http")) return url;
    return `${base || ""}${url}`;
  });

  /* ============================
     FILTERS — DATES
  ============================ */
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  });

  /* ============================
     ELEVENTY CONFIG
  ============================ */
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html", "xml"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
