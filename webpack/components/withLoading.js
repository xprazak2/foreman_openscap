import React from 'react';
import { translate as __ } from 'foremanReact/common/I18n';

import Loading from 'foremanReact/components/Loading';
import EmptyState from './EmptyState';

const errorStateTitle = __('Error!');
const emptyStateBody = "";

const pluckData = (data, path) => {
  const split = path.split('.');
  return split.reduce((memo, item) => {
    if (item) {
      return memo[item];
    }
    throw 'Unexpected empty segment in response data path';
  }, data)
}

const withLoading = Component => ({ fetchFn, resultPath, renameData, emptyStateTitle, ...rest }) => {
  let { loading, error, data } = fetchFn(rest);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <EmptyState error={error} title={errorStateTitle} body={error.message} />
  }

  const result = pluckData(data, resultPath);

  if ((Array.isArray(result) && result.length === 0) || !result) {
    return <EmptyState title={emptyStateTitle} body={emptyStateBody} />
  }

  return (
    <Component {...rest} {...renameData(data)} />
  )
}

export default withLoading;
