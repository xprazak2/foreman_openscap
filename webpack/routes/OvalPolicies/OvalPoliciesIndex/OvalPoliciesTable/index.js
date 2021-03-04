import React, { useEffect } from 'react';
import queryString from 'query-string';

// import { push } from 'connected-react-router'

import { useQuery, gql } from '@apollo/client';

import { usePaginationOptions } from 'foremanReact/components/Pagination/PaginationHooks';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import Loading from '../../../../components/Loading';

import policiesQuery from '../ovalPolicies.gql';

import OvalPoliciesTable from './OvalPoliciesTable';

const WrappedOvalPoliciesTable = props => {
  console.log(props)

  const fetchPolicies = (pagination) => useQuery(policiesQuery, { variables: { pagination }});

  const refreshPage = (params = {}) => {
    let stringyfied = '';
    if (Object.keys(params).length > 0) {
      stringyfied = `?${queryString.stringify(params)}`
    }

    const url = `/compliance/oval_policies${stringyfied}`
    props.history.push(url);
  }

  const uiSettings = useForemanSettings();

  const pageParams = queryString.parse(props.history.location.search);
  // console.log('page params', pageParams)

  const pagination = { page: parseInt(pageParams.page) || 1, perPage: parseInt(pageParams.perPage) || uiSettings.perPage }

  // console.log('pagination', pagination);

  const { loading, error, data } = fetchPolicies(pagination);

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
      refreshPage={refreshPage}
    />
  )
}

export default WrappedOvalPoliciesTable;
