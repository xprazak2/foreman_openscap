import React from 'react';

import * as sort from 'foremanReact/sortabular/src';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import { orderBy } from 'lodash';

import { customHeaderFormattersDefinition } from 'foremanReact/patternfly-react/packages/core/src';
// import { customHeaderFormattersDefinition } from 'patternfly-react';
import { sortableHeaderCellFormatter } from 'patternfly-react';
import { Table as PfTable } from 'patternfly-react';



// import { customHeaderFormattersDefinition,
//          sortableHeaderCellFormatter,
//          Table as PfTable } from 'patternfly-react';

const headerFormat = value => <PfTable.Heading>{value}</PfTable.Heading>;
const cellFormat = value => <PfTable.Cell>{value}</PfTable.Cell>;


const defaultSortingOrder = {
  FIRST: 'asc',
  asc: 'desc',
  desc: 'asc'
};



class ScapContentProfilesList extends React.Component {
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
            rowSpan: 1,
            colSpan: 1,
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
            index: 1
          },
          formatters: [headerFormat]
        },
        cell: {
          formatters: [cellFormat]
        },
        property: 'title'
      },
      {
        header: {
          label: 'ID',
          props: {
            index: 2
          },
          formatters: [headerFormat]
        },
        cell: {
          formatters: [cellFormat]
        },
        property: 'id'
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
    )

    // return <div>Profies</div>
  }
}

export default ScapContentProfilesList;