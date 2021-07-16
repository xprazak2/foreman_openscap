import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { translate as __, documentLocale } from 'foremanReact/common/I18n';
import {
  Button,
  Grid,
  GridItem,
  TextContent,
  Text,
  TextVariants,
  Tabs,
  Tab,
  TabTitleText,
  Flex,
  FlexItem,
  Spinner
} from '@patternfly/react-core';

import withLoading from '../../../components/withLoading';
import IndexLayout from '../../../components/IndexLayout';

import CvesTab from './CvesTab';
import ToolbarBtns from './ToolbarBtns';

import { policySchedule, newJobFormPath } from './OvalPoliciesShowHelper';
import { resolvePath } from '../../../helpers/pathsHelper';

const OvalPoliciesShow = props => {
  const { policy, match, history } = props;
  const activeTab = match.params.tab ? match.params.tab : 'details';

  const handleTabSelect = (event, value) => {
    history.push(
      resolvePath(match.path, { ':id': match.params.id, ':tab?': value })
    );
  };

  const toolbarBtns = (
    <ToolbarBtns id={match.params.id} policy={policy} />
  );

  const formatDate = date => (new Intl.DateTimeFormat(documentLocale(), { dateStyle: 'full', timeStyle: 'medium' }).format(date))

  let contentUpdatedAt;
  const ovalContent = policy.ovalContent;

  if (ovalContent) {
    contentUpdatedAt = (
      <React.Fragment>
        <Text component={TextVariants.h3}>{__('OVAL Content')}</Text>
        <Text component={TextVariants.p}>{ovalContent.name}</Text>
        <Text component={TextVariants.h3}>{__('Last OVAL Content sync')}</Text>
        <Text component={TextVariants.p}>{ovalContent.changedAt ? formatDate(Date.parse(ovalContent.changedAt)) : __('Unknown')}</Text>
      </React.Fragment>
    )
  }

  return (
    <IndexLayout pageTitle={`${policy.name} | ${__('OVAL Policy')}`} toolbarBtns={toolbarBtns}>
      <Tabs mountOnEnter activeKey={activeTab} onSelect={handleTabSelect}>
        <Tab
          eventKey="details"
          title={<TabTitleText>Details</TabTitleText>}
        >
          <TextContent className="pf-u-pt-md">
            <Text component={TextVariants.h3}>{__('Period')}</Text>
            <Text component={TextVariants.p}>{policySchedule(policy)}</Text>
            <Text component={TextVariants.h3}>{__('Description')}</Text>
            <Text component={TextVariants.p}>{policy.description || __('None')}</Text>
            { contentUpdatedAt }
          </TextContent>
        </Tab>
        <Tab eventKey="cves" title={<TabTitleText>{__('CVEs')}</TabTitleText>}>
          <CvesTab {...props} />
        </Tab>
      </Tabs>
    </IndexLayout>
  );
};

OvalPoliciesShow.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  policy: PropTypes.object.isRequired,
};

export default withLoading(OvalPoliciesShow);
