import {HooksProvider} from "@epeli/redux-hooks";
import React from "react";
import ReactDOM from "react-dom";

import Main from "./components/Main";
import {createTodoStore} from "./redux/store";

const store = createTodoStore();

function Root() {
    return (
        <HooksProvider store={store}>
            <Main />
        </HooksProvider>
    );
}

const el = document.getElementById("root");

ReactDOM.render(<Root />, el);
