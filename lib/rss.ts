import { allPosts } from "contentlayer/generated"

import { mdxToHtml } from "./markdown"
import { siteConfig } from "./site"

const siteUrl = siteConfig.url
const feedTitle = siteConfig.name
const feedDescription = siteConfig.description

function escapeCdata(value: string) {
  return value.replaceAll("]]>", "]]>]]><![CDATA[")
}

export async function generateRssFeed() {
  const items = await Promise.all(
    allPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(async (post) => {
        const url = new URL(post.slug, siteUrl).toString()
        const content = await mdxToHtml(post.body.raw)

        const description = post.description ?? ""

        return `    <item>
      <title><![CDATA[${escapeCdata(post.title)}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${escapeCdata(description)}]]></description>
      <content:encoded><![CDATA[${escapeCdata(content)}]]></content:encoded>
    </item>`
      })
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${escapeCdata(feedTitle)}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${escapeCdata(feedDescription)}]]></description>
${items.join("\n")}
  </channel>
</rss>`
}
