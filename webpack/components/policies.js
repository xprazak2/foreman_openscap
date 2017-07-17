import React from 'react';
import { connect } from 'react-redux';
import * as PolicyActions from '../actions/policies'

class Policies extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { data: { url }, getPolicies } = this.props;
    getPolicies({ url });
  }

  render() {
    return <div>5</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    policies: state.policies || {}
  };
}

export default connect(mapStateToProps, PolicyActions)(Policies);
