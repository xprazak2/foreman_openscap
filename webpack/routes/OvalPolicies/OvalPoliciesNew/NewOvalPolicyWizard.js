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
    return useMutation(createOvalPolicy);
  }

  const [callMutation, { loading, error, data }] = prepareMutation(props.history, props.showToast);

  const onSubmit = (history, showToast) => (values, actions) => {
    const onCompleted = (response) => {
      const errors = response.data.createOvalPolicy.errors;
      if (errors.length === 0) {
        history.push('/compliance/oval_policies');
        showToast({ type: 'success', message: 'OVAL Policy succesfully created.' });
      } else {
        console.log('Setting submitting')
        console.log(errors);
        actions.setSubmitting(false);
        actions.setErrors(prepareErrors(errors));
      }
    }

    const onError =(error) => {
      console.log('onError')
      showToast({ type: 'error', message: `Failed to create OVAL Policy: ${error}` });
    }

    callMutation({ variables: { ...values, period: 'custom' } }).then(onCompleted, onError);
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
      let key = item.path[item.path.length - 1];
      memo[key] = item.message;
      return memo;
    }, {})
  }

  return (
    <Formik
      onSubmit={onSubmit(props.history, props.showToast)}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formProps => {

        console.log(formProps);
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
