import {isAction, isActionFrom} from "immer-reducer";
import {Action} from "redux";
import {delay, put, take, takeEvery} from "redux-saga/effects";

import {ActionCreators} from "./actions";

function* handleNewTodo(action: Action) {
    if (!isAction(action, ActionCreators.addTodo)) {
        return;
    }

    const id = action.payload.id;

    while (true) {
        yield take((a: Action) => {
            if (isActionFrom(a, ActionCreators)) {
                return a.payload.id === id;
            }

            return false;
        });

        yield delay(5000);
        console.log("saving");
        yield put(ActionCreators.setSaving({id}));
        yield delay(5000);
        console.log("saved");
        yield put(ActionCreators.setSaved({id}));
    }
}

function* watchNewTodos() {
    yield takeEvery(ActionCreators.addTodo.type, handleNewTodo);
}

export function* rootSaga() {
    yield watchNewTodos();
}
