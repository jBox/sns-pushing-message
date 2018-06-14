import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchMessages, getSns, switchSns } from "../redux/actions";

const Message = ({ topic, subject, message }) => {
    return (
        <div className="message">
            <p><label><span>Topic</span> {topic}</label></p>
            <p><label><span>Subject</span> {subject}</label></p>
            <p><label><span>Message</span> {message}</label></p>
        </div>
    );
}

class Output extends Component {

    static propTypes = {
        sns: PropTypes.string,
        messages: PropTypes.object,
        fetchMessages: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            sns: props.sns
        };

        this.DELAY = 10000;
        this.timeout = 0;
    }

    componentDidMount() {
        const { getSns } = this.props;
        if (getSns) {
            getSns();
        }

        this.queryMessages();
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sns !== this.props.sns && this.state.sns !== nextProps.sns) {
            this.setState({ sns: nextProps.sns });
        }
    }

    queryMessages = () => {
        const { fetchMessages } = this.props;
        if (fetchMessages) {
            fetchMessages();
            this.timeout = setTimeout(this.queryMessages, this.DELAY);
        }
    }

    handleSnsChange = (event) => {
        const { checked } = event.target;
        const sns = checked ? "on" : "off";
        this.setState({ sns });
        const { switchSns } = this.props;
        if (switchSns) {
            switchSns(sns);
        }
    }

    render() {
        const { messages } = this.props;
        const { sns } = this.state;
        const items = messages.data;
        return (
            <div className="output">
                <div className="output-title">
                    <h3>Messages ({messages.totalCount})</h3>
                    <label><input type="checkbox" checked={sns === "on"} onChange={this.handleSnsChange} />
                        <span>SNS {sns.toUpperCase()}</span></label>
                </div>
                <div className="output-messages">
                    {items.map((item, index) => (
                        <Message key={index} subject={item.Subject} message={item.Message} topic={item.TopicArn} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        sns: state.sns
    };
};

export default connect(mapStateToProps, {
    fetchMessages, getSns, switchSns
})(Output);