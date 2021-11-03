import React, { Component } from 'react';
import '../chat.css';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messsages: [],
      typedMessage: '',
    };
  }

  render() {
    const { typedMessage, messsages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://cdn-icons-png.flaticon.com/512/1250/1250668.png"
            alt="user dp"
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messsages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
