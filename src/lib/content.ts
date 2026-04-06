export function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function truncateText(input: string, maxLength = 160) {
  const text = stripHtml(input)

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength).trim()}…`
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
