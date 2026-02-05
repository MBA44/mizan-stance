module.exports = function (eleventyConfig) {

  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!base) return url;
    return base.replace(/\/$/, "") + "/" + String(url).replace(/^\//, "");
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    }
  };
};
