import React from 'react';

import withLoading from '../../../components/withLoading';
import IndexTable from '../../../components/IndexTable';

const OvalContentsTable = props => {
  console.log(props);

  const columns = [
    { title: __('Name') }
  ];

  const rows = props.ovalContents.map(ovalContent => ({ cells: [{ title: ovalContent.name }], ovalContent }));

  const actions = [];

  return (
    <IndexTable
      columns={columns}
      rows={rows}
      actions={actions}
      pagination={props.pagination}
      totalCount={props.totalCount}
      history={props.history}
      location={props.location}
      ariaTableLabel={__('OVAL Contents table')}
    />
  )
}

export default withLoading(OvalContentsTable);
