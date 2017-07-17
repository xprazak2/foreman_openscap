import {
    POLICIES_REQUEST,
    POLICIES_SUCCESS,
    POLICIES_FAILURE
} from '../consts';
import { ajaxRequestAction } from 'foremanReact/redux/actions/common';

export const getPolicies = ({ url }) => dispatch =>
  ajaxRequestAction({
      dispatch,
      requestAction: POLICIES_REQUEST,
      successAction: POLICIES_SUCCESS,
      failureAction: POLICIES_FAILURE,
      url,
      item: {}
  });
