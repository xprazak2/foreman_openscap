import { useMutation } from '@apollo/client';
import { paramsToVars } from '../../../helpers/pageParamsHelper';

import deleteOvalPolicyMutation from '../../../graphql/mutations/deleteOvalPolicy.gql';
import policiesQuery from '../../../graphql/queries/ovalPolicies.gql';

const onCompleted = (toggleModal, showToast) => (data) => {
    toggleModal();
    showToast({ type: 'success', message: 'OVAL policy was successfully deleted.'});
  }

const onError = (showToast) => (error) => {
  showToast({ type: 'error', message: `There was a following error when deleting OVAL policy: ${error}` })
}

export const prepareMutation = (history, toggleModal, showToast) => () => {
  const pagination = paramsToVars(history);

  const options = {
    refetchQueries: [{ query: policiesQuery, variables: pagination }],
    onCompleted: onCompleted(toggleModal, showToast),
    onError: onError(showToast)
  }

  return useMutation(deleteOvalPolicyMutation, options);
}

export const submitDelete = (mutation, id) => {
  mutation({ variables: { id } });
}
