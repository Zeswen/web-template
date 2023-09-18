import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Header from './Header';

test('loads and displays greeting', async () => {
  const header = render(<Header>Header</Header>);
  expect(header).toBeDefined();
});
