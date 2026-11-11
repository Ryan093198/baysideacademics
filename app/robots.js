export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://baysideacademics.com.au/sitemap.xml",
  };
}
