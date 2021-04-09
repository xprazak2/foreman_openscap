import React from 'react';
import { useQuery } from '@apollo/client';

import { Helmet } from 'react-helmet';
import { Grid, GridItem, TextContent, Text, TextVariants, Flex, FlexItem, Button, Tabs, Tab, TabTitleText } from '@patternfly/react-core';

import Loading from '../../../components/Loading';
import EmptyState from '../../../components/EmptyState';
import HostsTab from './HostsTab';

import { policySchedule } from './OvalPoliciesShowHelper';
import { encodeId } from '../../../helpers/globalIdHelper';
import { last } from '../../../helpers/commonHelper';
import ovalPolicy from '../../../graphql/queries/ovalPolicy.gql';

const errorStateTitle = __('Error!');
const emptyStateBody = "";

const OvalPoliciesShow = props => {
  console.log(props);
  const id = encodeId('ForemanOpenscap::OvalPolicy', props.match.params.id);

  const { loading, error, data } = useQuery(ovalPolicy, { variables: { id }})

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <EmptyState error={error} title={errorStateTitle} body={error.message} />
  }

  const policy = data.ovalPolicy;

  const parseHash = location => last(location.hash.split('#'))

  const parseActiveTab = defaultValue => location => {
    const active = parseHash(location)
    if (active === '') {
      return defaultValue;
    }
    return active;
  }

  const activeTab = parseActiveTab('details')(props.location);

  const handleTabSelect = (history, location) => (event, value) => {
    history.push({ pathname: location.pathname, hash: `#${value}` })
  }

  return (
    <React.Fragment>
      <Helmet><title>{`${policy.name} | OVAL Policy`}</title></Helmet>
      <Grid className='scap-page-grid'>
        <GridItem span={12}>
          <Text component={TextVariants.h1}>{policy.name}</Text>
        </GridItem>

        <GridItem span={12}>
          <Tabs mountOnEnter activeKey={activeTab} onSelect={handleTabSelect(props.history, props.location)} >
            <Tab eventKey='details' title={<TabTitleText>Details</TabTitleText>}>
              <TextContent>
                <Text component={TextVariants.h3}>Period</Text>
                <Text component={TextVariants.p}>{policySchedule(policy)}</Text>
                <Text component={TextVariants.h3}>Description</Text>
                <Text component={TextVariants.p}>{policy.description}</Text>
              </TextContent>
            </Tab>
            <Tab eventKey='hosts' title={<TabTitleText>Hosts</TabTitleText>}>
              <HostsTab {...props} />
            </Tab>
          </Tabs>
        </GridItem>
      </Grid>
    </React.Fragment>
  )
}

export default OvalPoliciesShow;
