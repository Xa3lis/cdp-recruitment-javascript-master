export const countEntities = data =>
  data.reduce(
    (acc, { name, people }) => [
      ...acc,
      {
        name: `${name} [${people.length}]`,
        people: people.map(({ name: personName, animals }) => ({
          name: `${personName} [${animals?.length ?? 0}]`,
          animals: animals ?? []
        }))
      }
    ],
    []
  )
