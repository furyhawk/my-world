// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    tagTypes: ['Pokemon'],
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
        getPokemonAll: builder.query({
            query: () => `pokemon/?offset=0&limit=50`,
            transformResponse: (response) => response.results,
            providesTags: 
            // (result, error, id) => [{ type: 'Pokemon', id }],
            (result) =>
                result ?
                    [
                        ...result.map(({ name }) => ({ type: 'Pokemon', name }))
                    ]
                    : [],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPokemonAllQuery } = pokemonApi