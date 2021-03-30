import React from 'react'
import { Field as FormikField } from 'formik';
import { Form as PfForm, FormGroup, TextInput, TextArea, FormSelect, FormSelectOption, Spinner } from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';


import { useQuery } from '@apollo/client';
import ovalContentsQuery from '../../../../graphql/queries/ovalContents.gql';

const OvalContentSelect = props => {
  const {ovalContents, field, form} = props;
  const fieldProps = wrapFieldProps(field);

  const valid = shouldValidate(form, field.name)

  return (
    <FormGroup
      label={props.label}
      isRequired={props.isRequired}
      helperTextInvalid={form.errors[field.name]}
      helperTextInvalidIcon={<ExclamationCircleIcon />}
      validated={valid}
    >

      <FormSelect {...fieldProps} className="without_select2" aria-label={fieldProps.name} validated={valid}>
        <FormSelectOption key={0} value="" label="Choose OVAL Content" />
        {
          ovalContents.map((item, idx) => (
            <FormSelectOption key={idx + 1} value={item.id} label={item.name} />
          ))
        }
      </FormSelect>
    </FormGroup>
  )
}

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

const TextField = fieldWithHandlers(TextInput);
const TextAreaField = fieldWithHandlers(TextArea);

const GeneralStep = props => {
  const { loading, data, error } = useQuery(ovalContentsQuery);

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>{ error.message }</div>
  }

  const nameProps = {
    label: "Name",
    isRequired: true,
  }

  const scheduleProps = {
    label: "Schedule",
    isRequired: true
  }

  const ovalContentProps = {
    label: "OVAL Content",
    isRequired: true
  }

  return (
    <React.Fragment>
      <PfForm>
        <FormikField name="name" component={TextField} {...nameProps} />
        <FormikField name="description" component={TextAreaField} label="Description" />
        <FormikField name="cronLine" component={TextField} {...scheduleProps} />
        <FormikField name="ovalContentId" component={OvalContentSelect} ovalContents={data.ovalContents.nodes} {...ovalContentProps} />
      </PfForm>
    </React.Fragment>
  )
}

export default GeneralStep;