import * as Yup from 'yup';

import api from 'foremanReact/redux/API/API';
import { onError } from 'foremanReact/redux/actions/common/forms';

const submitForm = async (params, actions) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  }

  return await api.post('/api/v2/compliance/oval_contents', params, headers);
}

export const onSubmit = async (values, actions, showToast, history, fileFromUrl, file) => {
  const formData = new FormData();
  if (fileFromUrl) {
    formData.append('oval_content[url]', values.url)
  } else {
    formData.append('oval_content[scap_file]', file)
  }
  formData.append('oval_content[name]', values.name)
  try {
    await submitForm(formData, actions)
    history.push(ovalContentsPath)
    showToast({ type: 'success', message: sprintf(__('OVAL Content %s successfully created'), values.name) })
  } catch(error) {
    onError(error, actions)
  }
}

export const validateFile = (file, touched) => {
  if (!touched) {
    return 'default'
  }
  return file ? 'success' : 'error';
}

export const submitDisabled = (formProps, file, fileFromUrl) => {
  return formProps.isSubmitting || !formProps.isValid || (!fileFromUrl && !file);
}

export const createValidationSchema = contentFromUrl => {
  return Yup.object().shape({
    name: Yup.string().required("can't be blank"),
    ...contentFromUrl && { url: Yup.string().required("can't be blank") }
  })
}