import React from 'react';
import { bindActionCreators } from 'redux';
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
    const { data: { scapContentProfilesUrl }, getScapContentProfiles } = this.props;
    getScapContentProfiles();
  }

  render() {
    const { loading, profiles, getScapContentProfiles } = this.props;

    return (
      <Spinner loading={loading}>
        <ScapContentProfilesListNewer profiles={profiles || {}} getScapContentProfiles={getScapContentProfiles} />
      </Spinner>
    )
  }
}

const mapStateToProps = ({ foreman_openscap: { scapContentProfiles } }, ownProps) => {
  return scapContentProfiles;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { data: { scapContentProfilesUrl } } = ownProps;

  return {
    getScapContentProfiles: bindActionCreators(ScapContentProfileActions.getScapContentProfiles, dispatch)(scapContentProfilesUrl)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScapContentProfiles);
