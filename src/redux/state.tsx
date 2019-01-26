export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    saveState: "saved" | "dirty" | "saving";
}

export interface State {
    todos: {[id: string]: TodoItem};
}

export const initialState: State = {
    todos: {},
};

/**
 * Some state selection helpers. Using helper like makes it easier to refactor
 * the the state structure when required. This selector helper can be used in
 * both the render prop connect and the Immer Reducer.
 */
export class Selectors {
    state: State;

    constructor(state: State) {
        this.state = state;
    }

    getTodoIDs() {
        return Object.values(this.state.todos)
            .filter(todo => !todo.completed)
            .map(todo => todo.id);
    }

    getComletedIDs() {
        return Object.values(this.state.todos)
            .filter(todo => todo.completed)
            .map(todo => todo.id);
    }

    getTodo(id: string) {
        const maybeTodo = this.state.todos[id];
        if (!maybeTodo) {
            throw new Error("Cannot find todo with id: " + id);
        }
        return maybeTodo;
    }
}
