import { data } from './data.js'
import { argv, exit } from 'node:process'
import { filterAnimals, countEntities, getCliArgs } from './lib/index.js'

export const execute = () => {
  const cliArgs = getCliArgs(argv)

  if (!Object.keys(cliArgs).length) {
    console.error('No CLI arguments provided, please provide some arguments')
    exit(0)
  }

  if (cliArgs.filter) {
    const animals = filterAnimals(data, cliArgs.filter)
    animals.length
      ? console.dir(animals, { depth: null })
      : console.error(
          `No result found for animals including "${cliArgs.filter}" string`
        )
  }

  if (cliArgs.count) 
    console.dir(countEntities(data), { depth: null })
}

execute()
