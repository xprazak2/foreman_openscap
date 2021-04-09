import React from 'react';
import { Link } from 'react-router-dom';

import { getForemanContext } from 'foremanReact/Root/Context/ForemanContext';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import { TableText } from '@patternfly/react-table';

import { useQuery, gql } from '@apollo/client';
import queryString from 'query-string';

import policiesQuery from '../../../../graphql/queries/ovalPolicies.gql';

export const useUiSettings = rootCtx => rootCtx.metadata.UISetting;

export const refreshPage = (history, params = {}) => {
  let stringyfied = '';
  if (Object.keys(params).length > 0) {
    stringyfied = `?${queryString.stringify(params)}`
  }

  const url = `/compliance/oval_policies${stringyfied}`
  history.push(url);
}

export const fetchPolicies = (variables) => useQuery(policiesQuery, { variables });

export const pageToVars = pagination => ({
  first: pagination.page * pagination.perPage,
  last: pagination.perPage
});

export const parsePageParams = history => queryString.parse(history.location.search);

export const currentPagination = (history) => {
  const pageParams = parsePageParams(history);
  const uiSettings = useForemanSettings();

  return ({
    page: parseInt(pageParams.page) || 1,
    perPage: parseInt(pageParams.perPage) || uiSettings.perPage
  })
}

export const preparePerPageOptions = (opts) => opts.map(item => ({ title: item.toString(), value: item }));
