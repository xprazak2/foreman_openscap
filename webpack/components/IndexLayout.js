import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ToastsList from 'foremanReact/components/ToastsList'
import {
  Grid,
  GridItem,
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';

import './IndexLayout.scss';

const IndexLayout = ({ pageTitle, children }) => (
  <React.Fragment>
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
    <ToastsList />
    <Grid className="scap-page-grid">
      <GridItem span={12}>
        <TextContent>
          <Text component={TextVariants.h1}>{pageTitle}</Text>
        </TextContent>
      </GridItem>
      <GridItem span={12}>{children}</GridItem>
    </Grid>
  </React.Fragment>
);

IndexLayout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default IndexLayout;
