import React from 'react';

import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import { orderBy } from 'lodash';
import contains from 'ramda/src/contains';

import { customHeaderFormattersDefinition } from 'patternfly-react';
import { sortableHeaderCellFormatter } from 'patternfly-react';
import { Table as PfTable } from 'patternfly-react';
import { urlBuilder } from '../../helpers';

import { Table as ForemanTable, TableBody as ForemanTableBody } from '../table';

const headerFormat = value => <PfTable.Heading>{value}</PfTable.Heading>;
const cellFormat = value => <PfTable.Cell>{value}</PfTable.Cell>;

const sourceFileFormat = (fileType) => (value, { rowData }) => {
  if (fileType === 'scap_content' && rowData.scap_content) {
    return linkFormat('scap_contents')
                     (hasPermission(rowData.scap_content.permissions))
                     ('edit_scap_contents')
                     (rowData.scap_content.id)
                     (rowData.scap_content.title)
  } else if (fileType === 'tailoring_file' && rowData.tailoring_file) {
    return linkFormat('tailoring_files')
                     (hasPermission(rowData.tailoring_file.permissions))
                     ('edit_tailoring_files')
                     (rowData.tailoring_file.id)
                     (rowData.tailoring_file.name)
  } else {
    return cellFormat('');
  }
}

const hasPermission = permissions => permission => contains(permission, permissions);

const linkFormat = controller => authorizer => permission => id => value => {
  const inner = authorizer(permission) ?
    (<a href={urlBuilder(`compliance/${controller}`, 'edit', id)}>
      { value }
    </a>) :
    value

    return cellFormat(inner);
}

const defaultSortingOrder = {
  FIRST: 'asc',
  asc: 'desc',
  desc: 'asc'
};


class ScapContentProfilesListNewer extends React.Component {
  constructor(props) {
    super(props)

    const getSortingColumns = () => this.state.sortingColumns || {};

    const sortableTransform = sort.sort({
      getSortingColumns,
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumn({
            sortingColumns: getSortingColumns(),
            sortingOrder: defaultSortingOrder,
            selectedColumn
          })
        })
      },
      strategy: sort.strategies.byProperty
    });

    const sortingFormatter = sort.header({
      sortableTransform,
      getSortingColumns,
      strategy: sort.strategies.byProperty
    });

    const cols = [
      {
        header: {
          label: 'Profile ID',
          props: {
            index: 0,
            sort: true
          },
          transforms: [sortableTransform],
          formatters: [sortingFormatter],
          customFormatters: [sortableHeaderCellFormatter]
        },
        cell: {
          formatters: [cellFormat]
        },
        property: 'profile_id'
      },
      {
        header: {
          label: 'Title',
          props: {
            index: 1,
            sort: true
          },
          transforms: [sortableTransform],
          formatters: [sortingFormatter],
          customFormatters: [sortableHeaderCellFormatter]
        },
        cell: {
          formatters: [cellFormat]
        },
        property: 'title'
      },
      {
        header: {
          label: 'Scap Content',
          props: {
            index: 2,
            sort: true
          },
          transforms: [sortableTransform],
          formatters: [sortingFormatter],
          customFormatters: [sortableHeaderCellFormatter]
        },
        cell: {
          formatters: [sourceFileFormat('scap_content')]
        },
        property: 'scap_content'
      },
      {
        header: {
          label: 'Tailoring File',
          props: {
            index: 3,
            sort: true
          },
          transforms: [sortableTransform],
          formatters: [sortingFormatter],
          customFormatters: [sortableHeaderCellFormatter]
        },
        cell: {
          formatters: [sourceFileFormat('tailoring_file')]
        },
        property: 'tailoring_file'
      }
    ];


    this.state = {
      sortingColumns: {
        profile_id: {
          direction: 'asc',
          position: 0
        }
      },
      columns: cols,
      rows: this.props.rows
    }

    // enables patternfly custom header formatters extensions to reactabular
    this.customHeaderFormatters = customHeaderFormattersDefinition;
  }


  render() {
    const {rows, sortingColumns, columns } = this.state;

    console.log('state')
    console.log(this.state)

    const sortedRows = sort.sorter({
      columns: columns,
      sortingColumns,
      sort: orderBy,
      strategy: sort.strategies.byProperty
    })(rows);

    return (
      <div>
        <PfTable.PfProvider striped
                            bordered
                            hover
                            dataTable
                            columns={columns}
                            className="openscap-patternfly"
                            components={{
                              header: {
                                cell: cellProps =>
                                  this.customHeaderFormatters({
                                    cellProps,
                                    columns,
                                    sortingColumns
                                  })
                              }
                            }}>
          <PfTable.Header headerRows={resolve.headerRows({ columns })}/>
          <PfTable.Body rows={sortedRows} rowKey={'id'} />
        </PfTable.PfProvider>
      </div>
    )
  }
}

export default ScapContentProfilesListNewer;
