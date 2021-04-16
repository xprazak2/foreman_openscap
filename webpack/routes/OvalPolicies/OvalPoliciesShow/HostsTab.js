import React from 'react';
import { useQuery } from '@apollo/client';
import { Table, TableHeader, TableBody, TableText } from '@patternfly/react-table';
import { Pagination, Flex, FlexItem, Button } from '@patternfly/react-core';

import Loading from '../../../components/Loading';
import EmptyState from '../../../components/EmptyState';

import ovalHosts from '../../../graphql/queries/ovalHosts.gql';

import { linkCell } from '../../../helpers/tableHelper';
import { hostsPath, modelPath } from '../../../helpers/pathsHelper';

const errorStateTitle = __('Error!');
const emptyStateBody = "";

const HostsTab = props => {
  const search = `all_with_oval_policy_id = ${props.match.params.id}`
  const { loading, error, data } = useQuery(ovalHosts, { variables: { search  } })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <EmptyState error={error} title={errorStateTitle} body={error.message} />
  }

  const hosts = data.hosts.nodes;

  const columns = [{ title: 'Name' }];

  const rows = hosts.map(host => ({ cells: [{ title: linkCell(modelPath(hostsPath, host), host.name)}], host }))

  return (
    <React.Fragment>
      <Table
        aria-label={__("Hosts with OVAL Policy assigned")}
        cells={columns}
        rows={rows}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </React.Fragment>
  )
}

export default HostsTab;
