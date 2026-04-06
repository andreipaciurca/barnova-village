import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsFeed } from './NewsFeed'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={typeof href === 'string' ? href : href?.pathname || '#'} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, viewport: _viewport, whileInView: _whileInView, whileHover: _whileHover, whileTap: _whileTap, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('NewsFeed', () => {
  it('opens internal articles in a modal reader', async () => {
    const user = userEvent.setup()

    render(
      <NewsFeed
        readMoreLabel="Citește mai mult"
        officialLabel="Oficial"
        items={[
          {
            title: 'Anunț intern important',
            link: '/posts/anunt-intern-important',
            slug: 'anunt-intern-important',
            pubDate: '2026-04-06T12:00:00Z',
            contentSnippet: 'Textul rezumatului pentru locuitori.',
            content: 'Acesta este conținutul complet al articolului intern.',
            source: 'supabase',
          },
        ]}
      />
    )

    await user.click(screen.getByRole('button', { name: /^citește$/i }))

    expect(screen.getByText('Acesta este conținutul complet al articolului intern.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /deschide pagina/i })).toHaveAttribute(
      'href',
      '/posts/anunt-intern-important'
    )
  })
})
