'use client'
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import * as React from 'react'
import { ColorModeIcon } from './color-mode-icons'
import { useColorMode } from './color-mode-hooks'

export function ColorModeProvider(props) {
  return <ThemeProvider attribute='class' disableTransitionOnChange {...props} />
}

export const ColorModeButton = React.forwardRef(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize='8' />}>
      <IconButton
        onClick={toggleColorMode}
        variant='ghost'
        aria-label='Toggle color mode'
        size='sm'
        ref={ref}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  )
})

export const LightMode = React.forwardRef((props, ref) => (
  <Span
    color='fg'
    display='contents'
    className='chakra-theme light'
    colorPalette='gray'
    colorScheme='light'
    ref={ref}
    {...props}
  />
))

export const DarkMode = React.forwardRef((props, ref) => (
  <Span
    color='fg'
    display='contents'
    className='chakra-theme dark'
    colorPalette='gray'
    colorScheme='dark'
    ref={ref}
    {...props}
  />
))
