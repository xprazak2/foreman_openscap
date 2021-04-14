import React from 'react';
import { translate as __ } from 'foremanReact/common/I18n';


// use loading from core
import Loading from './Loading';
import EmptyState from './EmptyState';

const errorStateTitle = __('Error!');
const emptyStateBody = "";

const withLoading = Component => ({ fetchFn, queryName, renameData, emptyStateTitle, ...rest }) => {

  let { loading, error, data } = fetchFn(rest);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <EmptyState error={error} title={errorStateTitle} body={error.message} />
  }

  if (data[queryName].nodes.length === 0) {
    return <EmptyState title={emptyStateTitle} body={emptyStateBody} />
  }

  return (
    <Component {...rest} {...renameData(data)} />
  )
}

export default withLoading;
