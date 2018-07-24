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
    case SCAP_CONTENT_PROFILES_SUCCESS: {
      const { page, per_page, subtotal, results } = payload;
      return { ...state,
               ...{ loading: false,
                    profiles: { results,
                                itemCount: Number(subtotal),
                                pagination: { page: Number(page),
                                              perPage: Number(per_page)
                                            } } } };
    }
    case SCAP_CONTENT_PROFILES_FAILURE:
      return { ...state, ...{ error: payload.error, loading: false } };
    default:
      return state;
  }
}

export default scapContentProfiles;
