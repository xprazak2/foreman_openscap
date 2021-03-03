import React from 'react';

import { useQuery, gql } from '@apollo/client';

import Loading from '../../../../components/Loading';

import policiesQuery from '../ovalPolicies.gql';

import OvalPoliciesTable from './OvalPoliciesTable';

const WrappedOvalPoliciesTable = props => {
  console.log(props)
  const { loading, error, data } = useQuery(policiesQuery);

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    return <div>{error}</div>
  }
  console.log(data);

  return <OvalPoliciesTable policies={data.ovalPolicies.nodes} />
}

export default WrappedOvalPoliciesTable;
