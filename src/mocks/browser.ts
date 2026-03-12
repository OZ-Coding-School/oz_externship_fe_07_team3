import { setupWorker } from 'msw/browser'
import { examHandlers } from './handlers/examHandlers'

export const worker = setupWorker(...examHandlers)
