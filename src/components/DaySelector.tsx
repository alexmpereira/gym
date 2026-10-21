import { Flame, CheckCircle2 } from 'lucide-react'
import type { WorkoutDay } from '../types/workout'

interface DaySelectorProps {
  days: WorkoutDay[]
  activeDayId: string
  onSelectDay: (dayId: string) => void
  statsByDay: Record<string, { total: number; thisMonth: number }>
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  activeDayId,
  onSelectDay,
  statsByDay,
}) => {
  return (
    <nav aria-label="Seletor de dias de treino" className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
        <span>Fichas de Treino</span>
        <span>Frequência Mensal</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {days.map((day) => {
          const isActive = day.id === activeDayId
          const dayStat = statsByDay[day.id] ?? { total: 0, thisMonth: 0 }

          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={`text-left p-3.5 rounded-2xl border transition-all duration-150 relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700 text-slate-300'
              }`}
            >
              {/* Active accent bar */}
              {isActive && (
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500" />
              )}

              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {day.letter}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Dia {day.letter}
                  </span>
                </div>

                {/* Badge tracker counter */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    dayStat.thisMonth > 0
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                  title={`${dayStat.thisMonth} vezes neste mês, ${dayStat.total} no total histórico`}
                >
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>{dayStat.thisMonth}x mês</span>
                </span>
              </div>

              <div className="text-sm font-semibold text-white tracking-tight line-clamp-1">
                {day.title}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span className="truncate pr-1">{day.focus}</span>
                <span className="shrink-0 flex items-center gap-1 font-mono text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {dayStat.total}x tot
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
