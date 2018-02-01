/**
 * Created by Anton on 25.01.2018.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import App from '../shared/app';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createMemoryHistory'

import test_data from './../shared/store/reducer'
import routes from './routes'

const StaticRender = async (req, res) => {
    const context = {};

    const history = createHistory({
        initialEntries: [req.url]
    });
    const middleware = routerMiddleware(history);

    const store = createStore(
        combineReducers({
            test_data,
            router: routerReducer
        }),
        applyMiddleware(middleware)
    );

    let foundPath = null;
    // match request url to our React Router paths and grab component
    let { path, component } = routes.routes.find(
        ({ path, exact }) => {
            foundPath = matchPath(req.url,
                {
                    path,
                    exact,
                    strict: false
                }
            );
            return foundPath;
        }) || {};

    // safety check for valid component, if no component we initialize an empty shell.
    if (!component)
        component = {};
    // safety check for fetchData function, if no function we give it an empty promise
    if (!component.fetchData)
        component.fetchData = () => new Promise(resolve => resolve());
    // meat and bones of our isomorphic application: grabbing async data
    await component.fetchData({ store, params: (foundPath ? foundPath.params : {}) });


    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <ConnectedRouter isSSR={true} context={context} history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    );

    const finalState = store.getState();

    if (context.url)
    {
        res.writeHead(301, { Location: context.url });
        res.end()
    }
    else
    {
        res.write(`
              <!DOCTYPE html>
              <head>
                <title>Universal Reacl</title>
                <link rel="stylesheet" href="/css/main.css">
              </head>
              <body>
                <div id="root">${html}</div>
                <script>window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}</script>
                <script src="/bundle.js" defer></script>
              </body>
            </html>
        `);
        res.end();
    }
};

export default StaticRender;
