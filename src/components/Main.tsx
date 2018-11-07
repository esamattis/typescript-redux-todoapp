import React from "react";

import {createTodoConnect} from "../redux/store";

import TodoItem from "./TodoItem";

const TodoListConnect = createTodoConnect({
    mapState: selectors => ({
        todos: selectors.getTodoIDs(),
        completed: selectors.getComletedIDs(),
    }),

    mapActions: actions => ({
        addTodo: actions.addTodo,
    }),
});

const Main = () => (
    <div>
        <h1>TODOs</h1>
        <TodoListConnect>
            {(data, actions) => (
                <>
                    <section>
                        <button onClick={actions.addTodo}>Add todo</button>
                    </section>
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
