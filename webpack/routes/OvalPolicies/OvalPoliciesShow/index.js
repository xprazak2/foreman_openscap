import React from 'react';
import { useQuery } from '@apollo/client';

import OvalPoliciesShow from './OvalPoliciesShow';
import { encodeId } from '../../../helpers/globalIdHelper';

import ovalPolicy from '../../../graphql/queries/ovalPolicy.gql';

const WrappedOvalPoliciesShow = props => {
  const id = encodeId('ForemanOpenscap::OvalPolicy', props.match.params.id);

  const fetchFn = (props) => useQuery(ovalPolicy, { variables: { id }});

  const renameData = data => ({ policy: data.ovalPolicy });

  return (
    <OvalPoliciesShow
      {...props}
      fetchFn={fetchFn}
      renameData={renameData}
      resultPath='ovalPolicy'
      emptyStateTitle={__('No OVAL Policy found')}
    />
  )
}

export default WrappedOvalPoliciesShow;
