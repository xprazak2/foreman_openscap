import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'patternfly-react';

import * as ScapContentProfileActions from '../../actions/scapContentProfiles';

import ScapContentProfilesList from './ScapContentProfilesList';

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
    const { loading, profiles } = this.props;

    return (
      <Spinner loading={loading}>
        <ScapContentProfilesList rows={profiles || []} />
      </Spinner>
    )

    // return <div>Profiles!</div>
  }
}

const mapStateToProps = ({ foreman_openscap: { scapContentProfiles } }, ownProps) => {
  return scapContentProfiles;
}

export default connect(mapStateToProps, ScapContentProfileActions)(ScapContentProfiles);
