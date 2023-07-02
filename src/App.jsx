
import React, { useEffect, useState, useReducer } from 'react';
import './App.sass';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import axios from 'axios';
import History from './Components/History';

export const initialState = {
  i:0,
  data: null,
  loading: false,
  history: [],
  divRequestParams: {
    method: '',
    url: '',
  },
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD DATA': // dispatch({ type: 'ADD DATA', payload: data });
      return {
        ...state,
        data: action.payload,
      }
    case 'LOADING': // dispatch({ type: 'LOADING', payload: true });
      return {
        ...state,
        loading: action.payload
      }
    case 'ITERATE': // dispatch({ type: 'ITERATE' });
      return {
        ...state,
        i: state.i + 1,
      }
    case 'HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload],
      }
    case 'DIV UPDATE':
      return {
        ...state,
        divRequestParams: {
          ...state.divRequestParams,
          ...action.payload,
        }}
    default:
      return state;
  }
};

  function App() {
    const [requestParams, setRequestParams] = useState({});
    const [state, dispatch] = useReducer(dataReducer, initialState);

    async function callApi(requestParams) {
      setRequestParams(requestParams);
      dispatch({ type: 'LOADING', payload: true });
    }

    useEffect(() => {
      async function fetchData() {
        if (state.i) {
          try {
            const response = await axios(requestParams);
            const data = response.data;
            dispatch({ type: 'LOADING', payload: false });
            dispatch({ type: 'ADD DATA', payload: data });
          } catch (error) {
            dispatch({ type: 'LOADING', payload: false });
            dispatch({ type: 'ADD DATA', payload: 'No data to display.' });
            // console.error('API call error:', error);
          }
        }
        dispatch({ type: 'ITERATE' });
      }
      fetchData();

      // eslint-disable-next-line
    }, [requestParams]);

    return (
      <React.Fragment>
        <Header />
        <div data-testid='app-div-method'>Request Method: {state.divRequestParams?.method}</div>
        <div data-testid='app-div-url'>URL: {state.divRequestParams?.url}</div>
        <Form
          handleApiCall={callApi}
          requestParams
          dispatch={dispatch}
        />
        <History history={state.history} />
        <Results loading={state.loading} data={state.data} />
        <Footer />
      </React.Fragment>
    );
  }
  export default App;

