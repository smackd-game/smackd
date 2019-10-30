import React, {Component} from "react";
import io from "socket.io-client";

class Host extends Component {

  render() {
    return (
      <div className="host-container">
        <h3 className="welcome">Welcome {this.props.name}</h3>
        <header className="title">
          Share this code with your friends: {this.props.code}
        </header>
        <p className="player-list">This is where we will map through the players</p>
        <button onClick={() => this.props.handleStartFn()} className="start">
          Start
        </button>
      </div>
    );
  }
}

export default Host;
