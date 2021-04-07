import React from 'react'
import { useQuery } from '@apollo/client';

import CvesTable from './CvesTable';

import cves from '../../../graphql/queries/cves.gql';
import { useParamsToVars, useCurrentPagination } from '../../../helpers/pageParamsHelper';

const CvesTab = props => {
  const fetchFn = props => useQuery(cves, { variables: { search: `oval_policy_id = ${props.match.params.id}`, ...useParamsToVars(props.history) } })

  const renameData = data => {
    return ({ cves: data.cves.nodes, totalCount: data.cves.totalCount });
  }

  const pagination = useCurrentPagination(props.history);

  return (
    <CvesTable
      {...props}
      fetchFn={fetchFn}
      renameData={renameData}
      resultPath='cves.nodes'
      pagination={pagination}
      emptyStateTitle={__('No CVEs found.')}
    />
  )
}

export default CvesTab;
