import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ThemeProvider } from './ThemeContext'
import { useTheme } from './useTheme'

function TestComponent({ onTheme }: { onTheme: (t: ReturnType<typeof useTheme>) => void }) {
  const theme = useTheme()
  onTheme(theme)
  return <div>{theme.isRose ? 'rose' : 'cyan'}</div>
}

describe('ThemeContext', () => {
  it('provides cyan/blue theme when Aluno 1 (perfil-1) is active', () => {
    let capturedTheme: ReturnType<typeof useTheme> | null = null
    renderToStaticMarkup(
      <ThemeProvider activeProfileId="perfil-1">
        <TestComponent onTheme={(t) => { capturedTheme = t }} />
      </ThemeProvider>
    )

    expect(capturedTheme).not.toBeNull()
    expect(capturedTheme!.isRose).toBe(false)
    expect(capturedTheme!.activeProfileId).toBe('perfil-1')
    expect(capturedTheme!.badge).toContain('cyan')
    expect(capturedTheme!.textAccent).toContain('text-cyan-400')
    expect(capturedTheme!.btnPrimaryGradient).toContain('from-cyan-500')
    expect(capturedTheme!.dayCardActive).toContain('border-cyan-500')
  })

  it('provides rose/pink theme when Aluna 2 (perfil-2) is active', () => {
    let capturedTheme: ReturnType<typeof useTheme> | null = null
    renderToStaticMarkup(
      <ThemeProvider activeProfileId="perfil-2">
        <TestComponent onTheme={(t) => { capturedTheme = t }} />
      </ThemeProvider>
    )

    expect(capturedTheme).not.toBeNull()
    expect(capturedTheme!.isRose).toBe(true)
    expect(capturedTheme!.activeProfileId).toBe('perfil-2')
    expect(capturedTheme!.badge).toContain('rose')
    expect(capturedTheme!.textAccent).toContain('text-rose-400')
    expect(capturedTheme!.btnPrimaryGradient).toContain('from-rose-500')
    expect(capturedTheme!.dayCardActive).toContain('border-rose-500')
    expect(capturedTheme!.confettiColors).toContain('#f43f5e')
  })
})
