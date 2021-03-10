import React from 'react';
import { Helmet } from 'react-helmet';

import { Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';

import OvalPoliciesTable from './OvalPoliciesTable';
import './OvalPoliciesIndex.scss';

const OvalPoliciesIndex = props => {
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
          <OvalPoliciesTable {...props} />
        </GridItem>
      </Grid>
    </React.Fragment>
  )
}

export default OvalPoliciesIndex;
