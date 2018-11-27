import React, { Component } from "react";
var rhea = require("rhea");

class RheaTest extends Component {
  state = {
    host: "localhost",
    port: 5673,
    body: "Hello World!",
    results: ""
  };
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const server = `ws://${this.state.host}:${this.state.port}`;
    let ws = rhea.websocket_connect(WebSocket);
    let connection = rhea.connect({
      connection_details: ws(server, ["binary", "AMQPWSB10", "amqp"]),
      reconnect: false
    });
    connection.open_receiver("reactTest");
    let sender = connection.open_sender("reactTest");
    sender.send({ body: this.state.body });
    rhea.on(
      "message",
      function(context) {
        this.setState({
          results: context.message.body
        });
        context.connection.close();
      }.bind(this)
    );
  };

  render() {
    return (
      <div>
        <script
          type="text/javascript"
          src="../node_modules/rhea/dist/rhea.js"
          async
        />
        <form className="react-form">
          <label>
            <span>Host</span>
            <input
              type="text"
              name="host"
              value={this.state.host}
              placeholder="host"
              onChange={e => this.change(e)}
            />
          </label>
          <label>
            <span>Port</span>
            <input
              type="number"
              name="port"
              value={this.state.port}
              placeholder="port"
              onChange={e => this.change(e)}
            />
          </label>
          <label>
            <span>Message</span>
            <input
              type="text"
              name="body"
              value={this.state.body}
              placeholder="message body"
              onChange={e => this.change(e)}
            />
          </label>
          <br />
          <br />
          <br />
          <button onClick={e => this.onSubmit(e)}>Submit</button>
          <label>
            <span>Results</span>
            <input id="results" readOnly value={this.state.results} />
          </label>
        </form>
      </div>
    );
  }
}

export default RheaTest;
