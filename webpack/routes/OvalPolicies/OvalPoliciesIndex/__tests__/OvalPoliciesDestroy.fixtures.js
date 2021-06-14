import policiesQuery from '../../../../graphql/queries/ovalPolicies.gql';
import deleteOvalPolicy from '../../../../graphql/mutations/deleteOvalPolicy.gql';

export const firstCall = {
  data: {
    ovalPolicies: {
      totalCount: 5,
      nodes: [
        {
          id: 'MDE6Rm9yZW1hbk9wZW5zY2FwOjpPdmFsUG9saWN5LTQz',
          name: 'first policy',
          meta: { canDestroy: true },
          ovalContent: { name: 'foo' },
        },
        {
          id: 'MDE6Rm9yZW1hbk9wZW5zY2FwOjpPdmFsUG9saWN5LTQ0',
          name: 'second policy',
          meta: { canDestroy: true },
          ovalContent: { name: 'foo' },
        },
      ],
    },
  },
};

export const secondCall = {
  data: {
    ovalPolicies: {
      totalCount: 4,
      nodes: [
        {
          id: 'MDE6Rm9yZW1hbk9wZW5zY2FwOjpPdmFsUG9saWN5LTQ0',
          name: 'second policy',
          meta: { canDestroy: true },
          ovalContent: { name: 'foo' },
        },
        {
          id: 'MDE6Rm9yZW1hbk9wZW5zY2FwOjpPdmFsUG9saWN5LTQ1',
          name: 'third policy',
          meta: { canDestroy: true },
          ovalContent: { name: 'foo' },
        },
      ],
    },
  },
};

export const deleteMockFactory = (first, second, errors = null) => {
  let called = false;

  const deleteMocks = [
    {
      request: {
        query: deleteOvalPolicy,
        variables: {
          id: 'MDE6Rm9yZW1hbk9wZW5zY2FwOjpPdmFsUG9saWN5LTQz',
        },
      },
      result: {
        data: {
          deleteOvalPolicy: {
            id: 'MDE6Rm9yZW1hbk9wZW5zY2FwOjpPdmFsUG9saWN5LTQz',
            errors,
          },
        },
      },
    },
    {
      request: {
        query: policiesQuery,
        variables: {
          first: 2,
          last: 2,
        },
      },
      newData: () => {
        if (called && !errors) {
          return second;
        } else if (called && errors) {
          return first;
        }
        called = true;
        return first;
      },
    },
  ];
  return deleteMocks;
};

export const pageParamsHistoryMock = {
  location: {
    search: '?page=1&perPage=2',
  },
};
