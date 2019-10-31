import React, {Component} from "react";

class Host extends Component {
  render() {
    const players = this.props.players.map(el => <p>{el}</p>);
    return (
      <div className="host-container">
        <h3 className="welcome">Welcome {this.props.name}</h3>
        <header className="title">
          Share this code with your friends: {this.props.code}
        </header>
        {players}
        <button onClick={() => this.props.handleStartFn()} className="start">
          Start
        </button>
        <button onClick={() => this.props.leaveGameFn()} className="leave">Leave Game</button>
      </div>
    );
  }
}

export default Host;
