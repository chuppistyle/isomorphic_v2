import React from 'react';
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import App from '../shared/app';


import test_data from './../shared/store/reducer'

const history = createHistory();
const middleware = routerMiddleware(history);

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(
    combineReducers({
        test_data,
        router: routerReducer
    }),
    preloadedState,
    applyMiddleware(middleware)
);

hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
