import { X, Calendar, Trash2, Award } from 'lucide-react'
import type { WorkoutLog, UserProfileId } from '../types/workout'
import { profiles } from '../data/workouts'
import { useTheme } from '../context/useTheme'

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
  logs: WorkoutLog[]
  activeProfileId: UserProfileId
  onDeleteLog: (logId: string) => void
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  logs,
  activeProfileId,
  onDeleteLog,
}) => {
  const theme = useTheme()
  if (!isOpen) return null

  const profile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0]
  const profileLogs = logs.filter((l) => l.profileId === activeProfileId)

  const formatLogDate = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoString
    }
  }

  const getDayInfo = (dayId: string) => {
    const day = profile.days.find((d) => d.id === dayId)
    return {
      letter: day?.letter ?? '?',
      title: day?.title ?? 'Treino Concluído',
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Histórico de Treinos
              </h3>
              <p className="text-xs text-slate-400">
                {profile.name} • {profileLogs.length} sessões registradas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar histórico"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {profileLogs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Calendar className="w-10 h-10 mx-auto text-slate-600 opacity-60" />
              <p className="text-sm font-medium">Nenhum treino concluído ainda.</p>
              <p className="text-xs text-slate-500">
                Ao finalizar sua primeira ficha, ela aparecerá aqui!
              </p>
            </div>
          ) : (
            profileLogs.map((log) => {
              const dayInfo = getDayInfo(log.workoutDayId)
              return (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-xl ${theme.badge} text-xs font-bold shrink-0 transition-colors duration-200`}
                    >
                      {dayInfo.letter}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">
                        Dia {dayInfo.letter}: {dayInfo.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{formatLogDate(log.completedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteLog(log.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Excluir este registro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
