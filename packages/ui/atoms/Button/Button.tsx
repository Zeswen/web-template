'use client'

import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  className?: string
  onClick?: () => void
  type: HTMLButtonElement['type']
}

export default function Button({
  children,
  className = '',
  onClick,
  type = 'button'
}: Props) {
  return (
    <button
      type={type}
      className={`py-3 bg-purple-400 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
