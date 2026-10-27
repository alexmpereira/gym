import { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  CheckCircle,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
} from 'lucide-react'
import { useWorkoutTracker } from './hooks/useWorkoutTracker'
import { Header } from './components/Header'
import { DaySelector } from './components/DaySelector'
import { ExerciseCard } from './components/ExerciseCard'
import { RestTimer } from './components/RestTimer'
import { DemoModal } from './components/DemoModal'
import { HistoryModal } from './components/HistoryModal'
import { EquipmentModal } from './components/EquipmentModal'
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal'
import { ThemeProvider } from './context/ThemeContext'
import { useTheme } from './context/useTheme'
import type { Exercise } from './types/workout'

export default function App() {
  const tracker = useWorkoutTracker()

  return (
    <ThemeProvider activeProfileId={tracker.activeProfileId}>
      <MainApp tracker={tracker} />
    </ThemeProvider>
  )
}

function MainApp({ tracker }: { tracker: ReturnType<typeof useWorkoutTracker> }) {
  const {
    profiles,
    activeProfileId,
    setActiveProfileId,
    currentProfile,
    activeDayId,
    selectDay,
    currentDay,
    dayProgress,
    toggleSet,
    updateLoadKg,
    completeWorkout,
    removeLog,
    resetCurrentProgress,
    stats,
    profileStatsByDay,
    progressPercentage,
    logs,
  } = tracker

  const theme = useTheme()

  // Modal states
  const [selectedDemoExercise, setSelectedDemoExercise] = useState<Exercise | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

  // Timer state
  const [isTimerOpen, setIsTimerOpen] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(
    currentProfile.restTimeSeconds.min
  )

  const handleStartTimer = (seconds: number) => {
    setTimerSeconds(seconds)
    setIsTimerOpen(true)
  }

  const handleCompleteWorkout = () => {
    completeWorkout()

    // Trigger visual confetti celebration with profile-specific colors
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: theme.confettiColors,
      })
    } catch {
      // Ignored if canvas unsupported
    }

    setIsSummaryOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 blur-3xl -z-10 transition-all duration-700 ${
          theme.isRose
            ? 'bg-gradient-to-b from-rose-500/15 via-pink-500/5 to-transparent'
            : 'bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent'
        }`}
      />

      {/* Top Sticky Header */}
      <Header
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelectProfile={setActiveProfileId}
        currentProfile={currentProfile}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenEquipment={() => setIsEquipmentOpen(true)}
        totalLogsCount={logs.filter((l) => l.profileId === activeProfileId).length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 space-y-6">
        {/* Workout Day Navigation (Dia A, Dia B, Dia C) */}
        <DaySelector
          days={currentProfile.days}
          activeDayId={activeDayId}
          onSelectDay={selectDay}
          statsByDay={profileStatsByDay}
        />

        {/* Current Active Day Header & Progress Bar */}
        <section aria-labelledby="current-workout-title" className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-xl ${theme.badge} text-xs font-black transition-colors duration-200`}
                >
                  {currentDay.letter}
                </span>
                <h2 id="current-workout-title" className="text-lg font-bold text-white tracking-tight">
                  Dia {currentDay.letter}: {currentDay.title}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {currentDay.focus} • Descanso sugerido: {currentProfile.restTimeSeconds.min}s a {currentProfile.restTimeSeconds.max}s
              </p>
            </div>

            {/* Reset current session button */}
            {progressPercentage > 0 && (
              <button
                onClick={resetCurrentProgress}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 text-xs font-medium flex items-center gap-1 transition-colors"
                title="Limpar séries marcadas nesta sessão"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
            )}
          </div>

          {/* Session Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Progresso da Ficha</span>
              <span
                className={
                  progressPercentage === 100
                    ? 'text-emerald-400'
                    : `${theme.textAccent} transition-colors duration-200`
                }
              >
                {progressPercentage}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  progressPercentage === 100
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : theme.progressBarGradient
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </section>

        {/* Exercises List */}
        <section aria-label="Lista de exercícios" className="space-y-3.5">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            <span>Exercícios da Ficha ({currentDay.exercises.length})</span>
            <span>Séries & Carga</span>
          </div>

          <div className="space-y-3">
            {currentDay.exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
                progress={dayProgress[exercise.id]}
                onToggleSet={(setIndex) => toggleSet(exercise.id, setIndex)}
                onUpdateLoad={(loadKg) => updateLoadKg(exercise.id, loadKg)}
                onOpenDemo={setSelectedDemoExercise}
                onStartTimer={handleStartTimer}
                recommendedRestSeconds={currentProfile.restTimeSeconds.min}
              />
            ))}
          </div>
        </section>

        {/* Bottom Completion Section & Frequency Counter */}
        <section aria-label="Ações de conclusão" className="pt-2 pb-8 space-y-4">
          <div className="p-4 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center space-y-3">
            {/* Visual Frequency Counters */}
            <div className="flex items-center justify-center gap-6 py-1">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <div className="text-left">
                  <span className="text-xs text-slate-400 block font-medium">Neste mês</span>
                  <span className="text-base font-black text-white font-mono">
                    {stats.thisMonth}x completado
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-800" />

              <div className="flex items-center gap-2">
                <Award className={`w-5 h-5 ${theme.textAccent} transition-colors duration-200`} />
                <div className="text-left">
                  <span className="text-xs text-slate-400 block font-medium">Histórico total</span>
                  <span className="text-base font-black text-white font-mono">
                    {stats.total}x registrado
                  </span>
                </div>
              </div>
            </div>

            {/* Complete Workout Button */}
            <button
              onClick={handleCompleteWorkout}
              className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl active:scale-[0.98] ${
                progressPercentage === 100
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  : theme.btnPrimaryGradient
              }`}
            >
              {progressPercentage === 100 ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Finalizar Treino de Hoje (100% Feito!)</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Completar Treino (Dia {currentDay.letter})</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500">
              Registra a conclusão no histórico local do seu aparelho
            </p>
          </div>
        </section>
      </main>

      {/* Floating Rest Timer */}
      <RestTimer
        initialSeconds={timerSeconds}
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* Exercise Demonstration Modal */}
      <DemoModal
        exercise={selectedDemoExercise}
        onClose={() => setSelectedDemoExercise(null)}
      />

      {/* Training History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        logs={logs}
        activeProfileId={activeProfileId}
        onDeleteLog={removeLog}
      />

      {/* Available Gym Equipment Modal */}
      <EquipmentModal
        isOpen={isEquipmentOpen}
        onClose={() => setIsEquipmentOpen(false)}
      />

      {/* Workout Completion Summary Modal */}
      <WorkoutSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        profile={currentProfile}
        workoutDay={currentDay}
        stats={stats}
      />
    </div>
  )
}
