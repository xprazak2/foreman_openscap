import React from 'react';
import { Link } from 'react-router-dom';
import { TableText } from '@patternfly/react-table';

import { decodeId } from './globalIdHelper';

export const linkCell = (path, text) => {
  return (
    <TableText>
      <Link to={path}>
        { text }
      </Link>
    </TableText>
  )
}
