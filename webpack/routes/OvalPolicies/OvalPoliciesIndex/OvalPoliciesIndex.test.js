import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';

import { getForemanContext } from 'foremanReact/Root/Context/ForemanContext';
import { useForemanSettings, useForemanContext } from 'foremanReact/Root/Context/ForemanContext';
import { useUiSettings } from './OvalPoliciesTable/OvalPoliciesTableHelpers';

import OvalPoliciesIndex from './index';
import policiesQuery from './ovalPolicies.gql';

const ctx = {
  metadata: {
    UISettings: {
      perPage: 20
    }
  }
};

const mocks = [
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
            { name: 'first policy' },
            { name: 'second policy' }
          ]
        }
      }
    }
  }
]

const historyMock = {
  location: {
    search: ''
  }
}

const TestReactApp = (props) => {
  const ForemanContext = getForemanContext(ctx);

  return (
    <ForemanContext.Provider value={ctx}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <OvalPoliciesIndex {...props} />
      </MockedProvider>
    </ForemanContext.Provider>
  )
}

describe('OvalPoliciesIndex', () => {
  it('renders', async () => {
    const { container, getByText } = render(
      <TestReactApp history={historyMock} />
    );
    await waitFor(() => new Promise(resolve => setTimeout(resolve, 0)))
    screen.debug()
    // await wait(0)
    // await ;
  });
});
