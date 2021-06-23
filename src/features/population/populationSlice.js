import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.tvmaze.com/search"
})

const populationAdapter = createEntityAdapter({
    selectId: population => population.show.id
}
)

export const fetchPopulation = createAsyncThunk(
    'population/fetchPopulation',
    async () => {
        const response = await api.get("/shows?q=snow")
        console.log(response)
        return response.population
    }
)

const populationSlice = createSlice({
    name: 'population',
    initialState: populationAdapter.getInitialState({
        status: 'idle',
        error: null,
    }),
    reducers: {},
    extraReducers: {
        [fetchPopulation.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchPopulation.fulfilled]: (state, action) => {
            if (state.status === 'loading') {
                populationAdapter.upsertMany(state, action)
                state.status = 'succeeded'
            }
        },
        [fetchPopulation.rejected]: (state, action) => {
            if (state.status === 'loading') {
                state.status = 'failed'
                state.error = action.payload
            }
        }
    },
})

export default populationSlice.reducer

export const {
    selectAll: selectAllPopulation,
} = populationAdapter.getSelectors((state) => state.population)
