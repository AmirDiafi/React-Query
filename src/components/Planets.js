import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import Planet from './Planet'

const fetchPlanets = async (key) => {
  const page = key.queryKey[1]
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`)
  return res.json()
}

const People = () => {
  const [page, setPage] = useState(1)
  const { data, status } = useInfiniteQuery(['people', page], fetchPlanets)

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && <div>Loading data</div>}

      {status === 'error' && <div>Error fetching data</div>}

      {status === 'success' && (
        <>
          <div>
            <button
              disabled={!data.pages[0].previous}
              onClick={() => setPage(page - 1)}
            >
              Prev Page
            </button>
            <span>Page {page}</span>
            <button
              disabled={!data.pages[0].next}
              onClick={() => setPage(page + 1)}
            >
              Next Page
            </button>
          </div>
          <div>
            {data.pages[0].results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default People
