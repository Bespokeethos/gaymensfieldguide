import { generateRssFeed } from "@/lib/rss"

export async function GET() {
  const rss = await generateRssFeed()

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
