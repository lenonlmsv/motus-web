import {createStore} from 'redux';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducers from './reducers'

const store = createStore(rootReducers, applyMiddleware(thunk));; // 2) ARMAZENADO O ESTADO INICIAL NA STORE      

export default store;