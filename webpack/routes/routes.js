import React from 'react';
import OvalContentsIndex from './OvalContents/OvalContentsIndex';
import OvalContentsNew from './OvalContents/OvalContentsNew';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';
import OvalPoliciesShow from './OvalPolicies/OvalPoliciesShow';

import {
  ovalContentsPath,
  ovalContentsNewPath,
  ovalPoliciesPath,
  ovalPoliciesShowPath,
} from '../helpers/pathsHelper';

export default [
  {
    path: ovalContentsPath,
    render: props => <OvalContentsIndex {...props} />,
    exact: true,
  },
  {
    path: ovalContentsNewPath,
    render: props => <OvalContentsNew {...props} />,
    exact: true,
  },
  {
    path: ovalPoliciesPath,
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true,
  },
  {
    path: ovalPoliciesShowPath,
    render: props => <OvalPoliciesShow {...props} />,
    exact: true,
  },
];
