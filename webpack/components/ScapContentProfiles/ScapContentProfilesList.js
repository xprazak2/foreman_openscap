import React from 'react';

import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import { orderBy } from 'lodash';

import { Table as PfTable } from 'patternfly-react';

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
          transforms: [sortableTransform],
          formatters: [sortingFormatter]
        },
        cell: {
          formatters: [cellFormat]
        },
        property: 'profile_id'
      },
      {
        header: {
          label: 'Title',
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
    debugger;
    const sortedRows = sort.sorter({
      columns,
      sortingColumns,
      sort: orderBy,
      strategy: sort.strategies.byProperty
    })(rows);


    // return (
    //   <PfTable.PfProvider striped bordered hover columns={columns}>
    //     <PfTable.Header headerRows={resolve.headerRows({ columns })}/>
    //     <PfTable.Body rows={sortedRows} rowKey={'id'} />
    //   </PfTable.PfProvider>
    // )

    return <div>Profies</div>
  }
}

export default ScapContentProfilesList;