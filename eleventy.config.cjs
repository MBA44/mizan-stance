const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  // ==========================

  // FILTERS

  // ==========================

  // Human readable date (FR)

  eleventyConfig.addFilter("readableDate", (dateObj) => {

    if (!dateObj) return "";

    return DateTime.fromJSDate(dateObj, { zone: "utc" })

      .setLocale("fr")

      .toFormat("dd LLLL yyyy");

  });

  // Date ISO (sitemap)

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {

    if (!dateObj) return "";

    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();

  });

  // Absolute URL helper

  // Usage: {{ page.url | htmlBaseUrl(metadata.url) }}

  eleventyConfig.addFilter("htmlBaseUrl", (path, base) => {

    if (!path) return "";

    if (!base) return path;

    try {

      return new URL(path, base).toString();

    } catch {

      return path;

    }

  });

  // Sort alphabetically

  eleventyConfig.addFilter("sortAlphabetically", (arr) => {

    if (!Array.isArray(arr)) return [];

    return [...arr].sort((a, b) =>

      String(a).localeCompare(String(b))

    );

  });

  // Object.keys helpers (compat)

  eleventyConfig.addFilter("getkeys", (obj) => {

    return obj && typeof obj === "object" ? Object.keys(obj) : [];

  });

  eleventyConfig.addFilter("getKeys", (obj) => {

    return obj && typeof obj === "object" ? Object.keys(obj) : [];

  });

  // Filter system tags

  eleventyConfig.addFilter("filterTagList", (tags) => {

    if (!Array.isArray(tags)) return [];

    const blacklist = new Set(["all", "nav", "post", "posts", "tagList"]);

    return tags

      .filter((t) => typeof t === "string")

      .filter((t) => !blacklist.has(t))

      .filter((t) => !t.startsWith("_"));

  });

  // ==========================

  // LAYOUT ALIASES

  // ==========================

  eleventyConfig.addLayoutAlias("base", "base.njk");

  eleventyConfig.addLayoutAlias("home", "home.njk");

  eleventyConfig.addLayoutAlias("post", "post.njk");

  // ==========================

  // STATIC FILES

  // ==========================

  eleventyConfig.addPassthroughCopy("css");

  // ==========================

  // DIR / ENGINE CONFIG

  // ==========================

  return {

    dir: {

      input: "content",

      includes: "_includes",

      layouts: "_includes/layouts",

      output: "public",

    },

    markdownTemplateEngine: "njk",

    htmlTemplateEngine: "njk",

  };

};