# Type-safe Boilerplate-free Redux Example

Read this blog post

https://medium.com/@esamatti/type-safe-boilerplate-free-redux-906844ec6325

---

Todo App example made with
[immer-reducer][], [@epeli/redux-hooks][] and [redux-saga][]

[@epeli/redux-hooks]: https://github.com/epeli/redux-hooks
[immer-reducer]: https://github.com/epeli/immer-reducer
[redux-saga]: https://github.com/redux-saga/redux-saga


This is also live in Codesandbox

https://codesandbox.io/s/github/epeli/typescript-redux-todoapp

Unfortunately I wasn't able to enable Typescript type checking in it which is
important part of this example so you are better of cloning this locally and
opening it using vscode

    git clone https://github.com/epeli/typescript-redux-todoapp.git
    cd typescript-redux-todoapp
    npm ci
    code .

and start the development server with

    npm start
