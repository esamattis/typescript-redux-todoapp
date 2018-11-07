export interface TodoItem {
    readtext: string;
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
        return this.state.todos.map((todo, index) => String(index));
    }

    getTodo(id: string) {
        return this.state.todos[Number(id)];
    }
}
