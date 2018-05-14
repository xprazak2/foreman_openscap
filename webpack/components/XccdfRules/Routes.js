import React from 'react';
import { Route } from 'react-router-dom';

import XccdfRules from './XccdfRules';

const links = [
  {
    title: 'XCCDF Rules',
    path: 'compliance/xccdf_rules',
    Component: XccdfRules,
  }
];

export default (data) => {
  console.log('routes data')
  console.log(data)
  return (
  <div>
    {links.map(({ path, Component }) => (
      <Route exact key={path} path={`/${path}`} render={(props) => <Component {...props} {...data} />} />
    ))}
  </div>
)};
