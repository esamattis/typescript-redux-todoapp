import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import Main from "./components/Main";
import {createTodoStore} from "./redux/store";

const store = createTodoStore();

function Root() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

const el = document.getElementById("root");

ReactDOM.render(<Root />, el);
