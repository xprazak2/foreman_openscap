import React, { useState } from 'react';
import { translate as __ } from 'foremanReact/common/I18n';
import { usePaginationOptions } from 'foremanReact/components/Pagination/PaginationHooks';

import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Pagination, Flex, FlexItem } from '@patternfly/react-core';

import { preparePerPageOptions } from './OvalPoliciesTableHelpers';

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
    props.refreshPage({ page: 1, perPage })
  }

  const handlePageSelected = (event, page) => {
    props.refreshPage({ ...props.pagination, page })
  }

  return (
    <React.Fragment>
      <Flex>
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
