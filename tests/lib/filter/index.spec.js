import { describe, it, expect, vi } from 'vitest'
import { filterAnimals } from '~/lib/index.js'
import { data } from '~mocks/data.js'

describe('filter', () => {
  describe('filterAnimals', () => {
    it('should only show one animal when specific name is provided', async () => {
      expect(filterAnimals(data, 'Yellowjacket')).toStrictEqual([
        {
          name: 'Uzuzozne',
          people: [
            {
              name: 'Lillian Calamandrei',
              animals: [{ name: 'Yellowjacket' }]
            }
          ]
        }
      ])
    })

    it('should show many animals when name filter is used by several animals', () => {
      expect(filterAnimals(data, 'ry')).toStrictEqual([
        {
          name: 'Satanwi',
          people: [{ name: 'Anthony Bruno', animals: [{ name: 'Oryx' }] }]
        },
        {
          name: 'Uzuzozne',
          people: [{ name: 'Lillie Abbott', animals: [{ name: 'John Dory' }] }]
        }
      ])
    })

    it('should send empty array when no animal is found', () => {
      expect(filterAnimals(data, 'NOT_FOUND')).toStrictEqual([])
    })
  })
})
