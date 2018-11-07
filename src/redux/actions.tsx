import {ImmerReducer} from "immer-reducer";

import {Selectors, State, TodoItem} from "./state";

export class TodoReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    addTodo() {
        this.draftState.todos.push({text: "", completed: false});
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
