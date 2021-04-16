import React from 'react';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';
import OvalPoliciesNew from './OvalPolicies/OvalPoliciesNew';
import OvalPoliciesShow from './OvalPolicies/OvalPoliciesShow';

import OvalContentsIndex from './OvalContents/OvalContentsIndex';

import { ovalContentsPath, ovalPoliciesShowPath, ovalPoliciesPath } from '../helpers/pathsHelper';

export default [
  {
    path: '/compliance/oval_policies/new',
    render: props => <OvalPoliciesNew {...props} />,
    exact: true
  },
  {
    path: ovalPoliciesShowPath,
    render: props => <OvalPoliciesShow {...props} />,
    exact: true
  },
  {
    path: ovalPoliciesPath,
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true
  },
  {
    path: ovalContentsPath,
    render: props => <OvalContentsIndex {...props} />,
    exact: true
  }
];
