import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import Button from './Button';

test('renders', async () => {
  render(<Button type="button">Click</Button>);
  expect(screen.getByText('Click')).toBeTruthy();
});

test('executes function on click', async () => {
  const mockFunction = vi.fn();

  render(
    <Button type="button" onClick={mockFunction}>
      Click
    </Button>
  );

  await userEvent.click(screen.getByText('Click'));
  expect(mockFunction).toHaveBeenCalled();
});
