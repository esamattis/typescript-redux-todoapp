import {isAction} from "immer-reducer";
import {Action} from "redux";
import {delay} from "redux-saga";
import {put, takeEvery} from "redux-saga/effects";

import {ActionCreators} from "./actions";

function* handleNewTodo(action: Action) {
    if (!isAction(action, ActionCreators.addTodo)) {
        return;
    }

    const todoId = action.payload[0];

    yield delay(1000);

    yield put(ActionCreators.setTodoText(todoId, "initial text from saga"));
}

function* watchNewTodos() {
    yield takeEvery(ActionCreators.addTodo.type, handleNewTodo);
}

export function* rootSaga() {
    yield watchNewTodos();
}
