import React from "react";

import {useTodoActions, useTodoState} from "../redux/store";

function useTodoItem(id: string) {
    return useTodoState(selectors => selectors.getTodo(id));
}

function useTodoItemActions(id: string) {
    const actions = useTodoActions();

    return {
        setText(text: string) {
            actions.setTodoText({id, text});
        },

        complete() {
            actions.completeTodo({id});
        },
        revert() {
            actions.revertTodo({id});
        },
    };
}

const TodoItem = (props: {id: string}) => {
    const actions = useTodoItemActions(props.id);
    const todo = useTodoItem(props.id);

    return (
        <div>
            <input
                value={todo.text}
                onChange={e => {
                    actions.setText(e.target.value);
                }}
            />

            <button
                onClick={todo.completed ? actions.revert : actions.complete}
            >
                {todo.completed ? "revert" : "complete"}
            </button>
            {todo.saveState}
        </div>
    );
};

export default React.memo(TodoItem);
