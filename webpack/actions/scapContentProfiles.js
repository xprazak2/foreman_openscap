import {
  SCAP_CONTENT_PROFILES_REQUEST,
  SCAP_CONTENT_PROFILES_SUCCESS,
  SCAP_CONTENT_PROFILES_FAILURE
} from '../consts';

import { ajaxRequestAction } from 'foremanReact/redux/actions/common';

export const getScapContentProfiles = url => dispatch =>
  ajaxRequestAction({
      dispatch,
      requestAction: SCAP_CONTENT_PROFILES_REQUEST,
      successAction: SCAP_CONTENT_PROFILES_SUCCESS,
      failureAction: SCAP_CONTENT_PROFILES_FAILURE,
      url,
      item: {}
  });
