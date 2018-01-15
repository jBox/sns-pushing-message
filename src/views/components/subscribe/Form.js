import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Form extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        onSubmit: PropTypes.func
    }

    state = {
        arn: ""
    }

    handleArnChange = (event) => {
        const target = event.target;
        const { value } = target;
        this.setState({ arn: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit(this.state.arn);
        }
    }

    render() {
        const { disabled } = this.props;
        const { arn } = this.setState;
        return (
            <form onSubmit={this.handleSubmit}>
                <ul className="item-box">
                    <li className="icon">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </li>
                    <li className="input">
                        <input onClick={this.handleArnChange} type="text" value={arn}
                            placeholder="Subscribe a new topic" />
                        <button className="enter" type="submit">
                            <i className="fa fa-keyboard-o" aria-hidden="true"></i>
                        </button>
                    </li>
                </ul>
            </form>
        );
    }
}