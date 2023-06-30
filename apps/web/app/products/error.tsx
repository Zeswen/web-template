'use client';

import { Button } from '@zeswen/ui';
import Trans from 'next-translate/Trans';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log(error);
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
