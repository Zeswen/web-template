import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'bun:test'

beforeAll(GlobalRegistrator.register)
afterEach(cleanup)
