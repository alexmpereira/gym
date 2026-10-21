import { ExternalLink, X, Play, Info } from 'lucide-react'
import type { Exercise } from '../types/workout'

interface DemoModalProps {
  exercise: Exercise | null
  onClose: () => void
}

export const DemoModal: React.FC<DemoModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null

  const youtubeUrl = `https://www.youtube.com/results?search_query=${exercise.demoSearchQuery}`

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
              Demonstração do Exercício
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {exercise.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Technical Observation */}
        <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Info className="w-4 h-4" />
            Orientações de Postura & Execução
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {exercise.observation}
          </p>
        </div>

        {/* Prescription details */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-slate-800/50 p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 block mb-1">Volume Previsto</span>
            <span className="text-base font-bold text-white">{exercise.setsText}</span>
          </div>
          <div className="rounded-xl bg-slate-800/50 p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 block mb-1">Alvo de Repetições</span>
            <span className="text-base font-bold text-cyan-400">{exercise.targetReps}</span>
          </div>
        </div>

        {/* Video / GIF External Link CTA */}
        <div className="pt-2">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all text-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Assistir GIF / Vídeo de Execução</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            Abre a busca demonstrativa no YouTube com execução correta
          </p>
        </div>
      </div>
    </div>
  )
}
