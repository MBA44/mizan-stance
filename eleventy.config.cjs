import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function(eleventyConfig) {
  // -------------------------
  // Plugins
  // -------------------------
  eleventyConfig.addPlugin(pluginRss);

  // -------------------------
  // Passthrough (assets)
  // -------------------------
  eleventyConfig.addPassthroughCopy({ "public": "/" }); // si tu as /public
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" }); // si tu as /content/assets

  // -------------------------
  // Filters — dates
  // -------------------------
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // -------------------------
  // Filters — urls
  // htmlBaseUrl(url, base)
  // Used by sitemap templates / RSS etc.
  // -------------------------
  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    // url can be undefined or already absolute
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;

    // base may come from metadata.url or an explicit string
    const b = (base || "").toString().replace(/\/$/, "");
    const u = url.toString();

    // ensure leading slash
    const path = u.startsWith("/") ? u : `/${u}`;
    return b ? `${b}${path}` : path;
  });

  // -------------------------
  // Collections (optional but common)
  // -------------------------
  eleventyConfig.addCollection("posts", (collectionApi) => {
    // Adapt if your content structure differs
    return collectionApi.getFilteredByGlob("content/posts/**/*.{md,njk,html}").reverse();
  });

  // -------------------------
  // Layout aliases (optional)
  // If you use layout: base or layout: layouts/base.njk etc.
  // -------------------------
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("default", "base.njk");

  // -------------------------
  // Config — IMPORTANT with “v2 root directory strategy”
  // Your input folder seems to be /content.
  // Includes must match where base.njk lives.
  // If you created content/_includes/base.njk → includes must be "content/_includes".
  // -------------------------
  return {
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "liquid", "11ty.js"]
  };
}
