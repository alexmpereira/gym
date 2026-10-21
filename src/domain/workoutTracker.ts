import type { UserProfileId, WorkoutLog, WorkoutProgress } from '../types/workout'

export type { WorkoutLog, WorkoutProgress }

/**
 * Extracts the number of sets from workout notation strings like "4 x 8-10", "3 x Máx", "15 minutos".
 */
export function parseTotalSets(setsText: string): number {
  if (!setsText) return 1

  const match = setsText.match(/^(\d+)\s*x/i)
  if (match) {
    return parseInt(match[1], 10)
  }

  return 1
}

/**
 * Toggles completion of a specific set index (0-indexed).
 * Maintains a sorted list of unique completed set indices.
 */
export function toggleExerciseSet(currentSets: number[], setIndex: number): number[] {
  if (currentSets.includes(setIndex)) {
    return currentSets.filter((idx) => idx !== setIndex)
  }

  return [...currentSets, setIndex].sort((a, b) => a - b)
}

/**
 * Computes overall completion percentage of the workout session based on completed sets.
 */
export function calculateProgressPercentage(
  exercises: Array<{ id: string; totalSets: number }>,
  progress: WorkoutProgress
): number {
  const totalSetsCount = exercises.reduce((acc, ex) => acc + ex.totalSets, 0)
  if (totalSetsCount === 0) return 0

  const completedSetsCount = exercises.reduce((acc, ex) => {
    const sets = progress[ex.id]?.completedSets ?? []
    return acc + sets.length
  }, 0)

  return Math.min(100, Math.round((completedSetsCount / totalSetsCount) * 100))
}

/**
 * Counts total and current-month completions for a given profile and workout day.
 */
export function countCompletions(
  logs: WorkoutLog[],
  profileId: UserProfileId,
  workoutDayId: string,
  referenceDate: Date = new Date()
): { total: number; thisMonth: number } {
  const targetYear = referenceDate.getUTCFullYear()
  const targetMonth = referenceDate.getUTCMonth()

  let total = 0
  let thisMonth = 0

  for (const log of logs) {
    if (log.profileId !== profileId || log.workoutDayId !== workoutDayId) {
      continue
    }

    total += 1

    const logDate = new Date(log.completedAt)
    const isSameMonth =
      logDate.getUTCFullYear() === targetYear && logDate.getUTCMonth() === targetMonth

    if (isSameMonth) {
      thisMonth += 1
    }
  }

  return { total, thisMonth }
}
