import React from 'react';
import { translate as __ } from 'foremanReact/common/I18n';


import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Pagination, Flex, FlexItem } from '@patternfly/react-core';


const OvalPoliciesTable = props => {
  const columns = [__('Name')];
  const rows = props.policies.map(policy => [policy.name])

  return (
    <React.Fragment>
      <Flex>
        <FlexItem align={{ default: 'alignRight' }}>
          <Pagination
            itemCount={99}
            page={1}
            perPage={96}
            onSetPage={(event, updated) => {}}
            onPerPageSelect={(event, updated) => {}}
            perPageOptions={[]}
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
