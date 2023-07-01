'use client';

import Button from '@zeswen/ui/atoms/Button';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <>
      <p>Internal Error: {error.message}</p>
      <Button onClick={reset}>Reset</Button>
    </>
  );
};

export default Error;
