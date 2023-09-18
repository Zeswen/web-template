import { render } from '@testing-library/react';
import { expect, test } from 'bun:test';
import Button from './Button';

test('renders', async () => {
  const button = render(<Button type="button">Click</Button>);
  expect(button).toBeTruthy();
});
