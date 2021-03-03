import React, { useState } from 'react';
import { translate as __ } from 'foremanReact/common/I18n';

import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Pagination, Flex, FlexItem } from '@patternfly/react-core';

const OvalPoliciesTable = props => {
  const columns = [__('Name')];
  const rows = props.policies.map(policy => [policy.name])

  const [perPage, setPerPage] = useState(props.pagination.perPage);
  const [page, setPage] = useState(props.pagination.page);

  const handlePerPageSelected = (event, perPage) => {
    setPerPage(perPage);
    props.fetchPolicies({ page, perPage });
  }

  return (
    <React.Fragment>
      <Flex>
        <FlexItem align={{ default: 'alignRight' }}>
          <Pagination
            itemCount={props.totalCount}
            page={page}
            perPage={perPage}
            onSetPage={(event, pageSelected) => { }}
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
