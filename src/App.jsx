
import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.sass';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import axios from 'axios';
function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [i, setI] = useState(0);

  async function callApi(requestParams) {
    setLoading(true);
    setRequestParams(requestParams);
    console.log('********', requestParams);
  }

  useEffect(() => {
    async function fetchData() {
      if(i){
      try {
        const response = await axios(requestParams);
        const data = response.data;
        setLoading(false);
        // setRequestParams(requestParams);
        setData(data);
      } catch (error) {
        setLoading(false);
        console.error('API call error:', error);
        setData('No data to display.');
      }
    }
    console.log("test I", i)
    setI(i+1);
  }
    console.log("test")
    fetchData();

    // eslint-disable-next-line
  }, [requestParams]);

  return (
    <React.Fragment>
      <Header />
      <div data-testid='app-div-method'>Request Method: {requestParams?.method}</div>
      <div data-testid='app-div-url'>URL: {requestParams?.url}</div>
      <Form
        handleApiCall={callApi}
        requestParams
        setRequestParams={setRequestParams}
        show />
      <Results loading={loading} data={data} />
      <Footer />
    </React.Fragment>
  );
}
export default App;
