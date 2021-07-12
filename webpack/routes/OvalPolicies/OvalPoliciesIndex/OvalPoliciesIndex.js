import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { translate as __ } from 'foremanReact/common/I18n';

import OvalPoliciesTable from './OvalPoliciesTable';
import { submitDelete, prepareMutation } from '../../../helpers/mutationHelper';

import IndexLayout from '../../../components/IndexLayout';

import {
  useParamsToVars,
  useCurrentPagination,
} from '../../../helpers/pageParamsHelper';
import policiesQuery from '../../../graphql/queries/ovalPolicies.gql';
import deleteOvalPolicyMutation from '../../../graphql/mutations/deleteOvalPolicy.gql';

const OvalPoliciesIndex = props => {
  const pagination = useCurrentPagination(props.history);

  const useFetchFn = componentProps =>
    useQuery(policiesQuery, {
      variables: useParamsToVars(componentProps.history),
    });

  const renameData = data => ({
    policies: data.ovalPolicies.nodes,
    totalCount: data.ovalPolicies.totalCount,
  });

  return (
    <IndexLayout pageTitle={__('OVAL Policies')}>
      <OvalPoliciesTable
        {...props}
        fetchFn={useFetchFn}
        renameData={renameData}
        resultPath="ovalPolicies.nodes"
        pagination={pagination}
        emptyStateTitle={__('No OVAL Policies found')}
        confirmDeleteTitle={__('Delete OVAL Policy')}
        submitDelete={submitDelete}
        prepareMutation={prepareMutation(
          props.history,
          props.showToast,
          policiesQuery,
          'deleteOvalPolicy',
          __('OVAL policy was successfully deleted.'),
          deleteOvalPolicyMutation,
          __('OVAL policy')
        )}
      />
    </IndexLayout>
  );
};

OvalPoliciesIndex.propTypes = {
  history: PropTypes.object.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default OvalPoliciesIndex;
