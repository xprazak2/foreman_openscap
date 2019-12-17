import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Immutable from 'seamless-immutable';

import { callOnMount, callOnPopState } from 'foremanReact/common/HOC';
import withDataReducer from 'foremanReact/routes/common/reducerHOC/withDataReducer';


import ScapContentProfiles from './ScapContentProfiles';
import * as actions from './ScapContentProfilesActions';
import { selectScapContentProfiles } from './ScapContentProfilesSelectors';

const mapStateToProps = state => ({
  scapScontentProfiles: selectScapContentProfiles(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const initialState = Immutable({
  total: 0,
  subtotal: 0,
  page: null,
  perPage: null,
  search: '',
  canCreate: false,
  sort: {
    by: null,
    order: null,
  },
  results: [],
});

export const reducers = {
  scapContentProfiles: withDataReducer('SCAP_CONTENT_PROFILES', initialState)
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  callOnMount(({ initializeScapContentProfiles }) => initializeScapContentProfiles()),
  // callOnPopState(({ initializeScapContentProfiles }) => initializeScapContentProfiles())
)(ScapContentProfiles);
