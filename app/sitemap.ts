import type { MetadataRoute } from "next"
import { allPages, allPosts } from "contentlayer/generated"

const siteUrl = "https://gaymensfieldguide.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const baseRoutes: MetadataRoute.Sitemap = ["/", "/posts", "/shop"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }))

  const postRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${siteUrl}${post.slug}`,
    lastModified: new Date(post.date ?? now),
  }))

  const pageRoutes: MetadataRoute.Sitemap = allPages.map((page) => ({
    url: `${siteUrl}${page.slug}`,
    lastModified: now,
  }))

  return [...baseRoutes, ...postRoutes, ...pageRoutes]
}
