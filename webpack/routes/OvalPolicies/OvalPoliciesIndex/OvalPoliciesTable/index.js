import React, { useEffect } from 'react';
import queryString from 'query-string';

import { translate as __ } from 'foremanReact/common/I18n';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import Loading from '../../../../components/Loading';
import EmptyState from '../../../../components/EmptyState';

import OvalPoliciesTable from './OvalPoliciesTable';
import { refreshPage, fetchPolicies, currentPagination, pageToVars } from './OvalPoliciesTableHelpers';

const emptyStateTitle = __("You currently don't have any OVAL Policies.");
const errorStateTitle = __('Error!');
const emptyStateBody = "";

const WrappedOvalPoliciesTable = props => {
  const pagination = currentPagination(props.history)

  const { loading, error, data } = fetchPolicies(pageToVars(pagination));

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <EmptyState error={error} title={errorStateTitle} body={error.message} />
  }

  if (data.ovalPolicies.nodes.length === 0) {
    return <EmptyState title={emptyStateTitle} body={emptyStateBody} />
  }

  return (
    <OvalPoliciesTable
      policies={data.ovalPolicies.nodes}
      pagination={pagination}
      totalCount={data.ovalPolicies.totalCount}
      toggleModal={props.toggleModal}
      history={props.history}
    />
  )
}

export default WrappedOvalPoliciesTable;