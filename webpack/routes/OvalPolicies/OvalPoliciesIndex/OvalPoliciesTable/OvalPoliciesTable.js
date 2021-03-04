import React, { useState } from 'react';
import { translate as __ } from 'foremanReact/common/I18n';

import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Pagination, Flex, FlexItem } from '@patternfly/react-core';

const OvalPoliciesTable = props => {
  const columns = [__('Name')];
  const rows = props.policies.map(policy => [policy.name])

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
            perPageOptions={props.perPageOptions}
            variant="top"
          />
        </FlexItem>
      </Flex>
      <Table
        aria-label="OVAL Policies Table"
        cells={columns}
        rows={rows}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </React.Fragment>
  )
}

export default OvalPoliciesTable;
