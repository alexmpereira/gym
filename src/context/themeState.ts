import { createContext } from 'react'
import type { UserProfileId } from '../types/workout'

export interface ThemeStyles {
  isRose: boolean
  activeProfileId: UserProfileId
  badge: string
  badgeSelected: string
  textAccent: string
  textAccentHover: string
  borderAccent: string
  ringAccent: string
  dayCardActive: string
  dayBarGradient: string
  progressBarGradient: string
  btnPrimaryGradient: string
  logoGradient: string
  timerBg: string
  timerProgress: string
  quickTimerHover: string
  focusWithinBorder: string
  confettiColors: string[]
}

export const ThemeContext = createContext<ThemeStyles>({
  isRose: false,
  activeProfileId: 'perfil-1',
  badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  badgeSelected: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  textAccent: 'text-cyan-400',
  textAccentHover: 'hover:text-cyan-300',
  borderAccent: 'border-cyan-500',
  ringAccent: 'ring-cyan-500/50',
  dayCardActive:
    'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50',
  dayBarGradient: 'bg-gradient-to-b from-cyan-400 to-blue-500',
  progressBarGradient: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  btnPrimaryGradient:
    'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20',
  logoGradient: 'bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-cyan-500/20',
  timerBg: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
  timerProgress: 'bg-cyan-400',
  quickTimerHover:
    'hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400',
  focusWithinBorder: 'focus-within:border-cyan-500',
  confettiColors: ['#06b6d4', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
})
