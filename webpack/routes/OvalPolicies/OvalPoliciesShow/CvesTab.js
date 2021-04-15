import React from 'react'
import { useQuery } from '@apollo/client';

import CvesTable from './CvesTable';

import cves from '../../../graphql/queries/cves.gql';
import { paramsToVars, currentPagination } from '../../../helpers/pageParamsHelper';

const CvesTab = props => {
  console.log(props);

  const fetchFn = props => useQuery(cves, { variables: { search: `oval_policy_id = ${props.match.params.id}`, ...paramsToVars(props.history) } })

  const renameData = data => {
    return ({ cves: data.cves.nodes, totalCount: data.cves.totalCount });
  }

  const pagination = currentPagination(props.history);

  return (
    <CvesTable
      {...props}
      fetchFn={fetchFn}
      renameData={renameData}
      queryName='cves'
      pagination={pagination}
      emptyStateTitle={__('No CVEs found.')}
    />
  )
}

export default CvesTab;
