// frontend/src/components/ui/toaster-utils.js
'use client'

import { createToaster } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})
