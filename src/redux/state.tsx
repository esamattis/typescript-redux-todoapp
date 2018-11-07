export interface TodoItem {
    text: string;
    completed: boolean;
}

export interface State {
    todos: TodoItem[];
}

export const initialState = {
    todos: [],
};

export class Selectors {
    state: State;

    constructor(state: State) {
        this.state = state;
    }

    getTodoIDs() {
        return this.state.todos
            .filter(todo => !todo.completed)
            .map((todo, index) => String(index));
    }

    getComletedIDs() {
        return this.state.todos
            .filter(todo => todo.completed)
            .map((todo, index) => String(index));
    }

    getTodo(id: string) {
        return this.state.todos[Number(id)];
    }
}
