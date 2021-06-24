import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'

const initialState = {
    population: [],
    status: 'idle',
    error: null,
}
// const populationSlice = createSlice({
//     name: 'population',
//     initialState,
//     reducers: {}
// })
// import axios from 'axios'

// const api = axios.create({
//     baseURL: "https://api.tvmaze.com/search"
// })



const populationAdapter = createEntityAdapter({
    selectId: (population) => population.id,
})

export const fetchPopulation = createAsyncThunk(
    'population/fetchPopulation',
    async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos`
        );
        // await api.get("/shows?q=snow")
        console.log(response)
        const data = await response.json();
        return data
    }
)

const populationSlice = createSlice({
    name: 'population',
    initialState,
    // populationAdapter.getInitialState({
    //     status: 'idle',
    //     error: null,
    // }),
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

export const booksSelectors = populationAdapter.getSelectors((state) => state.population)

export const {
    selectAll: selectAllPopulation,
} = populationAdapter.getSelectors((state) => state.population)
