import React from 'react';

import PageLayout from 'foremanReact/routes/common/PageLayout/PageLayout';
import Head from 'foremanReact/components/Head';

import { Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';

import OvalPoliciesTable from './OvalPoliciesTable';

const OvalPoliciesIndex = props => {
  console.log(props);

  return (
    <React.Fragment>
      <Head><title>{__('OVAL Policies')}</title></Head>
      <Grid>
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
