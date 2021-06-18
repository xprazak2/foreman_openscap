import React from 'react';

import { Form as PfForm, FormGroup, TextInput, TextArea, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const wrapFieldProps = fieldProps => {
  const { onChange } = fieldProps;
  // modify onChange args to correctly wire formik with pf4 input handlers
  const wrappedOnChange = (value, event) => {
    onChange(event);
  }

  return ({ ...fieldProps, onChange: wrappedOnChange });
}

const shouldValidate = (form, fieldName) => {
  if (form.touched[fieldName]) {
    return form.errors[fieldName] ? 'error' : 'success'
  }

  return 'noval';
}

// extract FormGroup to a separate decorator?
const fieldWithHandlers = Component => props => {
  const { form, field } = props;

  const fieldProps = wrapFieldProps(field);
  const valid = shouldValidate(form, field.name);

  return (
    <FormGroup
      label={props.label}
      isRequired={props.isRequired}
      helperTextInvalid={form.errors[field.name]}
      helperTextInvalidIcon={<ExclamationCircleIcon />}
      validated={valid}
    >
      <Component aria-label={fieldProps.name} {...fieldProps} validated={valid} isDisabled={form.isSubmitting} />
    </FormGroup>
  );
}

export const TextField = fieldWithHandlers(TextInput);
