import { createStore } from 'redux';
import ElectionReducers from './reducers/ElectionReducers';

export const store = createStore(ElectionReducers);