import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
// TODO: use @testing-library/user-event for better events
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/dom'
import '@testing-library/jest-dom';

import { getForemanContext } from 'foremanReact/Root/Context/ForemanContext';

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
            { id: 'abc', name: 'first policy' },
            { id: 'xyz', name: 'second policy' }
          ]
        }
      }
    }
  }
]

const pageParamsMocks = [
  {
    request: {
      query: policiesQuery,
      variables: {
        first: 10,
        last: 5
      }
    },
    result: {
      data: {
        ovalPolicies: {
          totalCount: 7,
          nodes: [
            { id: 'xyz', name: 'sixth policy' },
            { id: 'abc', name: 'seventh policy' }
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

const pushMock = jest.fn();

const pageParamsHistoryMock = {
  location: {
    search: '?page=2&perPage=5'
  },
  push: pushMock
}

const TestReactApp = (props) => {
  const ForemanContext = getForemanContext(ctx);
  const { mocks, ...rest } = props;

  return (
    <ForemanContext.Provider value={ctx}>
      <MockedProvider mocks={mocks} addTypename={false} >
        <OvalPoliciesIndex {...rest} />
      </MockedProvider>
    </ForemanContext.Provider>
  )
}

const tick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('OvalPoliciesIndex', () => {
  it('should load page', async () => {
    const { container } = render(
      <TestReactApp history={historyMock} mocks={mocks} />
    );
    expect(screen.getByText('Loading')).toBeInTheDocument();
    await waitFor(tick);
    expect(screen.getByText('first policy')).toBeInTheDocument();
    expect(screen.getByText('second policy')).toBeInTheDocument();
    const pageItems = container.querySelector('.pf-c-pagination__total-items');
    expect(pageItems.length === 1);
    expect(within(pageItems).getByText(/1 - 2/)).toBeInTheDocument();
    expect(within(pageItems).getByText('of')).toBeInTheDocument();
    expect(within(pageItems).getByText('2')).toBeInTheDocument();
  });

  it('should load page with page params', async () => {
    const { container } = render(
      <TestReactApp history={pageParamsHistoryMock} mocks={pageParamsMocks} />
    )
    await waitFor(tick);
    const pageItems = container.querySelector('.pf-c-pagination__total-items');
    expect(pageItems.length === 1);
    expect(within(pageItems).getByText(/6 - 7/)).toBeInTheDocument();
    expect(within(pageItems).getByText('of')).toBeInTheDocument();
    expect(within(pageItems).getByText('7')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go to previous page' }));

    expect(pushMock).toHaveBeenCalledWith('/compliance/oval_policies?page=1&perPage=5');
  })

  // TODO: test error and empty state as well
});
