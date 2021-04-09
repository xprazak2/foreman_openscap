import React from 'react';
import { Link } from 'react-router-dom';
import { TableText } from '@patternfly/react-table';

import { decodeId } from './globalIdHelper';

export const linkCell = (basePath, model) => {
  return (
    <TableText>
      <Link to={`${basePath}/${decodeId(model)}`}>
        { model.name }
      </Link>
    </TableText>
  )
}
