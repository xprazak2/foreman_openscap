import React from 'react';
import { connect } from 'react-redux';
import * as ScapContentProfileActions from '../../actions/scapContentProfiles';

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
    return <div>I am xccdf rules!</div>;
  }
}

const mapStateToProps = ({ scapContentProfiles }, ownProps) => {
  return scapContentProfiles || {};
}

export default connect(mapStateToProps, ScapContentProfileActions)(ScapContentProfiles);
// export default ScapContentProfiles;
