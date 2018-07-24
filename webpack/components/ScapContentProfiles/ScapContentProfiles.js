import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'patternfly-react';

import * as ScapContentProfileActions from '../../actions/scapContentProfiles';

import ScapContentProfilesList from './ScapContentProfilesList';
import ScapContentProfilesListNewer from './ScapContentProfilesListNewer';

class ScapContentProfiles extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
    const { data: { scapContentProfilesUrl }, getScapContentProfiles } = this.props;
    getScapContentProfiles(scapContentProfilesUrl);
  }

  render() {
    console.log(this.props)
    const { loading, profiles } = this.props;
    return (
      <Spinner loading={loading}>
        <ScapContentProfilesListNewer rows={profiles || []} />
      </Spinner>
    )

    // return <div>Profiles!</div>
  }
}

const mapStateToProps = ({ foreman_openscap: { scapContentProfiles } }, ownProps) => {
  return scapContentProfiles;
}

export default connect(mapStateToProps, ScapContentProfileActions)(ScapContentProfiles);
