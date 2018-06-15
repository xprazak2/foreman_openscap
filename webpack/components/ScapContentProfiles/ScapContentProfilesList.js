import React from 'react';

import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import { orderBy } from 'lodash';

import { customHeaderFormattersDefinition } from 'patternfly-react';
import { sortableHeaderCellFormatter } from 'patternfly-react';
import { Table as PfTable } from 'patternfly-react';
import { urlBuilder } from '../../helper';

const headerFormat = value => <PfTable.Heading>{value}</PfTable.Heading>;
const cellFormat = value => <PfTable.Cell>{value}</PfTable.Cell>;

const linkFormat = controller => id => value => <PfTable.Cell>
  <a href={urlBuilder(`compliance/${controller}`, '', id)}>
    { value }
  </a>
</PfTable.Cell>;

const defaultSortingOrder = {
  FIRST: 'asc',
  asc: 'desc',
  desc: 'asc'
};



class ScapContentProfilesList extends React.Component {
  constructor(props) {
    super(props)

    const getSortingColumns = () => this.state.sortingColumns || {};

    const flattenRows = rows => {
      return rows.map(row => {
        const contentAttrs = row.scap_content ?
          { scap_content_id: row.scap_content.id ,
            scap_content_title: row.scap_content.title } :
          { tailoring_file_id: row.tailoring_file.id ,
            tailoring_file_name : row.tailoring_file.name }

        return Object.assign({ id: row.id,
                               title: row.title,
                               profile_id: row.profile_id }, contentAttrs)
      });
    }


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
          formatters: [cellFormat]
        },
        property: 'scap_content_title'
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
          formatters: [cellFormat]
        },
        property: 'tailoring_file_name'
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
      rows: flattenRows(this.props.rows)
    }

    // enables our custom header formatters extensions to reactabular
    this.customHeaderFormatters = customHeaderFormattersDefinition;
  }


  render() {
    const {rows, sortingColumns, columns } = this.state;

    console.log('state')
    console.log(this.state)

    // const sortedRows = compose(
    //   sort.sorter({
    //     columns,
    //     sortingColumns,
    //     sort: orderBy,
    //     strategy: sort.strategies.byProperty
    //   })
    // )(rows);
    // debugger;
    const sortedRows = sort.sorter({
      columns: columns,
      sortingColumns,
      sort: orderBy,
      strategy: sort.strategies.byProperty
    })(rows);

    return (
      <div>
        <div className="oscap-red">
          Penenenee
        </div>
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

export default ScapContentProfilesList;
