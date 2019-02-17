export const simulatedData = {
  id: '3f283bb6-ef9c-4e04-acd0-55f1da9eee88',
  name: 'John Doe',
  date: Date(Date.now()),
  children: [
    {
      id: '363d0578-658b-4a92-aefa-8b17a6f97ded',
      name: 'Lead 1: AETNA',
      date: Date(Date.now()),
      children: [
        {
          id: '6222a188-a27f-47d2-a3b8-f816cdf53e38',
          name: 'Cuy',
          date: Date(Date.now())
        },
        {
          id: 'ae735875-5e80-4be7-85ce-6dbea14df015',
          name: 'PostUp',
          date: Date(Date.now())
        }
      ]
    },
    {
      id: '5792e8fd-28a6-44f4-b36c-e73030b1cc08',
      name: 'Lead 2: HUMANA',
      date: Date(Date.now()),
      children: [
        {
          id: 'af283bz6-ef9c-4e04-acd0-55f1da9eee99',
          name: 'Cuy',
          date: Date(Date.now())
        },
        {
          id: '3f283bb6-ef9c-4e04-acd0-55f1da9eee03',
          name: 'Shared',
          date: Date(Date.now()),
          children: [
            {
              id: '3f283bb6-ef9c-4e04-acd0-55f1da9eee77',
              name: 'Lead 3: Moo',
              date: Date(Date.now()),
              children: [
                {
                  id: '3f283bb6-ef9c-4e04-acd0-55f1da9eee88',
                  name: 'Cuy',
                  date: Date(Date.now())
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
