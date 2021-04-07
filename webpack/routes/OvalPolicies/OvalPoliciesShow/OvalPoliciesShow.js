import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, GridItem, TextContent, Text, TextVariants, Flex, FlexItem, Button, Tabs, Tab, TabTitleText } from '@patternfly/react-core';
import '@patternfly/patternfly/patternfly-addons.scss';

import withLoading from '../../../components/withLoading';

import CvesTab from './CvesTab';

import { policySchedule } from './OvalPoliciesShowHelper';
import { resolvePath } from '../../../helpers/pathsHelper';

const OvalPoliciesShow = props => {
  const policy = props.policy;
  const activeTab = props.match.params.tab ? props.match.params.tab : 'details';

  const handleTabSelect = (history, match) => (event, value) => {
    history.push(resolvePath(match.path, { ':id': match.params.id, ':tab?': value }))
  }

  return (
    <React.Fragment>
      <Helmet><title>{`${policy.name} | OVAL Policy`}</title></Helmet>
      <Grid className='scap-page-grid'>
        <GridItem span={12}>
          <Text component={TextVariants.h1}>{policy.name}</Text>
        </GridItem>
        <GridItem span={12}>
          <Tabs mountOnEnter activeKey={activeTab} onSelect={handleTabSelect(props.history, props.match)} >
            <Tab eventKey='details' title={<TabTitleText>Details</TabTitleText>} >
              <TextContent className='pf-u-pt-md'>
                <Text component={TextVariants.h3}>Period</Text>
                <Text component={TextVariants.p}>{policySchedule(policy)}</Text>
                <Text component={TextVariants.h3}>Description</Text>
                <Text component={TextVariants.p}>{policy.description}</Text>
              </TextContent>
            </Tab>
            <Tab eventKey='cves' title={<TabTitleText>CVEs</TabTitleText>}>
              <CvesTab {...props} />
            </Tab>
          </Tabs>
        </GridItem>
      </Grid>
    </React.Fragment>
  )
}

export default withLoading(OvalPoliciesShow);
