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
            providesTags: (result, error, name) => [{ type: 'Pokemon', name }],
        }),
        getPokemonAll: builder.query({
            query: () => `pokemon/?offset=0&limit=100`,
            transformResponse: (response) => response.results,
            providesTags:
                (result) =>
                    result ?
                        [
                            ...result.map(({ name }) => ({ type: 'Pokemon', name })), { type: 'Pokemon', id: 'LIST' }
                        ]
                        : [{ type: 'Pokemon', id: 'LIST' }],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPokemonAllQuery } = pokemonApi