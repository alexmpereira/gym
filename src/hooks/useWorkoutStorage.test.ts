import '../test/setupStorage'
import { describe, it, expect, beforeEach } from 'vitest'
import {
  loadStoredProfileId,
  saveStoredProfileId,
  loadWorkoutLogs,
  saveWorkoutLogs,
  appendWorkoutLog,
  deleteWorkoutLog,
  loadDayProgress,
  saveDayProgress,
  clearDayProgress,
} from './storageService'
import type { WorkoutLog, WorkoutProgress } from '../types/workout'

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('profileId storage', () => {
    it('returns "perfil-1" as default when nothing is stored', () => {
      expect(loadStoredProfileId()).toBe('perfil-1')
    })

    it('saves and retrieves selected profile', () => {
      saveStoredProfileId('perfil-2')
      expect(loadStoredProfileId()).toBe('perfil-2')
    })

    it('falls back to default if corrupted value is stored', () => {
      localStorage.setItem('gym_active_profile', 'invalid-profile')
      expect(loadStoredProfileId()).toBe('perfil-1')
    })
  })

  describe('workout logs storage', () => {
    it('returns empty array when no logs exist', () => {
      expect(loadWorkoutLogs()).toEqual([])
    })

    it('saves and loads workout logs correctly', () => {
      const logs: WorkoutLog[] = [
        {
          id: 'log-1',
          profileId: 'perfil-1',
          workoutDayId: 'dia-a',
          completedAt: '2026-10-21T10:00:00.000Z',
        },
      ]
      saveWorkoutLogs(logs)
      expect(loadWorkoutLogs()).toEqual(logs)
    })

    it('appends a new workout log', () => {
      const newLog = appendWorkoutLog('perfil-1', 'dia-b')
      expect(newLog.profileId).toBe('perfil-1')
      expect(newLog.workoutDayId).toBe('dia-b')
      expect(newLog.id).toBeDefined()

      const loaded = loadWorkoutLogs()
      expect(loaded).toHaveLength(1)
      expect(loaded[0].id).toBe(newLog.id)
    })

    it('deletes an existing workout log by id', () => {
      const log1 = appendWorkoutLog('perfil-1', 'dia-a')
      const log2 = appendWorkoutLog('perfil-1', 'dia-b')

      deleteWorkoutLog(log1.id)
      const current = loadWorkoutLogs()
      expect(current).toHaveLength(1)
      expect(current[0].id).toBe(log2.id)
    })
  })

  describe('day progress storage', () => {
    it('loads empty progress when nothing is saved', () => {
      expect(loadDayProgress('perfil-1', 'dia-a')).toEqual({})
    })

    it('saves and clears day progress', () => {
      const progress: WorkoutProgress = {
        'p1-a1': { completedSets: [0, 1], loadKg: 60 },
      }
      saveDayProgress('perfil-1', 'dia-a', progress)
      expect(loadDayProgress('perfil-1', 'dia-a')).toEqual(progress)

      clearDayProgress('perfil-1', 'dia-a')
      expect(loadDayProgress('perfil-1', 'dia-a')).toEqual({})
    })
  })
})
