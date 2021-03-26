import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Wizard } from '@patternfly/react-core';
import GeneralStep from './steps/GeneralStep';
import ScheduleStep from './steps/ScheduleStep';
// import HostGroupsStep from './steps/HostGroupsStep';

const NewOvalPolicyWizard = props => {
  const steps = [
    { name: 'General', component: <GeneralStep {...props} /> },
    { name: 'Schedule', component: <ScheduleStep /> }
  ]

  const onSubmit = (values, actions) => {
    console.log('Submitting values: ', values);
  }

  const initialValues = {
    name: "",
    description: "",
    // oval_content_id: null,
    cron_line: ""
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    cron_line: Yup.string().test('is-cron', 'is not a valid cronline', value => value.trim().split(' ').length !== 5)
  });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formProps => {
        return (
          <Wizard
            steps={steps}
            onClose={() => props.history.push('/compliance/oval_policies')}
            onSave={formProps.handleSubmit}
          />
        )
      }}
    </Formik>
  );
}

export default NewOvalPolicyWizard;
