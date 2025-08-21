'use client'
import * as React from 'react'
import { Portal, Spinner, Stack, Toast as ToastRoot, Toaster as ChakraToaster } from '@chakra-ui/react'
import { toaster } from './toaster-hooks'

export const Toaster = () => (
  <Portal>
    <ChakraToaster toaster={toaster}>
      {(toast) => (
        <ToastRoot width={{ md: 'sm' }}>
          {toast.type === 'loading' ? <Spinner size='sm' /> : <ToastRoot.Indicator />}
          <Stack gap='1' flex='1' maxWidth='100%'>
            {toast.title && <ToastRoot.Title>{toast.title}</ToastRoot.Title>}
            {toast.description && <ToastRoot.Description>{toast.description}</ToastRoot.Description>}
          </Stack>
          {toast.action && <ToastRoot.ActionTrigger>{toast.action.label}</ToastRoot.ActionTrigger>}
          {toast.closable && <ToastRoot.CloseTrigger />}
        </ToastRoot>
      )}
    </ChakraToaster>
  </Portal>
)
