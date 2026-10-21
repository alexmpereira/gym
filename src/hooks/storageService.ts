import type { UserProfileId, WorkoutLog, WorkoutProgress } from '../types/workout'

const STORAGE_KEYS = {
  ACTIVE_PROFILE: 'gym_active_profile',
  WORKOUT_LOGS: 'gym_workout_logs',
  DAY_PROGRESS_PREFIX: 'gym_progress_',
} as const

function getStorage(): Storage | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage
  }
  if (typeof globalThis !== 'undefined' && (globalThis as unknown as { localStorage?: Storage }).localStorage) {
    return (globalThis as unknown as { localStorage: Storage }).localStorage
  }
  return null
}

function safeGetItem<T>(key: string, fallback: T): T {
  const storage = getStorage()
  if (!storage) return fallback

  try {
    const raw = storage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function safeSetItem<T>(key: string, value: T): void {
  const storage = getStorage()
  if (!storage) return

  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Graceful silent fallback if quota exceeded
  }
}

export function loadStoredProfileId(): UserProfileId {
  const storage = getStorage()
  if (!storage) return 'perfil-1'

  const raw = storage.getItem(STORAGE_KEYS.ACTIVE_PROFILE)
  if (raw === 'perfil-1' || raw === 'perfil-2') {
    return raw
  }
  return 'perfil-1'
}

export function saveStoredProfileId(profileId: UserProfileId): void {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, profileId)
}

export function loadWorkoutLogs(): WorkoutLog[] {
  return safeGetItem<WorkoutLog[]>(STORAGE_KEYS.WORKOUT_LOGS, [])
}

export function saveWorkoutLogs(logs: WorkoutLog[]): void {
  safeSetItem(STORAGE_KEYS.WORKOUT_LOGS, logs)
}

export function appendWorkoutLog(profileId: UserProfileId, workoutDayId: string): WorkoutLog {
  const currentLogs = loadWorkoutLogs()
  const newLog: WorkoutLog = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    profileId,
    workoutDayId,
    completedAt: new Date().toISOString(),
  }

  saveWorkoutLogs([newLog, ...currentLogs])
  return newLog
}

export function deleteWorkoutLog(logId: string): void {
  const currentLogs = loadWorkoutLogs()
  const filtered = currentLogs.filter((log) => log.id !== logId)
  saveWorkoutLogs(filtered)
}

function getProgressKey(profileId: UserProfileId, workoutDayId: string): string {
  return `${STORAGE_KEYS.DAY_PROGRESS_PREFIX}${profileId}_${workoutDayId}`
}

export function loadDayProgress(
  profileId: UserProfileId,
  workoutDayId: string
): WorkoutProgress {
  const key = getProgressKey(profileId, workoutDayId)
  return safeGetItem<WorkoutProgress>(key, {})
}

export function saveDayProgress(
  profileId: UserProfileId,
  workoutDayId: string,
  progress: WorkoutProgress
): void {
  const key = getProgressKey(profileId, workoutDayId)
  safeSetItem(key, progress)
}

export function clearDayProgress(
  profileId: UserProfileId,
  workoutDayId: string
): void {
  const storage = getStorage()
  if (!storage) return
  const key = getProgressKey(profileId, workoutDayId)
  storage.removeItem(key)
}
