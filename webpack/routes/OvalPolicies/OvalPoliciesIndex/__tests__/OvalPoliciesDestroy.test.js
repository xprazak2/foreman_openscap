import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'

// import OvalPoliciesIndex from '../OvalPoliciesIndex';
import OvalPoliciesIndex from '../index';
import policiesQuery from '../../../../graphql/queries/ovalPolicies.gql';
import deleteOvalPolicy from '../../../../graphql/mutations/deleteOvalPolicy.gql';

import { withRedux, withMockedProvider, tick } from '../../../../testHelper';
import { mocks, historyMock } from './OvalPoliciesIndex.fixtures';

const firstCall = {
  data: {
    ovalPolicies: {
      totalCount: 5,
      nodes: [
        { id: 'abc', name: 'first policy' },
        { id: 'xyz', name: 'second policy' }
      ]
    }
  }
}

const secondCall = {
  data: {
    ovalPolicies: {
      totalCount: 4,
      nodes: [
        { id: 'xyz', name: 'second policy' },
        { id: 'klm', name: 'third policy' }
      ]
    }
  }
}

const deleteMockFactory = (first, second) => {
  let called = false;

  const deleteMocks = [
    {
      request: {
        query: deleteOvalPolicy,
        variables: {
          id: 'abc'
        }
      },
      result: {
        data: {
          deleteOvalPolicy: {
            id: 'abc',
            errors: []
          }
        }
      }
    },
    {
      request: {
        query: policiesQuery,
        variables: {
          first: 2,
          last: 2
        }
      },
      newData: () => {
        if (called) {
          return second;
        } else {
          called = true;
          return first;
        }
      }
    }
  ]
  return deleteMocks;
}

const pageParamsHistoryMock = {
  location: {
    search: '?page=1&perPage=2'
  }
}

const TestComponent = withRedux(withMockedProvider(OvalPoliciesIndex));

describe('OvalPoliciesIndex', () => {
  it("should open and close delete modal", async () => {
    render(<TestComponent history={historyMock} mocks={mocks} />);
    await waitFor(tick);
    expect(screen.getByText('first policy')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button', { name: 'Actions' })[0])
    userEvent.click(screen.getByText('Delete OVAL policy'))
    await waitFor(tick);
    expect(screen.getByText('You are about to do something destructive. Are you absolutely sure?')).toBeInTheDocument();
    userEvent.click(screen.getByText('Cancel'))
    await waitFor(tick);
    expect(screen.queryByText('You are about to do something destructive. Are you absolutely sure?')).not.toBeInTheDocument();
    expect(screen.getByText('first policy')).toBeInTheDocument();
  });
  it("should delete OVAL policy", async () => {
    render(<TestComponent history={pageParamsHistoryMock} mocks={deleteMockFactory(firstCall, secondCall)} />);
    await waitFor(tick);
    expect(screen.getByText('first policy')).toBeInTheDocument();
    expect(screen.queryByText('third policy')).not.toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button', { name: 'Actions' })[0]);
    userEvent.click(screen.getByText('Delete OVAL policy'));
    await waitFor(tick);
    userEvent.click(screen.getByText('Confirm'));
    await waitFor(tick);
    expect(screen.getByText('OVAL policy was successfully deleted.')).toBeInTheDocument();
    expect(screen.queryByText('first policy')).not.toBeInTheDocument();
    expect(screen.getByText('third policy')).toBeInTheDocument();
  });
})