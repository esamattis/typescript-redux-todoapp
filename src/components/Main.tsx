import React from "react";

import {createTodoConnect} from "../redux/store";

import TodoItem from "./TodoItem";

const AddTodoConnect = createTodoConnect({
    mapActions: actions => ({
        addTodo: actions.addTodo,
    }),
});

const TodoListConnect = createTodoConnect({
    mapState: selectors => ({
        todos: selectors.getTodoIDs(),
        completed: selectors.getComletedIDs(),
    }),
});

const Main = () => (
    <div>
        <AddTodoConnect>
            {(_, actions) => (
                <div style={{padding: 10}}>
                    <button
                        onClick={() => {
                            actions.addTodo({id: String(Math.random())});
                        }}
                    >
                        Add todo
                    </button>
                </div>
            )}
        </AddTodoConnect>

        <TodoListConnect>
            {data => (
                <>
                    <h1>TODOs</h1>
                    {data.todos.map(id => (
                        <TodoItem key={id} id={id} />
                    ))}

                    <h1>Completed</h1>
                    {data.completed.map(id => (
                        <TodoItem key={id} id={id} />
                    ))}
                </>
            )}
        </TodoListConnect>
    </div>
);

export default Main;
