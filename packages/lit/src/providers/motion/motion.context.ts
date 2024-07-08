import { createContext } from '@lit/context'

import type { Motion } from '~/lib/motion'

export const motionContext = createContext<Motion>({})
