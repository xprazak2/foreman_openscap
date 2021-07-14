import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import {
  Grid,
  GridItem,
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';

import withLoading from '../../../components/withLoading';

const OvalContentsShow = ({ ovalContent }) => (
  <React.Fragment>
    <Helmet>
      <title>{`${ovalContent.name} | OVAL Content`}</title>
    </Helmet>
    <Grid className="scap-page-grid">
      <GridItem span={10}>
        <Text component={TextVariants.h1}>{ovalContent.name}</Text>
      </GridItem>
      <GridItem span={2} />
      <GridItem span={12}>
        <TextContent className="pf-u-pt-md">
          <Text component={TextVariants.h3}>Name</Text>
          <Text component={TextVariants.p}>{ovalContent.name}</Text>
          <Text component={TextVariants.h3}>URL</Text>
          <Text component={TextVariants.p}>{ovalContent.url || ''}</Text>
          <Text component={TextVariants.h3}>File</Text>
          <Text component={TextVariants.p}>
            {ovalContent.originalFilename || ''}
          </Text>
        </TextContent>
      </GridItem>
    </Grid>
  </React.Fragment>
);

OvalContentsShow.propTypes = {
  ovalContent: PropTypes.object.isRequired,
};

export default withLoading(OvalContentsShow);
