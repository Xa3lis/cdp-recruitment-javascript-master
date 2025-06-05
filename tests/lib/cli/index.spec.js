import { describe, it, expect, vi } from 'vitest'
import { data } from '~mocks/data.js'
import { getCliArgs } from '~/lib/index.js'

describe('cli', () => {
  describe('getCliArgs', () => {
    it('should return an empty object when no arguments are provided', () => {
      expect(getCliArgs([])).toEqual({})
    })

    it('should parse arguments with values', () => {
      const args = ['--filter=test', '--count']
      expect(getCliArgs(args)).toEqual({
        filter: 'test',
        count: true
      })
    })

    it('should only parse valid formatted arguments with values', () => {
      const args = [
        '--filter=test',
        '--count',
        'wrongFormat',
        '-countWrongFormat'
      ]
      expect(getCliArgs(args)).toEqual({
        filter: 'test',
        count: true
      })
    })
  })
})
