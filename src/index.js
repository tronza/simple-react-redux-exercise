import React from 'react';
import ReactDOM from 'react-dom';

// Initialize Redux
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './App';

// Initialize Dev Tools.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add Thunk for asynchronous actions
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore(
    rootReducer,
    enhancer
);

const Root = ({ store }) => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('app')
);
