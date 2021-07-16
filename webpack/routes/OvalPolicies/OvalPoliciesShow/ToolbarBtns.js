import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';

import { newJobFormPath } from './OvalPoliciesShowHelper';

import { prepareMutation } from './ToolbarBtnsHelper';

const ToolbarBtns = props => {
  const { policy, id, showToast, modalState, updateModalState } = props

  let syncButton, handleSyncButton;
  if (policy?.ovalContent?.url) {
    handleSyncButton = () => {
      props.updateModalState({
        title: __('Sync OVAL Content from a remote source'),
        text: __('The following action will update OVAL Content from url. Are you sure you want to proceed?'),
        isOpen: true,
        record: policy.ovalContent,
        prepareMutation: prepareMutation(showToast, modalState.onClose),
        onConfirm: callMutation => callMutation({ variables: { id: policy.ovalContent.id }})
      })
    }

    syncButton = <Button onClick={handleSyncButton}>{__('Sync OVAL Content')}</Button>
  }

  return (
    <Flex justifyContent={{ default: 'justifyContentFlexEnd' }} >
      <FlexItem>
        { syncButton }
      </FlexItem>
      <FlexItem>
        <Link to={newJobFormPath(policy, id)}>
          <Button variant="secondary">{__('Scan All Hostgroups')}</Button>
        </Link>
      </FlexItem>
    </Flex>
  )
}

export default ToolbarBtns;
