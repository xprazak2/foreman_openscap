import React from 'react';
import queryString from 'query-string';

import { linkCell } from '../../../helpers/tableHelper';
import { hostsPath } from '../../../helpers/pathsHelper';
import { decodeId } from '../../../helpers/globalIdHelper';
import { addSearch } from '../../../helpers/pageParamsHelper';

import withLoading from '../../../components/withLoading';
import IndexTable from '../../../components/IndexTable';

const CvesTable = props => {
  const columns = [
    { title: __('Ref Id') },
    { title: __('Has Errata?') },
    { title: __('Hosts Count') },
  ];

  const cveRefId = cve => (
    <a href={cve.refUrl} rel="noopener noreferrer">
      {cve.refId}
    </a>
  );

  const hostCount = cve =>
    linkCell(
      addSearch(hostsPath, { search: `cve_id = ${decodeId(cve)}` }),
      cve.hosts.nodes.length
    );

  const rows = props.cves.map(cve => ({
    cells: [
      { title: cveRefId(cve) },
      { title: cve.hasErrata ? 'Yes' : 'No' },
      { title: hostCount(cve) },
    ],
    cve,
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
      location={props.location}
      ariaTableLabel={__('Table of CVEs for OVAL policy')}
    />
  );
};

export default withLoading(CvesTable);
