import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import { Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';

import ToastsList from 'foremanReact/components/ToastsList';

import ConfirmModal from '../../../components/ConfirmModal';
import OvalPoliciesTable from './OvalPoliciesTable';

import { submitDelete, prepareMutation } from './OvalPoliciesIndexHelpers';
import './OvalPoliciesIndex.scss';

const OvalPoliciesIndex = props => {
  const [policy, setPolicy] = useState(null);

  const toggleModal = (policyToDelete = null) => {
    setPolicy(policyToDelete);
  }

  return (
    <React.Fragment>
      <Helmet><title>{__('OVAL Policies')}</title></Helmet>
      <ToastsList />
      <Grid className='scap-page-grid'>
        <GridItem span={12}>
          <TextContent>
            <Text component={TextVariants.h1}>{__('OVAL Policies')}</Text>
          </TextContent>
        </GridItem>
        <GridItem span={12}>
          <OvalPoliciesTable {...props} toggleModal={toggleModal} />
        </GridItem>
      </Grid>
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
