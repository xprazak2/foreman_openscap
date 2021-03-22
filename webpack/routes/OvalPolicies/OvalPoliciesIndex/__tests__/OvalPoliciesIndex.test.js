import React from 'react';
// TODO: use @testing-library/user-event for better events
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/dom'
import '@testing-library/jest-dom';

import OvalPoliciesIndex from '../OvalPoliciesIndex';
import policiesQuery from '../../../../graphql/queries/ovalPolicies.gql';

import { withRedux, withMockedProvider, tick } from '../../../../testHelper';
import { mocks, historyMock } from './OvalPoliciesIndex.fixtures';

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

export const pushMock = jest.fn();

export const pageParamsHistoryMock = {
  location: {
    search: '?page=2&perPage=5'
  },
  push: pushMock
}

const TestComponent = withRedux(withMockedProvider(OvalPoliciesIndex));

describe('OvalPoliciesIndex', () => {
  it('should load page', async () => {
    const { container } = render(
      <TestComponent history={historyMock} mocks={mocks} />
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
      <TestComponent history={pageParamsHistoryMock} mocks={pageParamsMocks} />
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
