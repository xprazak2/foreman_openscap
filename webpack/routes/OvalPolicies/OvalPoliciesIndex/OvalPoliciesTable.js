import React from 'react';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';

import IndexTable from '../../../components/IndexTable';
import withLoading from '../../../components/withLoading';

const OvalPoliciesTable = props => {
  const columns = [{ title: __('Name') }];

  const rows = props.policies.map(policy => ({
    cells: [{ title: policy.name }],
    policy,
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
      ariaTableLabel={__('OVAL Policies Table')}
    />
  );
};

OvalPoliciesTable.propTypes = {
  policies: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
};

export default withLoading(OvalPoliciesTable);
