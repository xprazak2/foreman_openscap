import api from 'foremanReact/redux/API/API';

const key = 'OVAL_CONTENT_SUBMIT'


export const submitForm = params => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }

  api.post('/api/v2/compliance/oval_contents', params, headers);
}