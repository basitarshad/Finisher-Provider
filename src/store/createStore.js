import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/index';
import { SERVER_URL } from '../utils/environments';
import createSocketIoMiddleware from "redux-socket.io";
import io from 'socket.io-client';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

let socket = io(SERVER_URL, { jsonp: false, 'transports': ['websocket'], reconnection: true });
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const log = createLogger({ diff: true, collapsed: true });

const middleware = [thunk, log, socketIoMiddleware];
const enhancers = [];
const store = createStore(
    rootReducer,
    {},
    compose(
        applyMiddleware(...middleware),
        ...enhancers
    )
);

export default store;
