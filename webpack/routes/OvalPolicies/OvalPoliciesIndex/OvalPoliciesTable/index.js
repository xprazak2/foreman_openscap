import React from 'react';
import queryString from 'query-string';

import { push } from 'connected-react-router'

import { useQuery, gql } from '@apollo/client';

import { usePaginationOptions } from 'foremanReact/components/Pagination/PaginationHooks';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import Loading from '../../../../components/Loading';

import policiesQuery from '../ovalPolicies.gql';

import OvalPoliciesTable from './OvalPoliciesTable';

const WrappedOvalPoliciesTable = props => {
  console.log(props)
  const fetchPolicies = (pagination) => useQuery(policiesQuery, { variables: { pagination }});

  const queryVars = (params, defaults) => ({ page: params.page || defaults.page, perPage: params.perPage || defaults.perPage })

  const refreshPage = (params = {}) => {
    let stringyfied = '';
    if (params.length > 0) {
      stringyfied = `?${queryString.stringify(params)}`
    }
    push(`/compliance/oval_policies${stringyfied}`);
  }

  const uiSettings = useForemanSettings();
  const pagination = { page: 1, perPage: uiSettings.perPage }

  const { loading, error, data } = fetchPolicies(queryVars(props.match.params, pagination));

  const perPageOptions = usePaginationOptions().map(item => ({ title: item.toString(), value: item }));

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    return <div>{error}</div>
  }
  console.log(data);

  return (
    <OvalPoliciesTable
      policies={data.ovalPolicies.nodes}
      perPageOptions={perPageOptions}
      pagination={pagination}
      totalCount={data.ovalPolicies.recordsCount}
      fetchPolicies={fetchPolicies}
    />
  )
}

export default WrappedOvalPoliciesTable;
