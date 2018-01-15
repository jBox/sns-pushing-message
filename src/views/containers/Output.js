import React, { Component } from "react";

export default class Output extends Component {
    render() {
        return (
            <div className="output">
                <h3>Messages</h3>
                <textarea readOnly/>
            </div>
        );
    }
}
