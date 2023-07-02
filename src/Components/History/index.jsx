
import React from "react"

function History({ history }) {

  return (
    <section>
      <h2>History</h2>
      <ul data-testid = 'history'>
        {history.map((item, idx) => (
          (<li key={idx}>
              <p>{`${item?.method}: ${item?.url}`}</p>
            </li>)
        ))}
      </ul>
    </section>
  )
}

export default History;
