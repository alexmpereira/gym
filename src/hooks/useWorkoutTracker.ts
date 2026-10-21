import { useState, useCallback, useMemo } from 'react'
import type { UserProfileId, WorkoutProgress } from '../types/workout'
import { profiles } from '../data/workouts'
import {
  loadStoredProfileId,
  saveStoredProfileId,
  loadWorkoutLogs,
  appendWorkoutLog,
  deleteWorkoutLog,
  loadDayProgress,
  saveDayProgress,
  clearDayProgress,
} from './storageService'
import {
  countCompletions,
  toggleExerciseSet,
  calculateProgressPercentage,
} from '../domain/workoutTracker'

export function useWorkoutTracker() {
  const [activeProfileId, setActiveProfileIdState] = useState<UserProfileId>(() =>
    loadStoredProfileId()
  )

  const [activeDayId, setActiveDayId] = useState<string>('dia-a')
  const [logs, setLogs] = useState(() => loadWorkoutLogs())

  const currentProfile = useMemo(() => {
    return profiles.find((p) => p.id === activeProfileId) ?? profiles[0]
  }, [activeProfileId])

  const currentDay = useMemo(() => {
    return (
      currentProfile.days.find((d) => d.id === activeDayId) ??
      currentProfile.days[0]
    )
  }, [currentProfile, activeDayId])

  const [dayProgress, setDayProgress] = useState<WorkoutProgress>(() =>
    loadDayProgress(activeProfileId, activeDayId)
  )

  const setActiveProfileId = useCallback((id: UserProfileId) => {
    setActiveProfileIdState(id)
    saveStoredProfileId(id)
    setActiveDayId('dia-a')
    setDayProgress(loadDayProgress(id, 'dia-a'))
  }, [])

  const selectDay = useCallback(
    (dayId: string) => {
      setActiveDayId(dayId)
      setDayProgress(loadDayProgress(activeProfileId, dayId))
    },
    [activeProfileId]
  )

  const toggleSet = useCallback(
    (exerciseId: string, setIndex: number) => {
      setDayProgress((prev) => {
        const currentSets = prev[exerciseId]?.completedSets ?? []
        const updatedSets = toggleExerciseSet(currentSets, setIndex)

        const next: WorkoutProgress = {
          ...prev,
          [exerciseId]: {
            ...prev[exerciseId],
            completedSets: updatedSets,
          },
        }

        saveDayProgress(activeProfileId, activeDayId, next)
        return next
      })
    },
    [activeProfileId, activeDayId]
  )

  const updateLoadKg = useCallback(
    (exerciseId: string, loadKg: number | undefined) => {
      setDayProgress((prev) => {
        const next: WorkoutProgress = {
          ...prev,
          [exerciseId]: {
            completedSets: prev[exerciseId]?.completedSets ?? [],
            loadKg,
          },
        }

        saveDayProgress(activeProfileId, activeDayId, next)
        return next
      })
    },
    [activeProfileId, activeDayId]
  )

  const completeWorkout = useCallback(() => {
    const newLog = appendWorkoutLog(activeProfileId, activeDayId)
    setLogs((prev) => [newLog, ...prev])
    clearDayProgress(activeProfileId, activeDayId)
    setDayProgress({})
    return newLog
  }, [activeProfileId, activeDayId])

  const removeLog = useCallback((logId: string) => {
    deleteWorkoutLog(logId)
    setLogs((prev) => prev.filter((l) => l.id !== logId))
  }, [])

  const resetCurrentProgress = useCallback(() => {
    clearDayProgress(activeProfileId, activeDayId)
    setDayProgress({})
  }, [activeProfileId, activeDayId])

  const stats = useMemo(() => {
    return countCompletions(logs, activeProfileId, activeDayId)
  }, [logs, activeProfileId, activeDayId])

  const progressPercentage = useMemo(() => {
    return calculateProgressPercentage(currentDay.exercises, dayProgress)
  }, [currentDay.exercises, dayProgress])

  const profileStatsByDay = useMemo(() => {
    const result: Record<string, { total: number; thisMonth: number }> = {}
    for (const day of currentProfile.days) {
      result[day.id] = countCompletions(logs, activeProfileId, day.id)
    }
    return result
  }, [logs, activeProfileId, currentProfile.days])

  return {
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
  }
}
