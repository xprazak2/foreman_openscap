import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import ConfirmModal from '../../../components/ConfirmModal';
import OvalPoliciesTable from './OvalPoliciesTable';
import IndexLayout from '../../../components/IndexLayout';

import { paramsToVars, currentPagination } from '../../../helpers/pageParamsHelper';
import policiesQuery from '../../../graphql/queries/ovalPolicies.gql';

import { submitDelete, prepareMutation } from './OvalPoliciesIndexHelpers';

const OvalPoliciesIndex = props => {
  const [policy, setPolicy] = useState(null);

  const toggleModal = (policyToDelete = null) => {
    setPolicy(policyToDelete);
  }

  const pagination = currentPagination(props.history)

  const fetchFn = props => useQuery(policiesQuery, { variables: paramsToVars(props.history) });

  const renameData = data => ({ policies: data.ovalPolicies.nodes, totalCount: data.ovalPolicies.totalCount });

  return (
    <React.Fragment>
      <IndexLayout pageTitle={__('OVAL Policies')}>
        <OvalPoliciesTable
          {...props}
          fetchFn={fetchFn}
          renameData={renameData}
          resultPath='ovalPolicies.nodes'
          pagination={pagination}
          emptyStateTitle={__('No OVAL Policies found')}
          toggleModal={toggleModal}
        />
      </IndexLayout>
      <ConfirmModal
          title='Delete OVAL Policy'
          onClose={toggleModal}
          isOpen={!!policy}
          onConfirm={submitDelete}
          prepareMutation={prepareMutation(props.history, toggleModal, props.showToast)}
          record={policy}
        />
    </React.Fragment>
  )
}

export default OvalPoliciesIndex;
