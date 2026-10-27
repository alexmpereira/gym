import { useState, type ChangeEvent } from 'react'
import { Check, Video, ChevronDown, ChevronUp, Sparkles, Timer } from 'lucide-react'
import type { Exercise, ExerciseProgress } from '../types/workout'
import { useTheme } from '../context/useTheme'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  progress: ExerciseProgress | undefined
  onToggleSet: (setIndex: number) => void
  onUpdateLoad: (loadKg: number | undefined) => void
  onOpenDemo: (exercise: Exercise) => void
  onStartTimer: (seconds: number) => void
  recommendedRestSeconds: number
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  progress,
  onToggleSet,
  onUpdateLoad,
  onOpenDemo,
  onStartTimer,
  recommendedRestSeconds,
}) => {
  const theme = useTheme()

  const [isExpanded, setIsExpanded] = useState(false)
  const completedSets = progress?.completedSets ?? []
  const currentLoad = progress?.loadKg ?? ''
  const isAllSetsCompleted =
    exercise.totalSets > 0 && completedSets.length >= exercise.totalSets

  const handleLoadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    if (val === '') {
      onUpdateLoad(undefined)
      return
    }
    const num = parseFloat(val)
    if (!isNaN(num) && num >= 0) {
      onUpdateLoad(num)
    }
  }

  return (
    <article
      className={`rounded-2xl transition-all duration-200 border ${
        isAllSetsCompleted
          ? 'bg-slate-900/60 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
          : 'bg-slate-900/90 border-slate-800 shadow-md'
      }`}
    >
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Top line: Exercise Number, Name, Bi-set badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 ${
                isAllSetsCompleted
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {isAllSetsCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : index + 1}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-semibold text-white tracking-tight">
                  {exercise.name}
                </h4>
                {exercise.isBiSet && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Sparkles className="w-3 h-3" />
                    Bi-Set
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-medium">
                <span className={`${theme.textAccent} font-bold transition-colors duration-200`}>
                  {exercise.setsText}
                </span>
                <span>•</span>
                <span>{exercise.targetReps}</span>
              </div>
            </div>
          </div>

          {/* Action buttons: Demo & Expand */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onOpenDemo(exercise)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 ${theme.textAccent} ${theme.textAccentHover} text-xs font-medium transition-colors border border-slate-700/60`}
              title="Ver demonstração em GIF"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Demonstração</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Observation callout (Always visible summary or expanded) */}
        <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 rounded-xl px-3 py-2 border border-slate-800/60">
          <strong className="text-slate-300 font-medium">Obs:</strong> {exercise.observation}
        </p>

        {/* Series Tracker Bubbles & Carga */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80">
          {/* Series Bubbles */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5 uppercase tracking-wider font-semibold">
              Marcar Séries ({completedSets.length}/{exercise.totalSets})
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {Array.from({ length: exercise.totalSets }).map((_, setIdx) => {
                const isCompleted = completedSets.includes(setIdx)
                return (
                  <button
                    key={setIdx}
                    onClick={() => onToggleSet(setIdx)}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/50'
                    }`}
                    title={`Marcar série ${setIdx + 1}`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : setIdx + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick Carga & Rest trigger */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            {/* Weight Input */}
            <div
              className={`flex items-center bg-slate-950/60 border border-slate-800 rounded-xl px-2.5 py-1.5 ${theme.focusWithinBorder} transition-colors`}
            >
              <input
                type="number"
                step="0.5"
                placeholder="Carga"
                value={currentLoad}
                onChange={handleLoadChange}
                className="w-14 bg-transparent text-white text-xs font-semibold focus:outline-none placeholder:text-slate-500 text-right pr-1"
              />
              <span className="text-[11px] text-slate-400 font-medium">kg</span>
            </div>

            {/* Quick Timer Button */}
            <button
              onClick={() => onStartTimer(recommendedRestSeconds)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 ${theme.quickTimerHover} text-slate-300 border border-slate-700/50 text-xs font-medium transition-colors`}
              title={`Iniciar descanso de ${recommendedRestSeconds}s`}
            >
              <Timer className={`w-3.5 h-3.5 ${theme.textAccent}`} />
              <span>{recommendedRestSeconds}s</span>
            </button>
          </div>
        </div>

        {/* Expandable details if needed */}
        {isExpanded && (
          <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400 space-y-1 animate-in fade-in duration-150">
            <div className="flex justify-between py-1">
              <span>Cadência recomendada:</span>
              <span className="text-slate-200">2s excêntrica / 1s concêntrica</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Descanso alvo:</span>
              <span className="text-slate-200">{recommendedRestSeconds} segundos</span>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
