import { describe, it, expect, vi, beforeEach } from 'vitest'
import { data } from '~mocks/data.js'
import { exit, argv } from 'node:process'

vi.mock('node:process', () => vi.mockObject({
  exit: vi.fn(),
  argv: []
}))

vi.mock('~/data.js', () => ({
  data
}))

describe('index', () => {
  describe('execute good arguments', () => {
    it('should execute the program with both functions when the correct arguments are provided', async () => {
      argv = ['--filter=ry', '--count']

      const { execute } = await import('~/index.js')

      expect.assertions(3)

      const consoleDirSpy = vi.spyOn(console, 'dir')

      execute()

      expect(consoleDirSpy).toHaveBeenCalledTimes(2)
      expect(consoleDirSpy).toHaveBeenCalledWith(
        [
          {
            name: 'Satanwi',
            people: [{ name: 'Anthony Bruno', animals: [{ name: 'Oryx' }] }]
          },
          {
            name: 'Uzuzozne',
            people: [
              { name: 'Lillie Abbott', animals: [{ name: 'John Dory' }] }
            ]
          }
        ],
        { depth: null }
      )
      expect(consoleDirSpy).toHaveBeenCalledWith(
        [
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
        ],
        { depth: null }
      )
    })

    it('should only call the filter function when the correct arguments are provided', async () => {
      expect.assertions(2)

      argv = ['--filter=ry']

      const { execute } = await import('~/index.js')

      const consoleDirSpy = vi.spyOn(console, 'dir')

      execute()

      expect(consoleDirSpy).toHaveBeenCalledTimes(1)
      expect(consoleDirSpy).toHaveBeenCalledWith([
        {
          name: 'Satanwi',
          people: [{ name: 'Anthony Bruno', animals: [{ name: 'Oryx' }] }]
        },
        {
          name: 'Uzuzozne',
          people: [
            { name: 'Lillie Abbott', animals: [{ name: 'John Dory' }] }
          ]
        }
      ],
      { depth: null })
    })

    it('should only call the count function when the correct arguments are provided', async () => {
      argv = ['--count']

      const { execute } = await import('~/index.js')

      const consoleDirSpy = vi.spyOn(console, 'dir')

      expect.assertions(2)

      execute()

      expect(consoleDirSpy).toHaveBeenCalledTimes(1)
      expect(consoleDirSpy).toHaveBeenCalledWith(
        [
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
        ],
        { depth: null }
      )
    })

    it('should show error when the filter function is called with unknown animal filter string', async () => {
      argv = ['--filter=unknown']

      const { execute } = await import('~/index.js')

      const consoleErrorSpy = vi.spyOn(console, 'error')

      execute()

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `No result found for animals including "unknown" string`
      )
    })
  })
  describe('execute bad arguments', () => {
    it('should execute the program and exit with error when no arguments are provided', async () => {
      expect.assertions(2)

      argv = []

      const { execute } = await import('~/index.js')

      const consoleErrorSpy = vi.spyOn(console, 'error')

      execute()

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No CLI arguments provided, please provide some arguments'
      )
      expect(exit).toHaveBeenCalledWith(0)
    })

    it('should not call any function when wrong arguments are provided', async () => {
      expect.assertions(2)
      argv = ['--wrongFilter']

      const { execute } = await import('~/index.js')

      const consoleDirSpy = vi.spyOn(console, 'dir')
      const consoleErrorSpy = vi.spyOn(console, 'error')

      execute()

      expect(consoleDirSpy).toHaveBeenCalledTimes(0)
      expect(consoleErrorSpy).toHaveBeenCalledTimes(0)
    })
  })
})
