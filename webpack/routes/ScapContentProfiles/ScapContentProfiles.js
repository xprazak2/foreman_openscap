import React from 'react';

import PageLayout from 'foremanReact/routes/common/PageLayout/PageLayout';
import { translate as __ } from 'foremanReact/common/I18n';

import { SCAP_CONTENT_PROFILES_SEARCH_PROPS } from './ScapContentProfilesConstants';

const ScapContentProfiles = props => {
  const { isLoading, hasData, fetchAndPush, search } = props;

  return (
    <PageLayout
      header={__('SCAP Content Profiles')}
      searchable
      searchProps={SCAP_CONTENT_PROFILES_SEARCH_PROPS}
      searchQuery={search}
      isLoading={isLoading && hasData}
      onSearch={() => {}}
      onBookmarkClick={() => {}}
      >
      <div>I am scap content profiles!</div>
    </PageLayout>
  );
}

export default ScapContentProfiles;
