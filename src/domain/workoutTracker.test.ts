import { describe, it, expect } from 'vitest'
import {
  countCompletions,
  toggleExerciseSet,
  calculateProgressPercentage,
  parseTotalSets,
  type WorkoutLog,
  type WorkoutProgress
} from './workoutTracker'

describe('parseTotalSets', () => {
  it('extracts number of sets from standard notation', () => {
    expect(parseTotalSets('4 x 8-10')).toBe(4)
    expect(parseTotalSets('3 x 12-15')).toBe(3)
    expect(parseTotalSets('4 x 10 + 10')).toBe(4)
    expect(parseTotalSets('3 x Máx')).toBe(3)
  })

  it('handles timed or duration notation gracefully', () => {
    expect(parseTotalSets('15 minutos')).toBe(1)
    expect(parseTotalSets('3 x 30s (cada lado)')).toBe(3)
  })

  it('defaults to 1 for invalid or unparseable formats', () => {
    expect(parseTotalSets('')).toBe(1)
  })
})

describe('toggleExerciseSet', () => {
  it('adds set index if not completed yet', () => {
    const initial: number[] = [0]
    const updated = toggleExerciseSet(initial, 1)
    expect(updated).toEqual([0, 1])
  })

  it('removes set index if already completed (toggle off)', () => {
    const initial: number[] = [0, 1, 2]
    const updated = toggleExerciseSet(initial, 1)
    expect(updated).toEqual([0, 2])
  })

  it('maintains sorted order of set indices', () => {
    const initial: number[] = [2]
    const updated = toggleExerciseSet(initial, 0)
    expect(updated).toEqual([0, 2])
  })
})

describe('calculateProgressPercentage', () => {
  const mockExercises = [
    { id: 'ex-1', totalSets: 4 },
    { id: 'ex-2', totalSets: 4 },
  ]

  it('returns 0 when no sets are completed', () => {
    const progress: WorkoutProgress = {}
    expect(calculateProgressPercentage(mockExercises, progress)).toBe(0)
  })

  it('returns correct percentage when partially completed', () => {
    const progress: WorkoutProgress = {
      'ex-1': { completedSets: [0, 1, 2, 3] }, // 4 sets
      'ex-2': { completedSets: [0, 1] }         // 2 sets -> 6/8 = 75%
    }
    expect(calculateProgressPercentage(mockExercises, progress)).toBe(75)
  })

  it('returns 100 when all sets are completed', () => {
    const progress: WorkoutProgress = {
      'ex-1': { completedSets: [0, 1, 2, 3] },
      'ex-2': { completedSets: [0, 1, 2, 3] }
    }
    expect(calculateProgressPercentage(mockExercises, progress)).toBe(100)
  })
})

describe('countCompletions', () => {
  const refDate = new Date('2026-10-21T12:00:00Z')

  const logs: WorkoutLog[] = [
    // Matches: perfil-1, dia-a, this month
    { id: '1', profileId: 'perfil-1', workoutDayId: 'dia-a', completedAt: '2026-10-02T10:00:00Z' },
    { id: '2', profileId: 'perfil-1', workoutDayId: 'dia-a', completedAt: '2026-10-15T18:00:00Z' },
    // Matches: perfil-1, dia-a, previous month
    { id: '3', profileId: 'perfil-1', workoutDayId: 'dia-a', completedAt: '2026-09-20T10:00:00Z' },
    // Different workout day
    { id: '4', profileId: 'perfil-1', workoutDayId: 'dia-b', completedAt: '2026-10-10T10:00:00Z' },
    // Different profile
    { id: '5', profileId: 'perfil-2', workoutDayId: 'dia-a', completedAt: '2026-10-20T10:00:00Z' },
  ]

  it('returns 0 when logs are empty', () => {
    const result = countCompletions([], 'perfil-1', 'dia-a', refDate)
    expect(result).toEqual({ total: 0, thisMonth: 0 })
  })

  it('correctly filters by profileId and workoutDayId, separating monthly and total', () => {
    const result = countCompletions(logs, 'perfil-1', 'dia-a', refDate)
    expect(result).toEqual({ total: 3, thisMonth: 2 })
  })

  it('handles other profiles independently', () => {
    const result = countCompletions(logs, 'perfil-2', 'dia-a', refDate)
    expect(result).toEqual({ total: 1, thisMonth: 1 })
  })
})
