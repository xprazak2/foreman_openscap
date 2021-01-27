import React from 'react';
import OvalPoliciesIndex from './OvalPolicies/OvalPoliciesIndex';

export default [
  {
    path: '/compliance/oval_policies',
    render: props => <OvalPoliciesIndex {...props} />,
    exact: true
  }
];
