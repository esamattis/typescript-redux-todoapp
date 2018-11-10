import {ImmerReducer} from "immer-reducer";

import {Selectors, State, TodoItem} from "./state";

export class TodoReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    addTodo() {
        this.draftState.todos.push({
            // Generating id like this is an side effect and should not be made
            // in side a reducer. Better place for it would be in a thunk for
            // example.
            id: String(Date.now()),
            text: "",
            completed: false,
        });
    }

    completeTodo(id: string) {
        const todo = this.selectors.getTodo(id);
        todo.completed = true;
    }

    revertTodo(id: string) {
        const todo = this.selectors.getTodo(id);
        todo.completed = false;
    }

    setTodoText(id: string, text: string) {
        const todo = this.selectors.getTodo(id);
        todo.text = text;
    }
}
