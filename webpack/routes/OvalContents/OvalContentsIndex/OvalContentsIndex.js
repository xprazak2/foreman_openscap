import React from 'react';
import { useQuery } from '@apollo/client';
import { translate as __ } from 'foremanReact/common/I18n';

import IndexLayout from '../../../components/IndexLayout';
import OvalContentsTable from './OvalContentsTable';
import { paramsToVars, currentPagination } from '../../../helpers/pageParamsHelper';
import ovalContentsQuery from '../../../graphql/queries/ovalContents.gql';

const OvalContentsIndex = props => {

  const fetchFn = (props) => useQuery(ovalContentsQuery, { variables: paramsToVars(props.history) });

  const renameData = data => {
    return ({ ovalContents: data.ovalContents.nodes, totalCount: data.ovalContents.totalCount });
  }

  const pagination = currentPagination(props.history);

  return (
    <IndexLayout pageTitle={__('OVAL Contents')}>
      <OvalContentsTable {...props} fetchFn={fetchFn} renameData={renameData} queryName='ovalContents' pagination={pagination} />
    </IndexLayout>
  )
}

export default OvalContentsIndex;
