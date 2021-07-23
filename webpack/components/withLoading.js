import React from 'react';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';
import Loading from 'foremanReact/components/Loading';
import {
  permissionCheck,
  permissionDeniedMsg,
} from '../helpers/permissionsHelper';

import EmptyState from './EmptyState';

const errorStateTitle = __('Error!');
const emptyStateBody = '';

const pluckData = (data, path) => {
  const split = path.split('.');
  return split.reduce((memo, item) => {
    if (item) {
      return memo[item];
    }
    throw new Error('Unexpected empty segment in response data path');
  }, data);
};

const withLoading = Component => {
  const Subcomponent = ({
    fetchFn,
    resultPath,
    renameData,
    emptyStateTitle,
    permissions,
    ...rest
  }) => {
    const { loading, error, data } = fetchFn(rest);

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <EmptyState
          error={error}
          title={errorStateTitle}
          body={error.message}
        />
      );
    }

    const check = permissionCheck(data.currentUser, permissions);

    if (!check.allowed) {
      return (
        <EmptyState
          lock
          title={__('Permission denied')}
          body={permissionDeniedMsg(check.permissions.map(item => item.name))}
        />
      );
    }

    const result = pluckData(data, resultPath);

    if ((Array.isArray(result) && result.length === 0) || !result) {
      return <EmptyState title={emptyStateTitle} body={emptyStateBody} />;
    }

    return <Component {...rest} {...renameData(data)} />;
  };

  Subcomponent.propTypes = {
    fetchFn: PropTypes.func.isRequired,
    resultPath: PropTypes.string.isRequired,
    renameData: PropTypes.func,
    emptyStateTitle: PropTypes.string.isRequired,
    permissions: PropTypes.array,
  };

  Subcomponent.defaultProps = {
    renameData: data => data,
    permissions: [],
  };

  return Subcomponent;
};

export default withLoading;
