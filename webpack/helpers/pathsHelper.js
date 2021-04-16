import { decodeId } from './globalIdHelper';

export const modelPath = (basePath, model) => `${basePath}/${decodeId(model)}`;
// react-router uses path-to-regexp, should we use it as well in a future?
// https://github.com/pillarjs/path-to-regexp/tree/v1.7.0#compile-reverse-path-to-regexp
export const resolvePath = (path, params) => Object.entries(params).reduce((memo, [key, value]) => memo.replace(key, value), path);

const showPath = path => `${path}/:id`;

export const ovalContentsPath = '/compliance/oval_contents';

export const ovalPoliciesPath = '/compliance/oval_policies';
export const ovalPoliciesShowPath = `${showPath(ovalPoliciesPath)}/:tab?`;
export const ovalPoliciesNewPath = '/compliance/oval_policies/new';
export const hostsPath = '/hosts';
export const hostsShowPath = showPath(hostsPath);
