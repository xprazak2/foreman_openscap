import queryString from 'query-string';

import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

const parsePageParams = history => queryString.parse(history.location.search);

export const currentPagination = (history) => {
  const pageParams = parsePageParams(history);
  const uiSettings = useForemanSettings();

  return ({
    page: parseInt(pageParams.page) || 1,
    perPage: parseInt(pageParams.perPage) || uiSettings.perPage
  })
}

export const pageToVars = pagination => ({
  first: pagination.page * pagination.perPage,
  last: pagination.perPage
});

export const paramsToVars = history => pageToVars(currentPagination(history));
