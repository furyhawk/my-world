import { useState } from 'react'

import { Box, Container, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { useGetPokemonByNameQuery, useGetPokemonAllQuery } from '../../services/pokemon'

export const PokemonCountStat = () => {
  const [pollingInterval, setPollingInterval] = useState(0)
  const [page, setPage] = useState(0)
  const { data = [], error, isLoading, isFetching } = useGetPokemonAllQuery(page)
  console.log(data)

  if (!data) return null

  return (
    <Box>
      <Container>
        <Button onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
        >
          <ArrowBackIosIcon />
        </Button>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === 100}
        >
          <ArrowForwardIosIcon />
        </Button>
        <Box>{`${page+1} / 100`}</Box>
      </Container>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading Pokemon...</>
      ) : data ? (
        <>
          <select
            onChange={(change) => setPollingInterval(Number(change.target.value))}
          >
            <option value={0}>Off</option>
            <option value={10000}>10s</option>
            <option value={50000}>50s</option>
          </select>
          <h3>Active Pokemon</h3>
          <h5>{data?.length} {isFetching ? '...' : ''}</h5>

          {data?.map((poke, index) => (
            <Pokemon key={index} name={poke.name} pollingInterval={pollingInterval} />
          ))}

        </>
      ) : null}
    </Box>
  )
}

export const Pokemon = ({
  name,
  pollingInterval,
}) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(
    name,
    {
      pollingInterval,
    }
  )
  console.log(isLoading ? 'Loading' : data)

  return (
    <div style={{ float: 'left', textAlign: 'center' }}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isFetching ? '...' : ''}
          </h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  )
}