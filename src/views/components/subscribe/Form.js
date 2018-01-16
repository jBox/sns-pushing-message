import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Form extends Component {
    static propTypes = {
        status: PropTypes.string,
        error: PropTypes.string,
        onSubmit: PropTypes.func
    }

    state = {
        arn: ""
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status !== this.props.status) {
            if (nextProps.status === "ready") {
                this.setState({ arn: "" });
            }
        }
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
        const { arn } = this.state;
        if (onSubmit && arn) {
            onSubmit(arn);
        }
    }

    render() {
        const { status, error } = this.props;
        const { arn } = this.state;
        const disabled = status === "request";
        return (
            <form onSubmit={this.handleSubmit}>
                <ul className="item-box">
                    <li className="icon">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </li>
                    <li className="input">
                        <input onChange={this.handleArnChange} type="text" value={arn}
                            placeholder="Subscribe a new topic" disabled={disabled} />
                        <button className="enter" type="submit" disabled={disabled}>
                            <i className="fa fa-keyboard-o" aria-hidden="true"></i>
                        </button>
                    </li>
                </ul>
                <div className="error-message">{error}</div>
            </form>
        );
    }
}