import React from 'react';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';
import OvalPoliciesNew from './OvalPolicies/OvalPoliciesNew';

export default [
  {
    path: '/compliance/oval_policies',
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true
  },
  {
    path: '/compliance/oval_policies/new',
    render: props => <OvalPoliciesNew {...props} />,
    exact: true
  }
];
