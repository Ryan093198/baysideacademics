export default function sitemap() {
  const base = "https://baysideacademics.com.au";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/premier-plus`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/bilingualtutoring`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/free-maths-resources`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
