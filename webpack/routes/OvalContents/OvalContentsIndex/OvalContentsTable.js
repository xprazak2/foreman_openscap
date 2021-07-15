import React from 'react';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';

import withLoading from '../../../components/withLoading';
import IndexTable from '../../../components/IndexTable';

import { linkCell } from '../../../helpers/tableHelper';
import { ovalContentsPath, modelPath } from '../../../helpers/pathsHelper';

const OvalContentsTable = props => {
  const columns = [{ title: __('Name') }];

  const rows = props.ovalContents.map(ovalContent => ({
    cells: [
      {
        title: linkCell(
          modelPath(ovalContentsPath, ovalContent),
          ovalContent.name
        ),
      },
    ],
    ovalContent,
  }));

  const actions = [];

  return (
    <IndexTable
      columns={columns}
      rows={rows}
      actions={actions}
      pagination={props.pagination}
      totalCount={props.totalCount}
      history={props.history}
      ariaTableLabel={__('OVAL Contents table')}
    />
  );
};

OvalContentsTable.propTypes = {
  ovalContents: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
};

export default withLoading(OvalContentsTable);
