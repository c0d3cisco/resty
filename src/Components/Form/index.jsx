import './Form.sass';
import { useState } from 'react';


function Form({ handleApiCall, requestParams, dispatch }) {

  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [data, setData] = useState('');
  const [token, setToken] = useState({});

  requestParams = {
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  function handleMethodChange(e) {
    setMethod(e.target.id.toUpperCase());
    dispatch({ type: 'DIV UPDATE', payload: { method: e.target.id.toUpperCase() } });
  }

  function handleUrlChange(e) {
    setUrl(e.target.value)
    dispatch({ type: 'DIV UPDATE', payload: { url: e.target.value } });
  }

  function handleSubmit(e, handleApiCall) {
    e.preventDefault();
    if (!requestParams.method) {
      alert('Please select a methods.');
      return;
    }
    dispatch({ type: 'HISTORY', payload: { method: requestParams.method, url: requestParams.url } });
    handleApiCall(requestParams); // equivalent to callApi(requestParams)
  }

  const buttons = ['GET', 'POST', 'PUT', 'DELETE']

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
          {buttons.map((button, idx) => (
            <span
              className={['button', requestParams.method === button ? 'activeButton' : ''].join(' ')}
              data-testid={`${button.toLowerCase()}Test`}
              id={button.toLowerCase()}
              key={idx}>
              {button}
            </span>
          ))}
        </label>
      </form>
    </>
  );
}

export default Form;
