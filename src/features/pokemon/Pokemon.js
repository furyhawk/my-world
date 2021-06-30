import * as React from 'react'
import { useGetPokemonByNameQuery, useGetPokemonAllQuery } from '../../services/pokemon'

export const PokemonCountStat = () => {
  const { data } = useGetPokemonAllQuery()
  console.log(data?.results)
  if (!data) return null

  return (
    <>
      <h3>Active Pokemon</h3>
      <h3>{data?.results.length}</h3>

      {data.results.map((poke, index) => (
        <Pokemon key={index} name={poke.name} pollingInterval={0} />
      ))}
    </>
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
  console.log(data)

  return (
    <>
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
    </>
  )
}