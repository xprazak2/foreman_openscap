import React from 'react';
import { Table, TableHeader, TableBody, TableText } from '@patternfly/react-table';
import { Pagination, Flex, FlexItem } from '@patternfly/react-core';

import '@patternfly/patternfly/patternfly-addons.scss';


import { usePaginationOptions } from 'foremanReact/components/Pagination/PaginationHooks';

import { preparePerPageOptions, refreshPage } from './IndexTableHelpers';

const IndexTable = props => {
  const handlePerPageSelected = (event, perPage) => {
    refreshPage(props.history, { page: 1, perPage })
  }

  const handlePageSelected = (event, page) => {
    refreshPage(props.history, { ...props.pagination, page })
  }

  const perPageOptions = preparePerPageOptions(usePaginationOptions())

  return (
    <React.Fragment>
      <Flex className='pf-u-pt-md'>
        <FlexItem>
          {props.toolbarBtns}
        </FlexItem>
        <FlexItem align={{ default: 'alignRight' }}>
          <Pagination
            itemCount={props.totalCount}
            page={props.pagination.page}
            perPage={props.pagination.perPage}
            onSetPage={handlePageSelected}
            onPerPageSelect={handlePerPageSelected}
            perPageOptions={perPageOptions}
            variant="top"
          />
        </FlexItem>
      </Flex>
      <Table
        aria-label={props.ariaTableLabel}
        cells={props.columns}
        rows={props.rows}
        actions={props.actions}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </React.Fragment>
  )
}

export default IndexTable;
