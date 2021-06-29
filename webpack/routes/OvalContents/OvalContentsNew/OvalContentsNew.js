import React, { useState } from 'react';
import { translate as __ } from 'foremanReact/common/I18n';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Field as FormikField } from 'formik';
import { submitForm } from './OvalContentsNewActions';

import { Form as PfForm, ActionGroup, Button, Grid, GridItem, FileUpload, FormGroup } from '@patternfly/react-core';
import IndexLayout from '../../../components/IndexLayout';
import { TextField } from '../../../helpers/formFieldsHelper';

const OvalContentsNew = props => {
  const [file, setFile] = useState(null);
  const [fileTouched, setFileTouched] = useState(false);

  const handleFileChange = (value, filename, event) => {
    console.log(value, event)
    setFile(value);
    setFileTouched(true);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("can't be blank")
  })

  const validateFile = (file, touched) => {
    if (!touched) {
      return 'default'
    }

    return file ? 'success' : 'error';
  }

  const submitDisabled = (formProps, file) => {
    return formProps.isSubmitting || !formProps.isValid || !file;
  }

  return (
    <IndexLayout pageTitle={__('New OVAL Policy')} >
      <Formik
        onSubmit={(values, actions) => {
          const formData = new FormData();
          console.log(file)
          formData.append('oval_content[scap_file]', file)
          formData.append('oval_content[name]', values.name)
          // formData.append('oval_content', { name: values.name, scap_file: file })
          // props.handleSubmit(formData);
          submitForm(formData, actions)
          // console.log(values, actions)
          // actions.setSubmitting(false)
        }}
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
       >
        {formProps => {
          return (
            <PfForm>
              <Grid>
                <GridItem span={8}>
                  <FormikField label="Name" name="name" component={TextField} isRequired={true} />
                  <FormGroup label="File" isRequired={true}>
                    <FileUpload
                      value={file}
                      filename={file ? file.name : ''}
                      onChange={handleFileChange}
                      isDisabled={formProps.isSubmitting}
                      validated={validateFile(file, fileTouched)}
                    />
                  </FormGroup>
                  <ActionGroup>
                    <Button variant="primary" onClick={formProps.handleSubmit} isDisabled={submitDisabled(formProps, file)}>Submit</Button>
                    <Button variant="link" isDisabled={formProps.isSubmitting}>Cancel</Button>
                  </ActionGroup>
                </GridItem>
              </Grid>
            </PfForm>
          )
        }}
      </Formik>
    </IndexLayout>
  )
}

export default OvalContentsNew;
