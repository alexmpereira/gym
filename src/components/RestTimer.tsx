import { useEffect, useState, useRef } from 'react'
import { Play, Pause, RotateCcw, Plus, X, Bell } from 'lucide-react'
import { useTheme } from '../context/useTheme'

interface RestTimerProps {
  initialSeconds: number
  isOpen: boolean
  onClose: () => void
}

export function RestTimer({ initialSeconds, isOpen, onClose }: RestTimerProps) {
  if (!isOpen) return null

  return (
    <RestTimerActive
      key={initialSeconds}
      initialSeconds={initialSeconds}
      onClose={onClose}
    />
  )
}

function RestTimerActive({
  initialSeconds,
  onClose,
}: {
  initialSeconds: number
  onClose: () => void
}) {
  const theme = useTheme()

  const [totalSeconds, setTotalSeconds] = useState(initialSeconds)
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          setIsFinished(true)
          if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            try {
              navigator.vibrate([150, 75, 150, 75, 200])
            } catch {
              // Ignore if vibration not supported
            }
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning])

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`

  const progressPercent =
    totalSeconds > 0
      ? Math.max(0, Math.min(100, ((totalSeconds - remainingSeconds) / totalSeconds) * 100))
      : 0

  const addTime = (secs: number) => {
    setTotalSeconds((prev) => prev + secs)
    setRemainingSeconds((prev) => prev + secs)
    setIsFinished(false)
    setIsRunning(true)
  }

  const resetTimer = () => {
    setRemainingSeconds(totalSeconds)
    setIsRunning(true)
    setIsFinished(false)
  }

  return (
    <aside
      aria-label="Cronômetro de descanso"
      className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 animate-in slide-in-from-bottom-5 duration-200"
    >
      <div
        className={`rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all ${
          isFinished
            ? 'bg-emerald-950/90 border-emerald-500 text-white animate-pulse'
            : 'bg-slate-900/95 border-slate-700/80 text-white'
        }`}
      >
        {/* Progress bar line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 rounded-t-2xl overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isFinished ? 'bg-emerald-400' : theme.timerProgress
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Timer Display */}
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl transition-colors duration-200 ${
                isFinished ? 'bg-emerald-500/20 text-emerald-400' : theme.badge
              }`}
            >
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase block">
                {isFinished ? 'Descanso Concluído!' : 'Tempo de Descanso'}
              </span>
              <span className="text-2xl font-mono font-bold tracking-tight">
                {formattedTime}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => addTime(30)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-0.5"
              title="Adicionar 30 segundos"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>30s</span>
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2.5 rounded-xl font-bold transition-all active:scale-95 ${
                isRunning ? 'bg-amber-500 text-slate-950' : theme.timerBg
              }`}
              title={isRunning ? 'Pausar' : 'Continuar'}
            >
              {isRunning ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>

            <button
              onClick={resetTimer}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
              title="Fechar cronômetro"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
