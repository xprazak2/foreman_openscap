import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitForm } from './OvalContentsNewActions';

import OvalContentsNew from './OvalContentsNew';

const WrappedOvalContentsNew = props => {
  const dispatch = useDispatch();

  const handleSubmit = (params) => {
    // const opts = {
    //   handleSuccess: console.log,
    //   handleError: console.log,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   params
    // }
    submitForm(params)
  }

  return (
    <OvalContentsNew {...props} handleSubmit={handleSubmit} />
  )
}

export default WrappedOvalContentsNew;
