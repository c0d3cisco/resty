
import React, { useEffect, useState, useReducer } from 'react';
import './App.sass';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import axios from 'axios';
import History from './Components/History';

const initialState = {
  i:0,
  data: null,
  loading: false,
  history: [],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD DATA':
      return {
        ...state,
        data: action.payload,
      }
    case 'LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'ITERATE':
      return {
        ...state,
        i: state.i + 1,
      }
    case 'HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload],
      }
    default:
      return state;
  }
};

  function App() {
    const [requestParams, setRequestParams] = useState({});
    const [divRequestParams, setDivRequestParams] = useState({});
    // const [i, setI] = useState(0);
    const [state, dispatch] = useReducer(dataReducer, initialState);

    async function callApi(requestParams) {
      setRequestParams(requestParams);
      dispatch({ type: 'LOADING', payload: true });
      console.log('********', requestParams);
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
            console.error('API call error:', error);
          }
        }
        // console.log("test I", i);
        // setI(i + 1);
        dispatch({ type: 'ITERATE' });
        // dispatch
      }
      console.log("test");
      fetchData();

      // eslint-disable-next-line
    }, [requestParams]);

    return (
      <React.Fragment>
        <Header />
        <div data-testid='app-div-method'>Request Method: {divRequestParams?.method}</div>
        <div data-testid='app-div-url'>URL: {divRequestParams?.url}</div>
        <Form
          handleApiCall={callApi}
          requestParams
          historyDispatch={dispatch}
          setRequestParams={setRequestParams}
          divRequestParams
          setDivRequestParams={setDivRequestParams}
        />
        {/* <button onClick={() => dispatch({ type: 'ITERATE' })}> History </button> */}
        <History history={state.history} />
        <Results loading={state.loading} data={state.data} />
        <Footer />
      </React.Fragment>
    );
  }
  export default App;

