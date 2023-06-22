import React from 'react';
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



  async function callApi(requestParams) {
    console.log('********', requestParams);
    
    try {
      const response = await axios(requestParams);
  
      const data = response.data;
  
      setRequestParams(requestParams);
      setData(data);

    } catch (error) {

      console.error('API call error:', error);
      setData("data not found");

    }  
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams?.method}</div>
      <div>URL: {requestParams?.url}</div>
      <Form 
      handleApiCall={callApi}
      requestParams
      setRequestParams />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
