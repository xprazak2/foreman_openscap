import {
  SCAP_CONTENT_PROFILES_REQUEST,
  SCAP_CONTENT_PROFILES_SUCCESS,
  SCAP_CONTENT_PROFILES_FAILURE
} from '../consts';

import api from 'foremanReact/API';

// import { ajaxRequestAction } from 'foremanReact/redux/actions/common';

// export const getScapContentProfiles = url => dispatch =>
//   ajaxRequestAction({
//       dispatch,
//       requestAction: SCAP_CONTENT_PROFILES_REQUEST,
//       successAction: SCAP_CONTENT_PROFILES_SUCCESS,
//       failureAction: SCAP_CONTENT_PROFILES_FAILURE,
//       url,
//       item: {}
//   });

export const getScapContentProfiles = url => dispatch => {
  return (params) => {
    dispatch({ type: SCAP_CONTENT_PROFILES_REQUEST });

    return api.get(url, {}, params)
              .then(({ data }) => dispatch(({ type: SCAP_CONTENT_PROFILES_SUCCESS,
                                              payload: data })))
              .catch(error => dispatch({ type: SCAP_CONTENT_PROFILES_FAILURE,
                                         payload: { error } }))
  }
};
