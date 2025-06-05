export const filterAnimals = (data, filterString) =>
  data.reduce((acc, { name, people }) => {
    const filteredPeople = people.reduce(
      (peopleAcc, { animals, name: personName }) => {
        const matchingAnimals = animals.filter(animal =>
          animal.name.includes(filterString)
        )
        return !!matchingAnimals.length
          ? [...peopleAcc, { name: personName, animals: matchingAnimals }]
          : peopleAcc
      },
      []
    )

    return !!filteredPeople.length
      ? [...acc, { name, people: filteredPeople }]
      : acc
  }, [])
