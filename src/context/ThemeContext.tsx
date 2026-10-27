import { useMemo, type ReactNode } from 'react'
import type { UserProfileId } from '../types/workout'
import { ThemeContext, type ThemeStyles } from './themeState'

export function ThemeProvider({
  activeProfileId,
  children,
}: {
  activeProfileId: UserProfileId
  children: ReactNode
}) {
  const value = useMemo<ThemeStyles>(() => {
    const isRose = activeProfileId === 'perfil-2'
    if (isRose) {
      return {
        isRose: true,
        activeProfileId,
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        badgeSelected: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        textAccent: 'text-rose-400',
        textAccentHover: 'hover:text-rose-300',
        borderAccent: 'border-rose-500',
        ringAccent: 'ring-rose-500/50',
        dayCardActive:
          'bg-slate-900 border-rose-500 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/50',
        dayBarGradient: 'bg-gradient-to-b from-rose-400 to-pink-500',
        progressBarGradient: 'bg-gradient-to-r from-rose-500 to-pink-500',
        btnPrimaryGradient:
          'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-400 hover:to-pink-500 shadow-rose-500/20',
        logoGradient:
          'bg-gradient-to-tr from-rose-500 to-pink-600 shadow-rose-500/20',
        timerBg: 'bg-rose-500 text-slate-950 hover:bg-rose-400',
        timerProgress: 'bg-rose-400',
        quickTimerHover:
          'hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400',
        focusWithinBorder: 'focus-within:border-rose-500',
        confettiColors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#10b981'],
      }
    }

    return {
      isRose: false,
      activeProfileId,
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
      logoGradient:
        'bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-cyan-500/20',
      timerBg: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
      timerProgress: 'bg-cyan-400',
      quickTimerHover:
        'hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400',
      focusWithinBorder: 'focus-within:border-cyan-500',
      confettiColors: ['#06b6d4', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
    }
  }, [activeProfileId])

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={value.isRose ? 'rose' : 'cyan'} className="contents">
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
