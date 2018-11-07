import {ImmerReducer} from "immer-reducer";
import {State, TodoItem, Selectors} from "./state";

export class TodoReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    addTodo(todo: TodoItem) {
        this.draftState.todos.push(todo);
    }

    completeTodo(id: string) {
        const todo = this.selectors.getTodo(id);
        todo.completed = true;
    }

    revertTodo(id: string) {
        const todo = this.selectors.getTodo(id);
        todo.completed = false;
    }
}
