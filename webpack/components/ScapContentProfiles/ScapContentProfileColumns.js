import React from 'react';
import { Table as PfTable } from 'patternfly-react';
import { sortableHeaderCellFormatter } from 'patternfly-react';
import contains from 'ramda/src/contains';
import { urlBuilder } from '../../helpers';


const headerFormat = value => <PfTable.Heading>{value}</PfTable.Heading>;
const cellFormat = value => <PfTable.Cell>{value}</PfTable.Cell>;

const hasPermission = permissions => permission => contains(permission, permissions);

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

const linkFormat = controller => authorizer => permission => id => value => {
  const inner = authorizer(permission) ?
    (<a href={urlBuilder(`compliance/${controller}`, 'edit', id)}>
      { value }
    </a>) :
    value

    return cellFormat(inner);
}

const columns = (sortableTransform, sortingFormatter) => [
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

export default columns;
