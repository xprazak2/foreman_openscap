import React from 'react';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';
import OvalPoliciesNew from './OvalPolicies/OvalPoliciesNew';
import OvalPoliciesShow from './OvalPolicies/OvalPoliciesShow';

import OvalContentsIndex from './OvalContents/OvalContentsIndex';

import { ovalContentsPath } from '../helpers/pathsHelper';

export default [
  {
    path: '/compliance/oval_policies/new',
    render: props => <OvalPoliciesNew {...props} />,
    exact: true
  },
  {
    path: '/compliance/oval_policies/:id/:tab?',
    render: props => <OvalPoliciesShow {...props} />,
    exact: true
  },
  {
    path: '/compliance/oval_policies',
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true
  },
  {
    path: ovalContentsPath,
    render: props => <OvalContentsIndex {...props} />,
    exact: true
  }
];
