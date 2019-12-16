import { getControllerSearchProps } from 'foremanReact/constants';

export const SCAP_CONTENT_PROFILES_DATA_RESOLVED = 'SCAP_CONTENT_PROFILES_DATA_RESOLVED';
export const SCAP_CONTENT_PROFILES_DATA_FAILED = 'SCAP_CONTENT_PROFILES_DATA_FAILED';
export const SCAP_CONTENT_PROFILES_HIDE_LOADING = 'SCAP_CONTENT_PROFILES_HIDE_LOADING';
export const SCAP_CONTENT_PROFILES_SHOW_LOADING = 'SCAP_CONTENT_PROFILES_SHOW_LOADING';
export const SCAP_CONTENT_PROFILES_CLEAR_ERROR = 'SCAP_CONTENT_PROFILES_CLEAR_ERROR';

export const SCAP_CONTENT_PROFILES_SEARCH_PROPS = getControllerSearchProps('scap_content_profiles');
export const SCAP_CONTENT_PROFILES_API_PATH = '/api/compliance/scap_content_profiles?include_permissions=true';
export const SCAP_CONTENT_PROFILES_PATH = '/scap_content_profiles';
