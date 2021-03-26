import React from 'react'
import { Field as FormikField } from 'formik';
import { Form as PfForm, FormGroup, TextInput, TextArea, FormSelect, FormSelectOption } from '@patternfly/react-core';

const OvalContentSelect = props => {
  const {ovalContents, ...rest} = props;
  return (
    <FormSelect {...rest} className="without_select2">
      <FormSelectOption key={0} value="" label="Choose OVAL Content" />
      {
        ovalContents.map((item, idx) => (
          <FormSelectOption key={idx + 1} value={item.id} label={item.name} />
        ))
      }
    </FormSelect>
  )
}

const GeneralStep = props => {
  console.log(props);


  return (
    <React.Fragment>
      <PfForm>
        <FormGroup label="Name" isRequired>
          <FormikField name="name" component={TextInput} />
        </FormGroup>
        <FormGroup label="Description">
          <FormikField name="description" component={TextArea} />
        </FormGroup>
        <FormGroup label="Schedule" isRequired>
          <FormikField name="cron_line" component={TextInput} />
        </FormGroup>
        <FormGroup label="OVAL Content" isRequired>
          <FormikField name="oval_content_id" component={(props) => <OvalContentSelect ovalContents={[]} {...props}/>} />
        </FormGroup>
      </PfForm>
    </React.Fragment>
  )
}

export default GeneralStep;