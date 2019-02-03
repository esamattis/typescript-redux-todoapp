import React from "react";

import {useTodoActions, useTodoState} from "../redux/store";

import TodoItem from "./TodoItem";

function useTodoIds() {
    return useTodoState(selectors => ({
        todos: selectors.getTodoIDs(),
        completed: selectors.getComletedIDs(),
    }));
}

let ID = 1;

const Main = () => {
    const actions = useTodoActions();
    const data = useTodoIds();

    return (
        <div>
            <div style={{padding: 10}}>
                <button
                    onClick={() => {
                        actions.addTodo({id: String(ID++)});
                    }}
                >
                    Add todo
                </button>
            </div>

            <h1>TODOs</h1>
            {data.todos.map(id => (
                <TodoItem key={id} id={id} />
            ))}

            <h1>Completed</h1>
            {data.completed.map(id => (
                <TodoItem key={id} id={id} />
            ))}
        </div>
    );
};

export default Main;
