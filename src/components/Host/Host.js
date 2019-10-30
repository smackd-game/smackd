import React, {Component} from "react";
import io from "socket.io-client";

class Host extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      submittedName: false
    };
    // io.on("join room", data => this.joinRoom(data));
  }

//   joinRoom(data) {
//     io.emit({
//       name: this.state.name,
//       code: this.state.code
//     });
//   }

  componentDidMount() {
    this.props.codeGeneratorFn();
  }

  submit() {
    this.setState({
      submittedName: true
    });
  }

  render() {
    return (
      <div className="host-container">
        {!this.state.submittedName ? (
          <>
            <header className="title">Get Started</header>
            <input
              onChange={e => this.props.handleChangeFn(e.target.value)}
              type="text"
              className="name"
            />
            <button onClick={() => this.submit()} className="submit">
              submit
            </button>
          </>
        ) : (
          <>
            <h3 className="code">{this.props.code}</h3>
            map of connected players
            <button onClick={() => this.props.history.push(`/game/${this.props.code}`)} className="start">Start</button>
          </>
        )}
      </div>
    );
  }
}

export default Host;
