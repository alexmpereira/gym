import { Dumbbell, History, Layers } from 'lucide-react'
import type { Profile, UserProfileId } from '../types/workout'
import { useTheme } from '../context/useTheme'

interface HeaderProps {
  profiles: Profile[]
  activeProfileId: UserProfileId
  onSelectProfile: (id: UserProfileId) => void
  currentProfile: Profile
  onOpenHistory: () => void
  onOpenEquipment: () => void
  totalLogsCount: number
}

export const Header: React.FC<HeaderProps> = ({
  profiles,
  activeProfileId,
  onSelectProfile,
  currentProfile,
  onOpenHistory,
  onOpenEquipment,
  totalLogsCount,
}) => {
  const theme = useTheme()

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 pt-safe">
      <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl ${theme.logoGradient} flex items-center justify-center text-white shadow-md transition-all duration-300`}
            >
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5 leading-none">
                Gym Tracker
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${theme.badge} font-semibold transition-colors duration-300`}
                >
                  PWA
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {currentProfile.frequency} • {currentProfile.split}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenEquipment}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Equipamentos disponíveis"
            >
              <Layers className={`w-4 h-4 ${theme.textAccent} transition-colors duration-300`} />
              <span className="hidden sm:inline">Aparelhos</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors relative"
              title="Histórico de Treinos"
            >
              <History className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Histórico</span>
              {totalLogsCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                  {totalLogsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* User Profile Selector (Segmented Toggle) */}
        <div className="bg-slate-900/90 p-1 rounded-2xl border border-slate-800/80 grid grid-cols-2 gap-1">
          {profiles.map((p) => {
            const isSelected = p.id === activeProfileId
            const isProfileRose = p.id === 'perfil-2'
            return (
              <button
                key={p.id}
                onClick={() => onSelectProfile(p.id)}
                className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? isProfileRose
                      ? 'bg-slate-800 text-white shadow-md border border-rose-500/40 ring-1 ring-rose-500/20'
                      : 'bg-slate-800 text-white shadow-md border border-cyan-500/40 ring-1 ring-cyan-500/20'
                    : isProfileRose
                      ? 'text-slate-400 hover:text-rose-200 hover:bg-slate-800/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className="text-xl shrink-0">{p.avatar}</span>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold truncate">{p.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold transition-colors duration-300 ${
                        isSelected
                          ? isProfileRose
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p.focus.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {p.goal}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
