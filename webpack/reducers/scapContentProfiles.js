import {
  SCAP_CONTENT_PROFILES_REQUEST,
  SCAP_CONTENT_PROFILES_SUCCESS,
  SCAP_CONTENT_PROFILES_FAILURE,
} from '../consts';

const scapContentProfiles = (state = {}, action) => {
  const { payload } = action;

  switch(action.type) {
    case SCAP_CONTENT_PROFILES_REQUEST:
      return { ...state, ...{ loading: true } };
    case SCAP_CONTENT_PROFILES_SUCCESS:
      console.log(payload)
      return { ...state, ...{ loading: false, profiles: payload.results } };
    case SCAP_CONTENT_PROFILES_FAILURE:
      return { ...state, ...{ error: payload.error, loading: false } };
    default:
      return state;
  }
}

export default scapContentProfiles;
