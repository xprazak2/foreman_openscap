import { translate as __, sprintf } from 'foremanReact/common/I18n';

export const permissionCheck = (user, permissionsRequired) => {
  if (!user) {
    return { allowed: false };
  }

  if (user.admin) {
    return { allowed: true };
  }

  const permList = permissionsRequired.reduce((memo, item) => {
    const found = user.permissions.nodes.find(
      permission => permission.name === item
    );
    memo.push({ name: item, present: !!found });
    return memo;
  }, []);

  if (permList.reduce((memo, item) => memo && item.present, true)) {
    return { allowed: true, permissions: permList };
  }

  return { allowed: false, permissions: permList };
};

export const permissionDeniedMsg = permissions => {
  let msg = __('You are not authorized to view the page. ');
  if (permissions?.length > 0) {
    msg += sprintf(
      __('Request the following permissions from administrator: %s.'),
      permissions.join(', ')
    );
  }
  return msg;
};
