import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Output from "./containers/Output";
import Subscribe from "./containers/Subscribe";

class App extends Component {
    render() {
        return (
            <div className="main">
                <h1>SNS Console</h1>
                <Subscribe />
                <Output />
            </div>
        );
    }
}

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

const root = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);