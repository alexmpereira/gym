import { describe, it, expect } from 'vitest'
import { profiles, equipmentList } from './workouts'

describe('workouts data integrity', () => {
  it('defines exactly two profiles matching the specification', () => {
    expect(profiles).toHaveLength(2)
    const profileIds = profiles.map((p) => p.id)
    expect(profileIds).toContain('perfil-1')
    expect(profileIds).toContain('perfil-2')
  })

  it('Perfil 1 has 3 days (Dia A, Dia B, Dia C) with 5 exercises each', () => {
    const p1 = profiles.find((p) => p.id === 'perfil-1')!
    expect(p1.days).toHaveLength(3)
    expect(p1.days.map((d) => d.letter)).toEqual(['A', 'B', 'C'])

    for (const day of p1.days) {
      expect(day.exercises).toHaveLength(5)
      for (const ex of day.exercises) {
        expect(ex.totalSets).toBeGreaterThanOrEqual(1)
        expect(ex.name.length).toBeGreaterThan(0)
        expect(ex.observation.length).toBeGreaterThan(0)
      }
    }

    const diaA = p1.days.find((d) => d.letter === 'A')!
    const ex2 = diaA.exercises.find((e) => e.id === 'p1-a2')!
    expect(ex2.name).toBe('Crucifixo com Halteres (Reto ou Inclinado)')
    expect(ex2.setsText).toBe('4 x 10-12')
    expect(ex2.totalSets).toBe(4)
    expect(ex2.demoSearchQuery).toBe('gif+crucifixo+com+halteres')
  })

  it('Perfil 2 has 3 days (Dia A, Dia B, Dia C) with 5 exercises each', () => {
    const p2 = profiles.find((p) => p.id === 'perfil-2')!
    expect(p2.days).toHaveLength(3)
    expect(p2.days.map((d) => d.letter)).toEqual(['A', 'B', 'C'])

    for (const day of p2.days) {
      expect(day.exercises).toHaveLength(5)
      for (const ex of day.exercises) {
        expect(ex.totalSets).toBeGreaterThanOrEqual(1)
        expect(ex.name.length).toBeGreaterThan(0)
      }
    }
  })

  it('includes identified gym equipment list', () => {
    expect(equipmentList.length).toBeGreaterThan(5)
  })
})
