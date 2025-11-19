import Link from "next/link"
import { allPosts } from "contentlayer/generated"

import { siteConfig } from "@/lib/site-config"
import { formatDate, getReadingTime } from "@/lib/utils"

export default function Home() {
  const posts = allPosts
    .slice()
    .sort((a, b) => {
      const toTimestamp = (value?: string) => (value ? new Date(value).getTime() : 0)
      return toTimestamp(b.date) - toTimestamp(a.date)
    })

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/15 via-purple-500/10 to-slate-900/70 p-8 shadow-xl shadow-fuchsia-500/10 dark:from-fuchsia-500/25 dark:via-purple-500/10 dark:to-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-200">
          {siteConfig.hero.kicker}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          {siteConfig.hero.headline}
        </h1>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-200">{siteConfig.hero.subheading}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-800 dark:text-slate-100">
          <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-1 font-medium text-slate-900 dark:bg-white/10 dark:text-white">
            96 posts archived
          </span>
          <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 font-medium text-slate-900 dark:bg-white/5 dark:text-white">
            10 editorial beats
          </span>
          <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 font-medium text-slate-900 dark:bg-white/5 dark:text-white">
            EN · ES · FR
          </span>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={siteConfig.hero.cta.href}
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950"
          >
            {siteConfig.hero.cta.label}
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 transition hover:text-fuchsia-600 dark:text-white"
          >
            Learn more about the project
          </Link>
        </div>
      </section>

      <section id="latest" aria-labelledby="latest-heading" className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Latest dispatches</p>
          <h2 id="latest-heading" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Gay Men&rsquo;s Field Guide journal
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            Curated essays on tech, business, health, and queer culture from Cleveland, Ohio.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => {
            const readingTime = getReadingTime(post.body?.raw ?? "")

            return (
              <article
                key={post._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm transition hover:border-fuchsia-500/60 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70"
              >
                <div className="flex flex-wrap items-center text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <time dateTime={post.date} className="text-slate-700 dark:text-slate-200">
                    {post.date ? formatDate(post.date) : "Undated"}
                  </time>
                  <span className="mx-2 h-1 w-1 rounded-full bg-slate-400/60" aria-hidden />
                  <span>{readingTime}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-900 transition group-hover:text-fuchsia-700 dark:text-white">
                  <Link href={post.slug} className="relative inline-flex focus:outline-none">
                    <span className="absolute inset-0" aria-hidden />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  {post.description ?? siteConfig.tagline}
                </p>
                <div className="mt-5 inline-flex items-center text-sm font-semibold text-fuchsia-700 transition group-hover:translate-x-1 dark:text-fuchsia-300">
                  Read the post
                  <span className="ml-2" aria-hidden>
                    →
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
