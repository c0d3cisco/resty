import './Form.scss';

function handleSubmit(e, handleApiCall) {
  e.preventDefault();
  const formData = {
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon',
  };
  handleApiCall(formData);
}

function Form({handleApiCall}) {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, handleApiCall)}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
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
