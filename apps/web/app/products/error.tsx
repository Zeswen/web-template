'use client'

import Button from '@zeswen/ui/atoms/Button'

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  ;<>
    <p>Internal Error: {error.message}</p>
    <Button type="reset" onClick={reset}>
      Reset
    </Button>
  </>
}
