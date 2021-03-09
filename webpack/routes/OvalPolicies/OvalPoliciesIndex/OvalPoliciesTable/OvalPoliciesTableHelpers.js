import { useQuery } from '@apollo/client';

import queryString from 'query-string';

import { usePaginationOptions } from 'foremanReact/components/Pagination/PaginationHooks';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import policiesQuery from '../ovalPolicies.gql';

export const refreshPage = history => (params = {}) => {
  let stringyfied = '';
  if (Object.keys(params).length > 0) {
    stringyfied = `?${queryString.stringify(params)}`
  }

  const url = `/compliance/oval_policies${stringyfied}`
  history.push(url);
}

export const fetchPolicies = (pagination) => useQuery(policiesQuery, { variables: { pagination }});

export const parsePageParams = history => queryString.parse(history.location.search);

export const currentPagination = history => {
  const uiSettings = useForemanSettings();
  const pageParams = parsePageParams(history);

  return ({
    page: parseInt(pageParams.page) || 1,
    perPage: parseInt(pageParams.perPage) || uiSettings.perPage
  })
}

export const preparePerPageOptions = () => usePaginationOptions().map(item => ({ title: item.toString(), value: item }));
