import { describe, expect, it } from 'vitest'
import { formatRating, formatRuntime } from './formatters.js'

describe('formatRuntime', () => {
  it('formats hours and minutes', () => {
    expect(formatRuntime(148)).toBe('2h 28m')
  })

  it('formats whole hours with no remainder', () => {
    expect(formatRuntime(120)).toBe('2h')
  })

  it('formats sub-hour runtimes as minutes only', () => {
    expect(formatRuntime(45)).toBe('45m')
  })

  it('returns null for missing or invalid runtime', () => {
    expect(formatRuntime(null)).toBeNull()
    expect(formatRuntime(undefined)).toBeNull()
    expect(formatRuntime(0)).toBeNull()
    expect(formatRuntime(-10)).toBeNull()
    expect(formatRuntime(NaN)).toBeNull()
  })
})

describe('formatRating', () => {
  it('formats a rating to one decimal place', () => {
    expect(formatRating(8.4)).toBe('8.4')
    expect(formatRating(8)).toBe('8.0')
  })

  it('returns null for missing rating', () => {
    expect(formatRating(null)).toBeNull()
    expect(formatRating(undefined)).toBeNull()
    expect(formatRating(NaN)).toBeNull()
  })
})
