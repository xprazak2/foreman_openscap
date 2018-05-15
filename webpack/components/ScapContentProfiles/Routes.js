import React from 'react';
import { Route } from 'react-router-dom';

import ScapContentProfiles from './ScapContentProfiles';

const links = [
  {
    title: 'XCCDF Rules',
    path: 'compliance/scap_content_profiles',
    Component: ScapContentProfiles,
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
