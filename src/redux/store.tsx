import {createReducerFunction} from "immer-reducer";
import {createStore} from "redux";

import {TodoReducer} from "./actions";
import {initialState} from "./state";

export function createTodoStore() {
    const reducer = createReducerFunction(TodoReducer, initialState);

    return createStore(reducer);
}
