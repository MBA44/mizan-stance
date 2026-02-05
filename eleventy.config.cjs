import { DateTime } from "luxon";

export default function (eleventyConfig) {

  /* ----------------------------------------
   * PASSTHROUGH COPY
   * -------------------------------------- */
  eleventyConfig.addPassthroughCopy({ "content/img": "img" });
  eleventyConfig.addPassthroughCopy("content/robots.txt");

  /* ----------------------------------------
   * FILTERS — DATES
   * -------------------------------------- */
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  /* ----------------------------------------
   * FILTERS — URLS
   * -------------------------------------- */
  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!base) return url;
    return new URL(url, base).toString();
  });

  /* ----------------------------------------
   * FILTERS — SORTING
   * -------------------------------------- */
  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    if (!Array.isArray(arr)) return arr;

    return [...arr].sort((a, b) => {
      const A =
        typeof a === "string"
          ? a
          : (a && (a.title || a.name || a.slug || a.tag)) || String(a);
      const B =
        typeof b === "string"
          ? b
          : (b && (b.title || b.name || b.slug || b.tag)) || String(b);

      return String(A).localeCompare(String(B), "en", { sensitivity: "base" });
    });
  });

  /* ----------------------------------------
   * LAYOUT ALIAS
   * -------------------------------------- */
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

  /* ----------------------------------------
   * ELEVENTY CONFIG
   * -------------------------------------- */
  return {
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
