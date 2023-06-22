
import './Results.sass'

function Results({ data }) {
  // const results = <pre>{data ? JSON.stringify(data, undefined, 2) : null}</pre>;
  return (
    <section>
      {data ? <pre>{ JSON.stringify(data, undefined, 2) }</pre> : null}
    </section>
  );
}

export default Results;
