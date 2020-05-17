import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux"; 
import rootReducer from '../reducers/root';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension()
));

export default store;

// let store;
// export default initialState => {
//     if (store)
//         return store;
//     const createdStore = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             applyMiddleware(thunk),
//             window.devToolsExtension()
//         )
//     );
//     store = createdStore;
//     return store;
// }