import { decodeId } from './globalIdHelper';


export const modelPath = (basePath, model) => `${basePath}/${decodeId(model)}`;
// export const resolvePath = (path, params) => Object.entries(params).reduce((memo, [key, value]) => path.replace(key, value), path);


const showPath = path => `${path}/:id`;

export const ovalContentsPath = '/compliance/oval_contents';

export const ovalPoliciesPath = '/compliance/oval_policies';
export const ovalPoliciesShowPath = showPath(ovalPoliciesPath);
export const ovalPoliciesNewPath = '/compliance/oval_policies/new';
export const hostsPath = '/hosts';
export const hostsShowPath = showPath(hostsPath);
