import {isActionFrom} from "immer-reducer";
import {Action} from "redux";
import {debounce, delay, put, select, takeEvery} from "redux-saga/effects";

import {TodoActions, TodoLifecycleActions} from "./actions";
import {Selectors} from "./state";

/**
 * Monitor TODO for changes
 */
function* monitorTodo(action: ReturnType<typeof TodoActions.addTodo>) {
    const id = action.payload.id;

    yield debounce(
        2000,
        (a: Action) => {
            // Listen to actions that can modify the todo item
            if (isActionFrom(a, TodoActions)) {
                // Grab the actions that match this todo item
                return a.payload.id === id;
            }

            return false;
        },
        function*() {
            yield saveTodo(id);
        },
    );
}

function* saveTodo(id: string) {
    yield put(TodoLifecycleActions.setSaving({id}));

    const state = yield select();
    const selectors = new Selectors(state);
    const todo = selectors.getTodo(id);

    console.log("Start saving and prevent modifications for", id, todo);

    // XXX Simulate the async saving operation
    yield delay(2000);

    console.log("Saved!", id);
    yield put(TodoLifecycleActions.setSaved({id}));
}

export function* rootSaga() {
    yield takeEvery(TodoActions.addTodo.type, monitorTodo);
}
