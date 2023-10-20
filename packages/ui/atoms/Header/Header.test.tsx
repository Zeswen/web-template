import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Header from './Header'

test('loads and displays greeting', async () => {
  render(<Header>Header</Header>)

  expect(screen.getByText('Header')).toBeDefined()
})
