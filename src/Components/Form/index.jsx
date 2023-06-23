import './Form.sass';
import { useState } from 'react';


function Form({ handleApiCall, requestParams, setRequestParams , divRequestParams , setDivRequestParams, historyDispatch }) {

  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [data, setData] = useState('');
  const [token, setToken] = useState({});
  // console.log('Form Component line 11', typeof requestParams);

  requestParams = {
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,

    }
  };
  // console.log('Form Component line 22', requestParams);

  function handleMethodChange(e) {
    setMethod(e.target.id.toUpperCase());
    setDivRequestParams({
      ...requestParams,
      method: e.target.id.toUpperCase()
    });
  }

  function handleUrlChange(e) {
    setUrl(e.target.value)
    setDivRequestParams({
      ...requestParams,
      url: e.target.value
    });
    // console.trace(requestParams);
  }

  function handleSubmit(e, handleApiCall) {
    e.preventDefault();
    if (!requestParams.method){ //} || !requestParams.url) {
      alert('Please enter a valid request method');
      return;
    }
    // console.trace(requestParams);
    historyDispatch({ type: 'HISTORY', payload: {method: requestParams.method, url: requestParams.url} });
    handleApiCall(requestParams); // equivalent to callApi(requestParams)
  }


  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, handleApiCall)}>
        <label htmlFor="url">
          <span>URL: </span>
          <input
            id="url"
            type="text"
            name="url"
            data-testid="urlTextBox"
            onChange={handleUrlChange}
          />
          <button data-testid="submitButton" type="submit">GO!</button>
        </label>
        <label htmlFor="bearer">
          <span>Bearer: </span>
          <input
            id="bearer"
            type="text"
            name="token"
            onChange={(e) => setToken(e.target.value)}
          />
        </label>
        <label htmlFor="json">
          <span>JSON Body: </span>
          <textarea
            id="json"
            type="text"
            name="json"
            placeholder="JSON String"
            onChange={(e) => setData(e.target.value)}
          />
        </label>
        <label className="methods" onClick={handleMethodChange}>
          <span className={requestParams.method === 'GET' ? 'activeButton' : '' } data-testid="getTest" id="get">GET</span>
          <span className={requestParams.method === 'POST' ? 'activeButton' : '' } data-testid="postTest" id="post">POST</span>
          <span className={requestParams.method === 'PUT' ? 'activeButton' : '' } data-testid="putTest" id="put">PUT</span>
          <span className={requestParams.method === 'DELETE' ? 'activeButton' : '' } data-testid="deleteTest" id="delete">DELETE</span>
        </label>
      </form>
    </>
  );
}

export default Form;
