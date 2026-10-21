import { Trophy, Flame, Calendar, ArrowRight } from 'lucide-react'
import type { WorkoutDay, Profile } from '../types/workout'

interface WorkoutSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  profile: Profile
  workoutDay: WorkoutDay
  stats: { total: number; thisMonth: number }
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  isOpen,
  onClose,
  profile,
  workoutDay,
  stats,
}) => {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Big Trophy Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/25">
          <Trophy className="w-8 h-8 stroke-[2.2]" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            Treino Concluído! 💪
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Parabéns, {profile.name}!
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Dia {workoutDay.letter}: {workoutDay.title} finalizado com sucesso.
          </p>
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Neste Mês</span>
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {stats.thisMonth}x
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Total Histórico</span>
            </div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {stats.total}x
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <span>Concluir e Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
