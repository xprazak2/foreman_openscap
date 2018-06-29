import React, { Component } from 'react';
import { Spinner, Table, Alert } from 'patternfly-react';
import { Table as ForemanTable, TableBody as ForemanTableBody } from '../Table';

import columns from './ScapContentProfileColumns';

const emptyStateData = {
  header: __('There are no Scap Content Profiles to display'),
  description: __('Scap Content Profiles are created when Scap Content is uploaded.'),
  documentation: {
    title: __('Learn more about uploading Scap Content'),
    url: 'http://redhat.com',
  },
  action: {
    title: __('Upload Scap Content'),
    url: 'xxxx',
  },
};


class ScapContentProfilesTable extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps')
    console.log(nextProps)
    console.log('prevState')
    console.log(prevState)
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      sortingColumns: {
        profile_id: {
          direction: 'asc',
          position: 0
        }
      },
      columns: columns,
      rows: this.props.rows
    }
  }

}