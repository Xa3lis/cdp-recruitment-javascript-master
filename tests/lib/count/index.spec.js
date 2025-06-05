import { describe, it, expect, vi } from 'vitest'
import { data } from '~mocks/data.js'
import { countEntities } from '~/lib/index.js'

describe('count', () => {
  describe('countEntities', () => {
    it('should count the number of animals and people', async () => {
      expect.assertions(2)

      expect(countEntities(data)).toStrictEqual([
        {
          name: 'Satanwi [2]',
          people: [
            {
              name: 'Elmer Kinoshita [7]',
              animals: [
                { name: 'Weasel' },
                { name: 'Birds' },
                { name: 'Snakes' },
                { name: 'Anteater' },
                { name: 'Groundhog' },
                { name: 'Ant' },
                { name: 'Courser' }
              ]
            },
            {
              name: 'Anthony Bruno [6]',
              animals: [
                { name: 'Caracal' },
                { name: 'Anteater' },
                { name: 'Kiwa Hirsuta' },
                { name: 'Zooplankton' },
                { name: 'Tarantula' },
                { name: 'Oryx' }
              ]
            }
          ]
        },
        {
          name: 'Uzuzozne [2]',
          people: [
            {
              name: 'Lillian Calamandrei [8]',
              animals: [
                { name: 'Rats' },
                { name: 'Macaw' },
                { name: 'Gazelle' },
                { name: 'Gazelle' },
                { name: 'Alpaca' },
                { name: 'Snakes' },
                { name: 'Yellowjacket' },
                { name: 'Stickleback' }
              ]
            },
            {
              name: 'Lillie Abbott [6]',
              animals: [
                { name: 'John Dory' },
                { name: 'Gayal' },
                { name: 'Hawk' },
                { name: 'Umbrella Squid' },
                { name: 'Hyrax' },
                { name: "Henkel's Leaf-tailed Gecko" }
              ]
            }
          ]
        }
      ])

      const modifiedData = data.map(item => ({
        ...item,
        people: [
          ...item.people,
          { name: 'Added Person', animals: [{ name: 'Added Animal' }] }
        ]
      }))

      expect(countEntities(modifiedData)).toStrictEqual([
        {
          name: 'Satanwi [3]',
          people: [
            {
              name: 'Elmer Kinoshita [7]',
              animals: [
                { name: 'Weasel' },
                { name: 'Birds' },
                { name: 'Snakes' },
                { name: 'Anteater' },
                { name: 'Groundhog' },
                { name: 'Ant' },
                { name: 'Courser' }
              ]
            },
            {
              name: 'Anthony Bruno [6]',
              animals: [
                { name: 'Caracal' },
                { name: 'Anteater' },
                { name: 'Kiwa Hirsuta' },
                { name: 'Zooplankton' },
                { name: 'Tarantula' },
                { name: 'Oryx' }
              ]
            },
            {
              name: 'Added Person [1]',
              animals: [{ name: 'Added Animal' }]
            }
          ]
        },
        {
          name: 'Uzuzozne [3]',
          people: [
            {
              name: 'Lillian Calamandrei [8]',
              animals: [
                { name: 'Rats' },
                { name: 'Macaw' },
                { name: 'Gazelle' },
                { name: 'Gazelle' },
                { name: 'Alpaca' },
                { name: 'Snakes' },
                { name: 'Yellowjacket' },
                { name: 'Stickleback' }
              ]
            },
            {
              name: 'Lillie Abbott [6]',
              animals: [
                { name: 'John Dory' },
                { name: 'Gayal' },
                { name: 'Hawk' },
                { name: 'Umbrella Squid' },
                { name: 'Hyrax' },
                { name: "Henkel's Leaf-tailed Gecko" }
              ]
            },
            {
              name: 'Added Person [1]',
              animals: [{ name: 'Added Animal' }]
            }
          ]
        }
      ])
    })

    it('should count the number of animals and people when no animals are present', () => {
      expect(
        countEntities([
          { name: 'Satanwi', people: [{ name: 'Elmer Kinoshita' }] }
        ])
      ).toStrictEqual([
        {
          name: 'Satanwi [1]',
          people: [{ name: 'Elmer Kinoshita [0]', animals: [] }]
        }
      ])
    })

    it('should return empty array when no data is provided', () => {
      expect(countEntities([])).toStrictEqual([])
    })
  })
})
