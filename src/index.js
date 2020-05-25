import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import { history } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';

import App from './App';

import { Provider } from 'react-redux';
import store from './store/configureStore';

import './styles/styles.scss';

render(
    <React.Fragment>
        <BrowserRouter history={history}>
            <Provider store={store}>
                <App />
            </Provider>            
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById('root')
);