import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { Link } from './Link';

test('renders', async () => {
  render(<Link>Click</Link>);
  expect(screen.getByText('Click')).toBeTruthy();
});

test('executes function on click', async () => {
  const mockFunction = vi.fn();

  render(<Link onClick={mockFunction}>Click</Link>);

  await userEvent.click(screen.getByText('Click'));
  screen.debug();
  expect(mockFunction).toHaveBeenCalled();
});
