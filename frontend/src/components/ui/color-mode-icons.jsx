'use client'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useColorMode } from './color-mode-hooks'

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}
