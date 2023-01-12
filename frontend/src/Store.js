import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/RootReducer';

const initialState = {};

const Store = createStore(
    RootReducer,
    initialState,
    applyMiddleware(thunk)
);

export default Store;