import React from 'react';
import OvalContentsIndex from './OvalContents/OvalContentsIndex';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';
import OvalPoliciesNew from './OvalPolicies/OvalPoliciesNew';
import OvalPoliciesShow from './OvalPolicies/OvalPoliciesShow';

import {
  ovalContentsPath,
  ovalPoliciesPath,
  ovalPoliciesShowPath,
  ovalPoliciesNewPath,
} from '../helpers/pathsHelper';

export default [
  {
    path: ovalContentsPath,
    render: props => <OvalContentsIndex {...props} />,
    exact: true,
  },
  {
    path: ovalPoliciesPath,
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true,
  },
  {
    path: ovalPoliciesNewPath,
    render: props => <OvalPoliciesNew {...props} />,
    exact: true
  },
  {
    path: ovalPoliciesShowPath,
    render: props => <OvalPoliciesShow {...props} />,
    exact: true,
  }
];
