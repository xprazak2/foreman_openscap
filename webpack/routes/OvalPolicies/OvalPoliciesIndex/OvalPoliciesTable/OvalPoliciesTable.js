import React, { useState } from 'react';
import { translate as __ } from 'foremanReact/common/I18n';
import { usePaginationOptions } from 'foremanReact/components/Pagination/PaginationHooks';

import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Pagination, Flex, FlexItem, Button } from '@patternfly/react-core';

import { preparePerPageOptions, refreshPage } from './OvalPoliciesTableHelpers';

const OvalPoliciesTable = props => {
  const columns = [
    { title: __('Name') }
  ];
  const rows = props.policies.map(policy => [{ title: policy.name, policy } ]);

  const actions = [
    {
      title: __('Delete OVAL policy'),
      onClick: (event, rowId, rowData, extra) => {
        props.toggleModal(rowData[0].policy);
      }
    }
  ];

  const handlePerPageSelected = (event, perPage) => {
    refreshPage(props.history, { page: 1, perPage })
  }

  const handlePageSelected = (event, page) => {
    refreshPage(props.history, { ...props.pagination, page })
  }

  return (
    <React.Fragment>
      <Flex>
        <FlexItem>
          <Button onClick={() => props.history.push('/compliance/oval_policies/new')} variant="primary" aria-label="create_oval_policy">
            {__('Create OVAL Policy')}
          </Button>
        </FlexItem>
        <FlexItem align={{ default: 'alignRight' }}>
          <Pagination
            itemCount={props.totalCount}
            page={props.pagination.page}
            perPage={props.pagination.perPage}
            onSetPage={handlePageSelected}
            onPerPageSelect={handlePerPageSelected}
            perPageOptions={preparePerPageOptions(usePaginationOptions())}
            variant="top"
          />
        </FlexItem>
      </Flex>
      <Table
        aria-label={__("OVAL Policies Table")}
        cells={columns}
        rows={rows}
        actions={actions}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </React.Fragment>
  )
}

export default OvalPoliciesTable;
