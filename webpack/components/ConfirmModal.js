import React from 'react';

import { Modal, Button, ModalVariant, Spinner } from '@patternfly/react-core';

// import { translate as __ } from 'foremanReact/common/I18n';

import './ConfirmModal.scss';

const ConfirmModal = props => {
  const [callMutation, { loading, error, data }] = props.prepareMutation();

  const actions = [
    <Button key="confirm" variant="primary" onClick={() => props.onConfirm(callMutation, props.record.id)} disabled={loading}>Confirm</Button>,
    <Button key="cancel" variant="link" onClick={(event) => props.onClose()} disabled={loading}>Cancel</Button>
  ]

  if (loading) {
    actions.push(<Spinner key="spinner" size="lg" />)
  }

  return (
    <Modal
      variant={ModalVariant.medium}
      title={props.title}
      isOpen={props.isOpen}
      className='foreman-modal'
      working={props.working}
      showClose={false}
      actions={actions}
    >
      You are about to do something destructive. Are you absolutely sure?
    </Modal>

  );
}

export default ConfirmModal;
