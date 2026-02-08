function normalizeUrl(u) {
  if (!u) return "";
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return u.replace(/\/+$/, "");
}

module.exports = {
  url: normalizeUrl(
    process.env.SITE_URL ||
    process.env.CF_PAGES_URL ||
    "http://localhost:8080"
  )
};
