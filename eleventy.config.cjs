module.exports = function (eleventyConfig) {

  const { URL } = require("url");

  eleventyConfig.addFilter("htmlBaseUrl", function (url, base) {
    try {
      return new URL(url, base).toString();
    } catch (e) {
      return url;
    }
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};
