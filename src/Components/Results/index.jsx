
import './Results.sass'
import JsonView from '@uiw/react-json-view';


function Results({ data, loading }) {

  return (
    <section >
      {
        loading ? <p data-testid='preEl'>Loading...</p> :
      <pre data-testid="results-pre">
        {
        data
        ? <JsonView id='JsonView' data-testid='preEl' value = {data} />
        : null
        }
      </pre>
      }
    </section>
  );
}

export default Results;
