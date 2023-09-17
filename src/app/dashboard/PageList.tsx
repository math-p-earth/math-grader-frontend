'use client'

import { usePathname } from 'next/navigation'

import { Book, List } from 'lucide-react'

import { PageButton } from './PageButton'

interface Page {
  label: string
  href: string
  icon: React.ReactNode
}

const pages: Page[] = [
  {
    label: 'Problem Lists',
    href: '/dashboard/problem-lists',
    icon: <List size={16} />,
  },
  {
    label: 'Sources',
    href: '/dashboard/sources',
    icon: <Book size={16} />,
  },
]

export function PageList() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-1">
      {pages.map(({ href, label, icon }) => (
        <PageButton key={label} href={href} isActive={href === pathname}>
          <span className="mr-2">{icon}</span> {label}
        </PageButton>
      ))}
    </div>
  )
}
