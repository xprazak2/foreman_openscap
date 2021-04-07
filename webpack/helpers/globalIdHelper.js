import { last } from './commonHelper';

const idSeparator = '-';
const versionSeparator = ':';
const defaultVersion = '01';

export const decodeId = model => {
  const split = atob(model.id).split(idSeparator);
  return parseInt(last(split));
}

export const encodeId = (typename, id) => {
  return btoa([defaultVersion, versionSeparator, typename, idSeparator, id].join(''))
}

