import { allPosts } from "contentlayer/generated"

import { mdxToHtml } from "./mdx-to-html"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaymensfieldguide.com"
const SITE_TITLE = "Gay Men's Field Guide"
const SITE_DESCRIPTION = "Updates and essays from Gay Men's Field Guide"

function escapeCdata(value: string) {
  return value.replaceAll("]]>", "]]>]]><![CDATA[")
}

export async function generateRssFeed() {
  const items = await Promise.all(
    allPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(async (post) => {
        const url = new URL(post.slug, SITE_URL).toString()
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
    <title><![CDATA[${escapeCdata(SITE_TITLE)}]]></title>
    <link>${SITE_URL}</link>
    <description><![CDATA[${escapeCdata(SITE_DESCRIPTION)}]]></description>
${items.join("\n")}
  </channel>
</rss>`
}
