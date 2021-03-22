import policiesQuery from '../../../../graphql/queries/ovalPolicies.gql';

export const mocks = [
  {
    request: {
      query: policiesQuery,
      variables: {
        first: 20,
        last: 20
      }
    },
    result: {
      data: {
        ovalPolicies: {
          totalCount: 2,
          nodes: [
            { id: 'abc', name: 'first policy' },
            { id: 'xyz', name: 'second policy' }
          ]
        }
      }
    }
  }
]

export const historyMock = {
  location: {
    search: ''
  }
}

