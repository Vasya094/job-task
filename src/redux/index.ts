import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./eventsSagas";
import { combineReducers } from "redux";
import eventsReducers from "./reducer";

const rootReducer = combineReducers({
    data: eventsReducers,
});


const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;