const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

export function formatDate(date: string | number | Date) {
  const value = typeof date === "string" ? Date.parse(date) : new Date(date).valueOf()

  if (Number.isNaN(value)) {
    return "Coming soon"
  }

  return dateFormatter.format(new Date(value))
}

export function getReadingTime(content: string, wordsPerMinute = 215) {
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

  return `${minutes} min read`
}
