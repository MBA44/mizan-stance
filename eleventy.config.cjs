const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  /* =========================
     PASSTHROUGH
     ========================= */
  eleventyConfig.addPassthroughCopy("content/img");
  eleventyConfig.addPassthroughCopy("content/feed");


  /* =========================
     FILTRES DATES
     ========================= */

  // Date lisible (blog, listes)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" })
      .setLocale("fr")
      .toFormat("dd LLL yyyy");
  });

  // RFC3339 (sitemap, RSS)
  eleventyConfig.addFilter("dateToRfc3339", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });


  /* =========================
     FILTRES TAGS
     ========================= */

  // Filtrer tags techniques Eleventy
  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!tags) return [];
    return tags.filter(tag =>
      !["all", "nav", "post", "posts"].includes(tag)
    );
  });

  // Trier alphabétiquement
  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.slice().sort((a, b) => a.localeCompare(b));
  });

  // Obtenir les clés d’un objet
  eleventyConfig.addFilter("getKeys", (obj) => {
    if (!obj) return [];
    return Object.keys(obj);
  });


  /* =========================
     URL ABSOLUE (SEO / SITEMAP)
     ========================= */

  eleventyConfig.addFilter("htmlBaseUrl", (url, base) => {
    if (!url) return "";

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    const baseUrl = (base || "").replace(/\/$/, "");
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;

    return `${baseUrl}${cleanUrl}`;
  });


  /* =========================
     COLLECTIONS
     ========================= */

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/blog/*.md");
  });


  /* =========================
     CONFIG GLOBALE
     ========================= */

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
