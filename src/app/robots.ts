import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${process.env.NEXTAUTH_URL || "https://ella-website-azure.vercel.app"}/sitemap.xml`,
  };
}
