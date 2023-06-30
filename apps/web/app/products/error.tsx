'use client';

import { Button } from '@zeswen/ui';
import Trans from 'next-translate/Trans';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <>
      <p>
        <Trans i18nKey="common:error" /> {error.message}
      </p>
      <Button onClick={reset}>
        <Trans i18nKey="common:reset" />
      </Button>
    </>
  );
};

export default Error;
