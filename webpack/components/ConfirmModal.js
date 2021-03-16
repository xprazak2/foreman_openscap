import React from 'react';

import { Modal, Button, ModalVariant, Spinner } from '@patternfly/react-core';

// import { translate as __ } from 'foremanReact/common/I18n';

import './ConfirmModal.scss';

const ConfirmModal = props => {
  const actions = [
    <Button key="confirm" variant="primary" onClick={props.onConfirm} disabled={props.working}>Confirm</Button>,
    <Button key="cancel" variant="link" onClick={props.onClose} disabled={props.working}>Cancel</Button>
  ]

  if (props.working) {
    actions.push(<Spinner isSVG size="lg" />)
  }

  return (
    <Modal
      variant={ModalVariant.medium}
      title={props.title}
      isOpen={props.isOpen}
      onClose={props.onClose}
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
