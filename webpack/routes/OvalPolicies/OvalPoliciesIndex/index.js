import React from 'react';

import OvalPoliciesIndex from './OvalPoliciesIndex.js'

// import { useQuery, gql } from '@apollo/client';

// import policiesQuery from './ovalPolicies.gql';

// const query = gql`
//   query {
//     ovalPolicies {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `

const WrappedOvalPoliciesIndex = props => {
  // const { loading, error, data } = useQuery(policiesQuery);

  // if (!loading) {
  //   console.log(data);
  // }

  return (
    <OvalPoliciesIndex {...props} />
  )
}

export default WrappedOvalPoliciesIndex;
