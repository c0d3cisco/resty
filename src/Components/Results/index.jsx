
import './Results.sass'

function Results({ data }) {
  return (
    <section >
      {data ? <pre data-testid='preEl' >{ JSON.stringify(data, undefined, 2) }</pre> : null}
    </section>
  );
}

export default Results;
