import {createReducerFunction} from "immer-reducer";
import {applyMiddleware, bindActionCreators, compose, createStore} from "redux";
import {makeConnector} from "redux-render-prop";
import createSagaMiddleware from "redux-saga";

import {ActionCreators, TodoReducer} from "./actions";
import {rootSaga} from "./sagas";
import {initialState, Selectors, State} from "./state";

export const createTodoConnect = makeConnector({
    prepareState: (state: State) => new Selectors(state),
    prepareActions: dispatch => bindActionCreators(ActionCreators, dispatch),
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
    }
}

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

export function createTodoStore() {
    const reducer = createReducerFunction(TodoReducer);
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducer,
        initialState,

        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
