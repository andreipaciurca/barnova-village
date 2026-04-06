import { describe, expect, it } from 'vitest'
import { slugify, stripHtml, truncateText } from './content'

describe('content helpers', () => {
  it('slugifies Romanian titles into stable URL fragments', () => {
    expect(slugify('  Bârnova Village: Ghid 2026!  ')).toBe('brnova-village-ghid-2026')
  })

  it('strips HTML before truncating text', () => {
    expect(stripHtml('<p>Salut <strong>lume</strong></p>')).toBe('Salut lume')
    expect(truncateText('<p>Salut <strong>lume</strong></p>', 20)).toBe('Salut lume')
  })
})
