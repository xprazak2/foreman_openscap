import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import OvalContentsIndex from '../OvalContentsIndex';

import { withRedux, withMockedProvider, tick, historyMock } from '../../../../testHelper';
import { ovalContentsPath } from '../../../../helpers/pathsHelper';

import { mocks, paginatedMocks, pushMock, pagePaginationHistoryMock } from './OvalContentsIndex.fixtures';

const TestComponent = withRedux(withMockedProvider(OvalContentsIndex));

describe('OvalContentsIndex', () => {
  // it('should load page', async () => {
  //   const { container } = render(
  //     <TestComponent history={historyMock} mocks={mocks} />
  //   )
  //   expect(screen.getByText('Loading')).toBeInTheDocument();
  //   await waitFor(tick);
  //   expect(screen.getByText('ansible OVAL content')).toBeInTheDocument();
  //   expect(screen.getByText('openshift OVAL content')).toBeInTheDocument();
  //   const pageItems = container.querySelector('.pf-c-pagination__total-items');
  //   expect(pageItems.length === 1);
  //   expect(within(pageItems).getByText(/1 - 4/)).toBeInTheDocument();
  //   expect(within(pageItems).getByText('of')).toBeInTheDocument();
  //   expect(within(pageItems).getByText('4')).toBeInTheDocument();
  // })
  it('should load page with pagination params', async () => {
    const { container } = render(
      <TestComponent history={pagePaginationHistoryMock} mocks={paginatedMocks} />
    );

    await waitFor(tick);
    const pageItems = container.querySelector('.pf-c-pagination__total-items');
    expect(pageItems.length === 1);
    expect(within(pageItems).getByText(/6 - 7/)).toBeInTheDocument();
    expect(within(pageItems).getByText('of')).toBeInTheDocument();
    expect(within(pageItems).getByText('7')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Go to previous page' }));

    expect(pushMock).toHaveBeenCalledWith(`${ovalContentsPath}?page=1&perPage=5`);
  })
});
