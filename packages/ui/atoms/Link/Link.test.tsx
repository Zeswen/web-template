import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import Link from './Link'

test('navigates on click', async () => {
  render(<Link href="/">Click</Link>)
  expect(screen.getByText('Click')).toBeTruthy()
})
