module.exports = function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addPassthroughCopy({ "public": "/" });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
