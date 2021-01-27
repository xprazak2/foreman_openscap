import React from 'react';

import PageLayout from 'foremanReact/routes/common/PageLayout/PageLayout';

import { getControllerSearchProps } from 'foremanReact/constants';

const searchProps = getControllerSearchProps('oval_policies');

const OvalPoliciesIndex = props => {
  const isLoading = false;

  return (
    <PageLayout
      header={__('OVAL Policies')}
      searchable={!isLoading}
      isLoading={isLoading}
      onSearch={() => {}}
      searchProps={searchProps}
      onBookmarkClick={() => {}}
      toastNotifications={[]}
    >
      <div>I am poolicies</div>
    </PageLayout>
  )
}

export default OvalPoliciesIndex;
