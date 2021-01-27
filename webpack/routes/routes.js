import React from 'react';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';
import { ovalPoliciesPath } from '../helpers/pathsHelper';

export default [
  {
    path: ovalPoliciesPath,
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true,
  },
];
