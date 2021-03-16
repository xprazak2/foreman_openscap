import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import { Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';

import ConfirmModal from '../../../components/ConfirmModal';
import OvalPoliciesTable from './OvalPoliciesTable';
import './OvalPoliciesIndex.scss';

const OvalPoliciesIndex = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [policy, setPolicy] = useState(null);

  const toggleModal = (policy = null) => {
    setPolicy(policy);
    setModalOpen(!modalOpen);
  }

  const submitDelete = () => {
    console.log('Deleting policy: ', policy);
    toggleModal();
  }

  return (
    <React.Fragment>
      <Helmet><title>{__('OVAL Policies')}</title></Helmet>
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
      <ConfirmModal title='Delete OVAL Policy' onClose={toggleModal} isOpen={modalOpen} onConfirm={submitDelete} />
    </React.Fragment>
  )
}

export default OvalPoliciesIndex;
