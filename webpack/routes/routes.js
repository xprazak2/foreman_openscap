import React from 'react';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';
import OvalPoliciesNew from './OvalPolicies/OvalPoliciesNew';
import OvalPoliciesShow from './OvalPolicies/OvalPoliciesShow';

export default [
  {
    path: '/compliance/oval_policies/new',
    render: props => <OvalPoliciesNew {...props} />,
    exact: true
  },
  {
    path: '/compliance/oval_policies/:id',
    render: props => <OvalPoliciesShow {...props} />,
    exact: true
  },
  {
    path: '/compliance/oval_policies',
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true
  }
];
