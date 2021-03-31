import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import { Button, Wizard, Form as PfForm } from '@patternfly/react-core';
import GeneralStep from './steps/GeneralStep';
import HostgroupsStep from './steps/HostgroupsStep';

import createOvalPolicy from '../../../graphql/mutations/createOvalPolicy.gql';

const NewOvalPolicyWizard = props => {
  const stepsFactory = (props, additional) => {
    const steps = [
      {
        name: 'General',
        component: <GeneralStep {...props} />,
        enableNext: additional.enableNext && !additional.isSubmitting
      },
      {
        name: 'Hostgroups',
        component: <HostgroupsStep {...props} onHgAssignChange={additional.onHgAssignChange} assignedHgs={additional.assignedHgs} />,
        enableNext: additional.enableNext && !additional.isSubmitting,
        nextButtonText: 'Submit'
      }
    ]

    return steps
  }

  const [assignedHgs, setAssignedHgs] = useState([]);

  const onHgAssignChange = allHgs => (event, isSelected, rowId, rowAttrs, colAttrs) => {
    let newAssignedHgs;
    if (rowId === -1) {
      newAssignedHgs = isSelected ? allHgs.map(hg => hg.id) : [];
    } else {
      let id = rowAttrs.hostgroup.id;
      newAssignedHgs = isSelected ? [...assignedHgs, id] : assignedHgs.filter(item => item !== id);
    }
    setAssignedHgs(newAssignedHgs);
  }

  const [callMutation, { loading, error, data }] = useMutation(createOvalPolicy);

  const onSubmit = (history, showToast) => (values, actions) => {
    const onCompleted = (response) => {
      const errors = response.data.createOvalPolicy.errors;
      if (errors.length === 0) {
        history.push('/compliance/oval_policies');
        showToast({ type: 'success', message: 'OVAL Policy succesfully created.' });
      } else {
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

  const createValidationSchema = (existingNames) => {
    return Yup.object().shape({
      name: Yup.string().required("can't be blank").test('name-is-unique', 'has already been taken', value => value && existingNames.include(value)),
      ovalContentId: Yup.string().required("can't be blank"),
      cronLine: Yup.string().test('is-cron', 'is not a valid cronline', value => value && value.trim().split(' ').length === 5)
    });
  }

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
      validationSchema={createValidationSchema([])}
    >
      {formProps => {

        return (
          <Wizard
            steps={stepsFactory(props, { enableNext: formProps.isValid, isSubmitting: formProps.isSubmitting, onHgAssignChange, assignedHgs })}
            onClose={() => props.history.push('/compliance/oval_policies')}
            onSave={formProps.handleSubmit}
          />
        )
      }}
    </Formik>
  );
}

export default NewOvalPolicyWizard;
