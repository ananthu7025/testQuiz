import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Dashboard from '../Pages/dashboard/Dashboard';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
const setup = () => {
  const store = createStore(() => ({
    employees: {
      employees: [
        {
          _id: '1',
          username: 'Employee 1',
          createdAt: new Date().toJSON(),
        },
        {
          _id: '2',
          username: 'Employee 2',
          createdAt: '2022-12-12T00:00:00.000Z',
        },
      ],
    },
    results: {
      results: [
        {
          empId: '1',
          result: 'pass',
        },
      ],
    },
  }));
  const history = createMemoryHistory();
  const utils = render(
    
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
      <Dashboard />
      </Router>
    </Provider>
  );

  return {
    ...utils,
    store,
  };
};

test('useEffect is called on mount and when currentId changes', () => {
  const useEffect = jest.spyOn(React, 'useEffect');
  setup();
  expect(useEffect).toHaveBeenCalledTimes(2);
  React.useEffect.mockRestore();
});

test('getTotalEmployees and getTotalRes actions are dispatched', () => {
  const { store } = setup();
  expect(store.getActions()).toEqual([
    { type: 'GET_TOTAL_EMPLOYEES', payload: '' },
    { type: 'GET_TOTAL_RES' },
  ]);
});


