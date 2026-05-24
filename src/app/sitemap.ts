import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.xuedda.com";

  const routes = [
    { url: "/", changeFrequency: "daily" as const, priority: 1 },
    { url: "/news", changeFrequency: "daily" as const, priority: 0.8 },
    { url: "/models", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/lighting", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/software", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/videos", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/others", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/courses", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/materials", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/cases", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/services", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/member", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/login", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/community", changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
