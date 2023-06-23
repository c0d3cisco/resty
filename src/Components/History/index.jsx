import React from "react"

function History({history}) {

  const historyList = history.map((request, idx) => {
    return (
      <li key={idx}>
        <p>{`${request.method}: ${request.url}`}</p>
      </li>
    )
  })
  console.log(historyList);
  return (
    <section>
      <h2>History</h2>
      <ul>
        {/* <li>GET https://swapi.dev/api/people/1</li>
        <li>GET https://swapi.dev/api/people/2</li>
        <li>GET https://swapi.dev/api/people/3</li> */}
        {historyList}
      </ul>
    </section>

  )

}

export default History;
