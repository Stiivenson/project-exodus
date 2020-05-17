import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';

import App from './App';

import configureStore from './store/configureStore';
import initialReduxState from './constants/initialState';

import './styles/styles.scss';

// const store = configureStore(initialReduxState);

// const RenderMap = () => {
//     render(
//         <Provider store={store}>
//             <App>
//             </App>
//         </Provider>,
//         document.getElementById('root')
//     );
// };

// RenderMap();

render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);