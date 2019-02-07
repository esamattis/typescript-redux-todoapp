import React from "react";

import {useTodoActions, useTodoState} from "../redux/store";

import TodoItem from "./TodoItem";

function useCompletedIds() {
    return useTodoState(selectors => selectors.getComletedIDs());
}

function useTodoIds() {
    return useTodoState(selectors => selectors.getTodoIDs());
}

let ID = 1;

const Main = () => {
    const actions = useTodoActions();
    const todoIds = useTodoIds();
    const completedIds = useCompletedIds();

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
            {todoIds.map(id => (
                <TodoItem key={id} id={id} />
            ))}

            <h1>Completed</h1>
            {completedIds.map(id => (
                <TodoItem key={id} id={id} />
            ))}
        </div>
    );
};

export default Main;
