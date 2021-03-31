import React from 'react';

import { useQuery } from '@apollo/client';
import { Spinner, Checkbox } from '@patternfly/react-core';
import { Table, TableHeader, TableBody, headerCol } from '@patternfly/react-table';

import hostgroupsQuery from '../../../../graphql/queries/hostgroups.gql';

const HostgroupsStep = props => {
  const { loading, data, error } = useQuery(hostgroupsQuery)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>{ error.message }</div>
  }

  const columns = [
    { title: 'Name', cellTransforms: [headerCol()] }
  ]

  const createRows = (hostgroups, assignedState) => {
    return hostgroups.map(hostgroup => {
      let selected = assignedState.includes(hostgroup.id);
      return ({ cells: [{ title: hostgroup.name }], hostgroup, selected });
    })
  }

  const rows = createRows(data.hostgroups.nodes, props.assignedHgs);

  console.log(rows)

  return (
    <div>
      <Table
        onSelect={props.onHgAssignChange(data.hostgroups.nodes)}
        canSelectAll={true}
        cells={columns}
        rows={rows}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </div>
  )
}

export default HostgroupsStep;