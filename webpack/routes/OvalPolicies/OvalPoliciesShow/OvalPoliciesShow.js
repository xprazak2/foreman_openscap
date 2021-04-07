import React from 'react';
import { useQuery } from '@apollo/client';

import { Helmet } from 'react-helmet';
import { Grid, GridItem, TextContent, Text, TextVariants, Flex, FlexItem, Button } from '@patternfly/react-core';

import Loading from '../../../components/Loading';
import EmptyState from '../../../components/EmptyState';

import { policySchedule } from './OvalPoliciesShowHelper';
import { encodeId } from '../../../helpers/globalIdHelper';
import ovalPolicy from '../../../graphql/queries/ovalPolicy.gql';

const errorStateTitle = __('Error!');
const emptyStateBody = "";

const OvalPoliciesShow = props => {
  const id = encodeId('ForemanOpenscap::OvalPolicy', props.match.params.id);

  const { loading, error, data } = useQuery(ovalPolicy, { variables: { id }})

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <EmptyState error={error} title={errorStateTitle} body={error.message} />
  }

  const policy = data.ovalPolicy;

  return (
    <React.Fragment>
      <Helmet><title>{`${policy.name} | OVAL Policy`}</title></Helmet>
      <Grid className='scap-page-grid'>
        <GridItem span={12}>
          <TextContent>
            <Text component={TextVariants.h1}>{policy.name}</Text>
            <Text component={TextVariants.h3}>Period</Text>
            <Text component={TextVariants.p}>{policySchedule(policy)}</Text>
            <Text component={TextVariants.h3}>Description</Text>
            <Text component={TextVariants.p}>{policy.description}</Text>
          </TextContent>
        </GridItem>
      </Grid>
    </React.Fragment>
  )
}

export default OvalPoliciesShow;
