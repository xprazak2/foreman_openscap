import React from 'react';
import { translate as __ } from 'foremanReact/common/I18n';

import { Button } from '@patternfly/react-core';

import { linkCell } from '../../../helpers/tableHelper';
import { ovalPoliciesPath, ovalPoliciesNewPath, modelPath } from '../../../helpers/pathsHelper';
import IndexTable from '../../../components/IndexTable';
import withLoading from '../../../components/withLoading';

const OvalPoliciesTable = props => {
  const columns = [
    { title: __('Name') }
  ];

  const rows = props.policies.map(policy => ({ cells: [{ title: linkCell(modelPath(ovalPoliciesPath, policy), policy.name) }], policy }));

  const actions = [
    {
      title: __('Delete OVAL policy'),
      onClick: (event, rowId, rowData, extra) => {
        props.toggleModal(rowData.policy);
      }
    }
  ];

  const createBtn = (
    <Button onClick={() => props.history.push(ovalPoliciesNewPath)} variant="primary" aria-label="create_oval_policy">
      {__('Create OVAL Policy')}
    </Button>
  )

  return (
    <IndexTable
      columns={columns}
      rows={rows}
      actions={actions}
      pagination={props.pagination}
      totalCount={props.totalCount}
      history={props.history}
      location={props.location}
      ariaTableLabel={__("OVAL Policies Table")}
      toolbarBtns={createBtn}
    />
  )
}

export default withLoading(OvalPoliciesTable);
