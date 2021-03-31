import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, GridItem, TextContent, Text, TextVariants,  } from '@patternfly/react-core';

import ToastsList from 'foremanReact/components/ToastsList';

import NewOvalPolicyWizard from './NewOvalPolicyWizard';

const OvalPoliciesNew = props => {
  return (
    <React.Fragment>
      <Helmet><title>{__('Create OVAL Policy')}</title></Helmet>
      <ToastsList />
      <Grid className='scap-page-grid'>
        <GridItem span={12}>
          <TextContent>
            <Text component={TextVariants.h1}>{__('Create OVAL Policy')}</Text>
          </TextContent>
        </GridItem>
        <GridItem span={12}>
          <NewOvalPolicyWizard {...props} />
        </GridItem>
      </Grid>
    </React.Fragment>
  )
}

export default OvalPoliciesNew;