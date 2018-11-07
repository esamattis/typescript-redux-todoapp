import {createActionCreators, createReducerFunction} from "immer-reducer";
import {bindActionCreators, createStore} from "redux";
import {makeComponentCreator} from "redux-render-prop";

import {TodoReducer} from "./actions";
import {initialState, Selectors, State} from "./state";

export const ActionCreators = createActionCreators(TodoReducer);

export const createTodoConnect = makeComponentCreator({
    prepareState: (state: State) => new Selectors(state),
    prepareActions: dispatch => bindActionCreators(ActionCreators, dispatch),
});

export function createTodoStore() {
    const reducer = createReducerFunction(TodoReducer, initialState);

    return createStore(reducer);
}
