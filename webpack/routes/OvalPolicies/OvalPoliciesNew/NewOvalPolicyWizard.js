import React, { useState } from 'react';
import { Formik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';

import { Button, Wizard, Form as PfForm, ActionGroup } from '@patternfly/react-core';

import EmptyState from '../../../components/EmptyState';
import Loading from 'foremanReact/components/Loading';
import IndexLayout from '../../../components/IndexLayout';

import ovalContentsQuery from '../../../graphql/queries/ovalContents.gql';
import ovalPoliciesQuery from '../../../graphql/queries/ovalPolicies.gql';
import createOvalPolicy from '../../../graphql/mutations/createOvalPolicy.gql';

import { ovalPoliciesPath } from '../../../helpers/pathsHelper';
import { TextField, TextAreaField, SelectField } from '../../../helpers/formFieldsHelper';
import { Field as FormikField } from 'formik';
import HostgroupSelect from './HostgroupSelect';

import { createValidationSchema, stepsFactory, onSubmit, initialValues } from './NewOvalPolicyWizardHelpers';

const NewOvalPolicyWizard = props => {
  const [callMutation] = useMutation(createOvalPolicy);

  const [assignedHgs, setAssignedHgs] = useState([]);

  const onHgAssignChange = allHgs => (event, isSelected, rowId, rowAttrs) => {
    let newAssignedHgs;
    if (rowId === -1) {
      newAssignedHgs = isSelected ? allHgs.map(hg => hg.id) : [];
    } else {
      let id = rowAttrs.hostgroup.id;
      newAssignedHgs = isSelected ? [...assignedHgs, id] : assignedHgs.filter(item => item !== id);
    }
    setAssignedHgs(newAssignedHgs);
  }

  // should we merge queries somehow to improve error handling?
  // const policiesData = useQuery(ovalPoliciesQuery);
  const ovalContentsData = useQuery(ovalContentsQuery);

  if (ovalContentsData.loading) {
    return <Loading />
  }

  const loadError = ovalContentsData.error

  if (loadError) {
    return <EmptyState error={loadError} title={'Error!'} body={loadError.message} />
  }

  const ovalContents = ovalContentsData.data.ovalContents.nodes;

  return (
    <Formik
      onSubmit={onSubmit(props.history, props.showToast, callMutation, assignedHgs)}
      initialValues={initialValues}
      validationSchema={createValidationSchema()}
    >
      {formProps => {
        console.log(formProps)
        return (
          <PfForm>
            <FormikField name="name" component={TextField} label="Name" isRequired/>
            <FormikField name="description" component={TextAreaField} label="Description" />
            <FormikField name="cronLine" component={TextField} label="Schedule" isRequired />
            <FormikField name="ovalContentId" component={SelectField} selectItems={ovalContents} label="OVAL Content" isRequired blankLabel={"Choose OVAL Content"}/>
            <HostgroupSelect selected={assignedHgs} setSelected={setAssignedHgs} />
            <ActionGroup>
              <Button
                variant="primary"
                onClick={formProps.handleSubmit}
                isDisabled={!formProps.isValid || formProps.isSubmitting}
              >
                {__('Submit')}
              </Button>
              <Button variant="link" isDisabled={formProps.isSubmitting}>
                {__('Cancel')}
              </Button>
            </ActionGroup>
          </PfForm>
        )
      }}
    </Formik>
  );
}

export default NewOvalPolicyWizard;
