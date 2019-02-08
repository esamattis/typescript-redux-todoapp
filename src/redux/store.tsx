import {
    createUseMapState,
    createUsePassiveMapState,
    createUseSelect,
    useActionCreators,
} from "@epeli/redux-hooks";
import {createReducerFunction} from "immer-reducer";
import {
    Action,
    applyMiddleware,
    bindActionCreators,
    compose,
    createStore,
    Reducer,
} from "redux";
import createSagaMiddleware from "redux-saga";

import {TodoActions, TodoLifecycleReducer, TodoReducer} from "./actions";
import {rootSaga} from "./sagas";
import {initialState, Selectors, State} from "./state";

export const useTodoState = createUseMapState<State>();

export function useTodoSelectors<T>(map: (selectors: Selectors) => T) {
    return useTodoState(state => {
        return map(new Selectors(state));
    });
}

export const usePassiveTodoState = createUsePassiveMapState<State>();

export function usePassiveTodoSelectors<T>(
    map: (selectors: Selectors) => T,
    deps: any[],
) {
    return usePassiveTodoState(state => {
        return map(new Selectors(state));
    }, deps);
}

export const useTodoSelect = createUseSelect<State>();

export function useTodoActions() {
    return useActionCreators(TodoActions);
}

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

/**
 * Combine multiple reducers into a single one
 *
 * @param reducers two or more reducer
 */
function composeReducers<S>(
    ...reducers: (Reducer<S, any>)[]
): Reducer<any, any> {
    return (firstState: any, action: any) =>
        reducers.reduce((state, subReducer) => {
            if (typeof subReducer === "function") {
                return subReducer(state, action);
            }

            return state;
        }, firstState) || firstState;
}

export function createTodoStore() {
    const reducer = composeReducers<State>(
        createReducerFunction(TodoReducer, initialState),
        createReducerFunction(TodoLifecycleReducer, initialState),
    );
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
