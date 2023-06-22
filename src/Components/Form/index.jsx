import './Form.sass';
import { useState } from 'react';


function Form({ handleApiCall, requestParams, setRequestParams }) {

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [data, setData] = useState('');
  // const [token, setToken] = useState({});

  requestParams = {
    method,
    url,
    data,
    // headers: {
    //   Authorization: `Bearer ${token}`,

    // }
  };

  function handleMethodChange(e) {
    setMethod(e.target.id.toUpperCase());
    setRequestParams({method: e.target.id.toUpperCase()});
    console.trace(requestParams);
  }

  function handleSubmit(e, handleApiCall) {
    e.preventDefault();
    console.trace(requestParams);
    handleApiCall(requestParams); // equivalent to callApi(requestParams)
  }


  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, handleApiCall)}>
        <label htmlFor='url ext'>
          <span>URL: </span>
          <input 
          id='url text' 
          type='text' 
          name='url' 
          onChange={(e) => setUrl(e.target.value)} />
          <button type="submit">GO!</button>
        </label>
        {/* <label htmlFor='bearer text ext'>
          <span>Bearer: </span>
          <input 
          id='bearer text' 
          type='text' 
          name='token' 
          onChange={(e) => setToken(e.target.value)} />
        </label> */}
        <label htmlFor='json text'>
        <span>JSON Body: </span>
          <textarea 
          id='json text'  
          type="text" 
          name="json" 
          placeholder="JSON String" 
          onChange={(e) => setData(JSON.parse(e.target.value))}
          />
        </label>
        <label className="methods" onClick={handleMethodChange}>
          <span id="get">GET</span>
          <span id="post">POST</span>
          <span id="put">PUT</span>
          <span id="delete">DELETE</span>
        </label>
      </form>
    </>
  );
}

export default Form;
