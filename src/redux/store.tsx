import {createActionCreators, createReducerFunction} from "immer-reducer";
import {bindActionCreators, createStore} from "redux";
import {makeConnector} from "redux-render-prop";

import {TodoReducer} from "./actions";
import {initialState, Selectors, State} from "./state";

export const ActionCreators = createActionCreators(TodoReducer);

export const createTodoConnect = makeConnector({
    prepareState: (state: State) => new Selectors(state),
    prepareActions: dispatch => bindActionCreators(ActionCreators, dispatch),
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: Function;
    }
}

export function createTodoStore() {
    const reducer = createReducerFunction(TodoReducer);

    return createStore(
        reducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
}
