import queryString from 'query-string';

export const preparePerPageOptions = (opts) => opts.map(item => ({ title: item.toString(), value: item }));

export const refreshPage = (history, params = {}) => {
  let stringyfied = '';
  if (Object.keys(params).length > 0) {
    stringyfied = `?${queryString.stringify(params)}`
  }

  const url = `${history.location.pathname}${stringyfied}`
  history.push(url);
}
