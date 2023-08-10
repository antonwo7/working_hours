import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import auth from './auth';
import common from './common';
import users from './users';
import days from './days';
import companies from './companies';

const reducer = combineReducers({
    auth,
    common,
    users,
    days,
    companies
})

let middleware = [reduxThunk]

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(...middleware))
)

export default store;