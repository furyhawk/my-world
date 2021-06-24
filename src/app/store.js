import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import populationReducer from '../features/population/populationSlice';

export const store = configureStore({
  reducer: {
    population: populationReducer,
    counter: counterReducer,
  },
});
