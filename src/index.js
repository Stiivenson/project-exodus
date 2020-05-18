import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import { history } from './history';
//import * as serviceWorker from './serviceWorker';

import App from './App';

import { Provider } from 'react-redux';
import store from './store/configureStore';
import configureStore from './store/configureStore';
import initialReduxState from './constants/initialState';

import './styles/styles.scss';

render(
    <React.StrictMode>
        <BrowserRouter history={history}>
            <Provider store={store}>
                <App />
            </Provider>            
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);