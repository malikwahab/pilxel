import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Pilxel from './components/Pilxel';
import appStore from './Store/AppStore.js';
import { Provider } from 'react-redux';


const appHistory = useRouterHistory(createBrowserHistory)({ queryKey: false })
const routes = (
    <Provider store={appStore}>
        <Router history={appHistory}>
            <Route path="/" component={Pilxel} />
        </Router>
    </Provider>
)
render(routes, document.getElementById('root'));
