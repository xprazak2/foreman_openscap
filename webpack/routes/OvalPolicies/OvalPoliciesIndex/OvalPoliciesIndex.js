import React from 'react';

import PageLayout from 'foremanReact/routes/common/PageLayout/PageLayout';
import Head from 'foremanReact/components/Head';

import { Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';

import OvalPoliciesTable from './OvalPoliciesTable';
import './OvalPoliciesIndex.scss';

const OvalPoliciesIndex = props => {
  return (
    <React.Fragment>
      <Head><title>{__('OVAL Policies')}</title></Head>
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
