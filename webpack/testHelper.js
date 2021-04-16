import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Immutable from 'seamless-immutable';
import combinedReducers from 'foremanReact/redux/reducers';

import { getForemanContext } from 'foremanReact/Root/Context/ForemanContext';
import { MockedProvider } from '@apollo/react-testing';

export const withRedux = Component => props => {
  const initialFullState = Immutable({});
  const middlewares = applyMiddleware(thunk);
  const store = createStore(combinedReducers, initialFullState, middlewares);
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export const withMockedProvider = Component => props => {
  const ForemanContext = getForemanContext(ctx);
  const { mocks, ...rest } = props;

  const ctx = {
    metadata: {
      UISettings: {
        perPage: 20
      }
    }
  };

  return (
    <ForemanContext.Provider value={ctx}>
      <MockedProvider mocks={mocks} addTypename={false} >
        <Component {...rest} />
      </MockedProvider>
    </ForemanContext.Provider>
  )
}

// use to resolve async mock requests for apollo MockedProvider
export const tick = () => new Promise(resolve => setTimeout(resolve, 0));

export const historyMock = {
  location: {
    search: ''
  }
}

export const mockFactory = (resultName, query) => (variables, modelResults, errors = []) => {
  const mock = {
    request: {
      query,
      variables,
    },
    result: {
      data: {
        [resultName]: modelResults
      }
    }
  }

  if (errors.length !== 0) {
    mock.result.errors = errors;
  }
  return [mock];
};

