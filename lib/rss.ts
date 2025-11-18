import { allPosts, type Post } from "contentlayer/generated"

import { mdxToHtml } from "./markdown"
import { siteConfig } from "./site"

const siteUrl = siteConfig.url
const feedTitle = siteConfig.name
const feedDescription = siteConfig.description

function escapeCdata(value: string) {
  return value.replace(/]]>/g, "]]]]><![CDATA[>")
}

async function buildItem(post: Post) {
  const url = `${siteUrl}${post.slug}`
  const description = post.description
    ? `<description><![CDATA[${escapeCdata(post.description)}]]></description>`
    : ""
  const body = post.body.raw?.trim()
  const html = body ? await mdxToHtml(body) : ""
  const content = html
    ? `<content:encoded><![CDATA[${escapeCdata(html)}]]></content:encoded>`
    : ""

  const lines = [
    "    <item>",
    `      <title><![CDATA[${escapeCdata(post.title)}]]></title>`,
    `      <link>${url}</link>`,
    `      <guid>${url}</guid>`,
    `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
    "      <author><![CDATA[Upton Rand]]></author>",
  ]

  if (description) {
    lines.push(`      ${description}`)
  }

  if (content) {
    lines.push(`      ${content}`)
  }

  lines.push("    </item>")

  return lines.join("\n")
}

export async function generateRssFeed(posts: Post[] = allPosts) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const items = (await Promise.all(sorted.map((post) => buildItem(post)))).join(
    "\n",
  )

  const lastUpdated = sorted.length
    ? new Date(sorted[0].date).toUTCString()
    : new Date().toUTCString()

  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<rss version=\"2.0\" xmlns:content=\"http://purl.org/rss/1.0/modules/content/\">",
    "  <channel>",
    `    <title><![CDATA[${feedTitle}]]></title>`,
    `    <link>${siteUrl}</link>`,
    `    <description><![CDATA[${escapeCdata(feedDescription)}]]></description>`,
    "    <language>en-US</language>",
    `    <lastBuildDate>${lastUpdated}</lastBuildDate>`,
  ]

  if (items) {
    lines.push(items)
  }

  lines.push("  </channel>", "</rss>")

  return lines.join("\n")
}
