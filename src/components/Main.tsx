import React from "react";

import {createTodoConnect} from "../redux/store";

const Foo = createTodoConnect({
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
        <Foo>
            {(data, actions) => (
                <>
                    <button onClick={actions.addTodo}>Add todo</button>
                    <pre>{JSON.stringify(data)}</pre>
                </>
            )}
        </Foo>

        <h1>Completed</h1>
    </div>
);

export default Main;
