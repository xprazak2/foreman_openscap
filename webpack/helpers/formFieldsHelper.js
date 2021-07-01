import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, TextInput } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const wrapFieldProps = fieldProps => {
  const { onChange } = fieldProps;
  // modify onChange args to correctly wire formik with pf4 input handlers
  const wrappedOnChange = (value, event) => {
    onChange(event);
  };

  return { ...fieldProps, onChange: wrappedOnChange };
};

const shouldValidate = (form, fieldName) => {
  if (form.touched[fieldName]) {
    return form.errors[fieldName] ? 'error' : 'success';
  }

  return 'noval';
};

const fieldWithHandlers = Component => {
  const Subcomponent = ({ label, form, field, isRequired }) => {
    const fieldProps = wrapFieldProps(field);
    const valid = shouldValidate(form, field.name);

    return (
      <FormGroup
        label={label}
        isRequired={isRequired}
        helperTextInvalid={form.errors[field.name]}
        helperTextInvalidIcon={<ExclamationCircleIcon />}
        validated={valid}
      >
        <Component
          aria-label={fieldProps.name}
          {...fieldProps}
          validated={valid}
          isDisabled={form.isSubmitting}
        />
      </FormGroup>
    );
  };

  Subcomponent.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
  };

  Subcomponent.defaultProps = {
    isRequired: false,
  };

  return Subcomponent;
};

export const TextField = fieldWithHandlers(TextInput);
