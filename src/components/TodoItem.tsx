import React from "react";

import {createTodoConnect} from "../redux/store";

const TodoConnect = createTodoConnect({
    mapState: (selectors, props: {id: string}) => selectors.getTodo(props.id),

    mapActions: (actions, props) => ({
        setText(text: string) {
            actions.setTodoText(props.id, text);
        },

        complete() {
            actions.completeTodo(props.id);
        },
        revert() {
            actions.revertTodo(props.id);
        },
    }),
});

const TodoItem = (props: {id: string}) => (
    <TodoConnect id={props.id}>
        {(data, actions) => (
            <div>
                <input
                    value={data.text}
                    onChange={e => {
                        actions.setText(e.target.value);
                    }}
                />

                <button
                    onClick={data.completed ? actions.revert : actions.complete}
                >
                    {data.completed ? "revert" : "complete"}
                </button>
            </div>
        )}
    </TodoConnect>
);

//  No typing for this yet
//reactjs.org/docs/react-api.html#reactmemo
declare module "react" {
    function memo<T>(a: T): T;
}

export default React.memo(TodoItem);
