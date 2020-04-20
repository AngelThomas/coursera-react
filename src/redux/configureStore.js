import { createStore } from 'redux';
import { Reducer, initialState } from './reducer.js';

export const configureStore = () => {
    const store = createStore(
        Reducer, initialState
    );

    return store;
}