import api from 'foremanReact/redux/API/API';
// import { post } from 'foremanReact/redux/API';
import { onError } from 'foremanReact/redux/actions/common/forms';

const key = 'OVAL_CONTENT_SUBMIT'


export const submitForm = async (params, actions)=> {
  const headers = {
    'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }

  // return post({
  //   key,
  //   url: '/api/v2/compliance/oval_contents',
  //   headers,
  //   payload: {
  //     params
  //   }
  // });
  console.log('before')

  try {
    const res = await api.post('/api/v2/compliance/oval_contents', params, headers);
    // return ({})
    console.log(res);
  } catch (error) {
    // console.log(error.response.data)
    // console.log(error.response.data.error.errors)
    onError(error, actions)
    // return error.response.data.error.errors
  }
  // return res
}