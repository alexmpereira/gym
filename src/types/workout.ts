export type UserProfileId = 'perfil-1' | 'perfil-2'

export interface Exercise {
  id: string
  name: string
  setsText: string
  totalSets: number
  targetReps: string
  observation: string
  demoBadgeText: string
  demoSearchQuery: string
  isBiSet?: boolean
}

export interface WorkoutDay {
  id: string // e.g. 'dia-a', 'dia-b', 'dia-c'
  letter: 'A' | 'B' | 'C'
  title: string
  focus: string
  exercises: Exercise[]
}

export interface Profile {
  id: UserProfileId
  name: string
  avatar: string
  focus: string
  goal: string
  frequency: string
  split: string
  restTimeSeconds: {
    min: number
    max: number
  }
  days: WorkoutDay[]
}

export interface WorkoutLog {
  id: string
  profileId: UserProfileId
  workoutDayId: string
  completedAt: string // ISO string
}

export interface ExerciseProgress {
  completedSets: number[] // e.g. [0, 1]
  loadKg?: number
}

export type WorkoutProgress = Record<string, ExerciseProgress>
