import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import { Button, Wizard, Form as PfForm } from '@patternfly/react-core';
import GeneralStep from './steps/GeneralStep';
import ScheduleStep from './steps/ScheduleStep';
// import HostGroupsStep from './steps/HostGroupsStep';

import createOvalPolicy from '../../../graphql/mutations/createOvalPolicy.gql';

const NewOvalPolicyWizard = props => {
  const stepsFactory = (props, additional) => {
    const steps = [
      { name: 'General',
        component: <GeneralStep {...props} />,
        nextButtonText: 'Submit',
        enableNext: additional.enableNext && !additional.isSubmitting }
    ]

    return steps
  }

  const prepareMutation = (history, showToast) => {
    const options = {
      onCompleted: (data) => {
        console.log(data);
        if (data.createOvalPolicy.errors.length === 0) {
          history.push('/compliance/oval_policies');
          showToast({ type: 'success', message: 'OVAL Policy succesfully created.' });
        }
      },
      onError: (error) => {
        showToast({ type: 'error', message: `Failed to create OVAL Policy: ${error}` });
      }
    }

    return useMutation(createOvalPolicy, options);
  }

  const [callMutation, { loading, error, data }] = prepareMutation(props.history, props.showToast);

  const onSubmit = (history) => (values, actions) => {
    callMutation({ variables: { ...values, period: 'custom' } });
  }

  const initialValues = {
    name: "",
    description: "",
    ovalContentId: "",
    cronLine: ""
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("can't be blank"),
    ovalContentId: Yup.string().required("can't be blank"),
    cronLine: Yup.string().test('is-cron', 'is not a valid cronline', value => value && value.trim().split(' ').length === 5)
  });

  const prepareErrors = errors => {
    return errors.reduce((memo, item) => {
      // get last
      let key = item.path[item.path.lenght - 1];
      memo[key] = item.message;
      return memo;
    }, {})
  }

  console.log(data);

  return (
    <Formik
      onSubmit={onSubmit(props.history)}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formProps => {
        console.log(formProps)

        if (data) {
          formProps.setSubmitting(false);
          formProps.setErrors(data.createOvalPolicy.errors)
        }

        return (
            <Wizard
              steps={stepsFactory(props, { enableNext: formProps.isValid, isSubmitting: formProps.isSubmitting })}
              onClose={() => props.history.push('/compliance/oval_policies')}
              onSave={formProps.handleSubmit}
            />
        )
      }}
    </Formik>
  );
}

export default NewOvalPolicyWizard;
