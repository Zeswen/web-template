'use client'

import { forwardRef, type ReactNode } from 'react'

type Props = {
  children?: ReactNode
  className?: string
  href?: string
}

const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ children, href = '#', className = '' }, ref) => (
    <a
      ref={ref}
      className={`block py-3 text-blue-700 underline cursor-pointer ${className}`}
      href={href}
    >
      {children}
    </a>
  )
)

export default Link
