import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'

const axios = require('axios');

const populationAdapter = createEntityAdapter({
    selectId: population => population.show.id
}
)

export const fetchPopulation = createAsyncThunk(
    'population/fetchPopulation',
    async () => {
        const response = await axios.get("https://api.tvmaze.com/search/shows?q=snow")
        return response.population
    }
)

const populationSlice = createSlice({
    name: 'population',
    initialState: populationAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [fetchPopulation.fulfilled]: populationAdapter.setAll,
    },
})

export default populationSlice.reducer

export const {
    selectAll: selectAllPopulation,
} = populationAdapter.getSelectors((state) => state.population)
