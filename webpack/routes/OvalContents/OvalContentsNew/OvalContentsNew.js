import React from 'react';
import { translate as __ } from 'foremanReact/common/I18n';
import { Formik } from 'formik';
import { Field as FormikField } from 'formik';
import { Form as PfForm } from '@patternfly/react-core';

import IndexLayout from '../../../components/IndexLayout';


const OvalContentsNew = props => {
  return (
    <IndexLayout pageTitle={__('New OVAL Policy')} >
      <Formik onSubmit={() => {}} initialValues={{}}>
        {formProps => {
          return (
            <PfForm>
              <FormikField name="name" component={} />
            </PfForm>
          )
        }}
      </Formik>
    </IndexLayout>
  )
}

export default OvalContentsNew;
