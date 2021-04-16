import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';
import ToastsList from 'foremanReact/components/ToastsList';

import './IndexLayout.scss'

const IndexLayout = props => {
  const {pageTitle} = props;

  return (
    <React.Fragment>
      <Helmet><title>{pageTitle}</title></Helmet>
      <ToastsList />
      <Grid className='scap-page-grid'>
        <GridItem span={12}>
          <TextContent>
            <Text component={TextVariants.h1}>{pageTitle}</Text>
          </TextContent>
        </GridItem>
        <GridItem span={12}>
          {props.children}
        </GridItem>
      </Grid>
    </React.Fragment>
  )
}

export default IndexLayout;
