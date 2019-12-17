import {
  SCAP_CONTENT_PROFILES_DATA_RESOLVED,
  SCAP_CONTENT_PROFILES_DATA_FAILED,
  SCAP_CONTENT_PROFILES_CLEAR_ERROR,
  SCAP_CONTENT_PROFILES_SHOW_LOADING,
  SCAP_CONTENT_PROFILES_API_PATH,
  SCAP_CONTENT_PROFILES_PATH,
} from './ScapContentProfilesConstants';

import { stringifyParams, getParams } from 'foremanReact/common/urlHelpers';
import { deepPropsToCamelCase } from 'foremanReact/common/helpers';

export const initializeModels = () => dispatch => {
  const params = getParams();
  dispatch(fetchScapContents(params));
  if (!history.action === 'POP') {
    history.replace({
      pathname: SCAP_CONTENT_PROFILES,
      search: stringifyParams(params),
    });
  }
};

export const fetchScapContents = (
  { page, perPage, searchQuery, sort },
  url = SCAP_CONTENT_PROFILES_API_PATH
) => async (dispatch, getState) => {
  dispatch({ type: SCAP_CONTENT_PROFILES_SHOW_LOADING });

  if (selectHasError(getState())) {
    dispatch({ type: SCAP_CONTENT_PROFILES_CLEAR_ERROR });
  }

  try {
    const sortString =
      sort && Object.keys(sort).length > 0 ? `${sort.by} ${sort.order}` : '';

    const { data } = await API.get(
      url,
      {},
      {
        page,
        per_page: perPage,
        search: searchQuery,
        order: sortString,
      }
    );

    const transformedResponse = deepPropsToCamelCase(data);

    dispatch({
      type: SCAP_CONTENT_PROFILES_DATA_RESOLVED,
      payload: {
        ...transformedResponse,
        hasData: transformedResponse.subtotal > 0,
        isLoading: false,
      },
    });
  } catch (error) {
    dispatch({
      type: SCAP_CONTENT_PROFILES_DATA_FAILED,
      payload: {
        message: {
          type: 'error',
          text: `${error.response.status} ${__(error.response.statusText)}`,
        },
        isLoading: false,
      },
    });
  }
};
