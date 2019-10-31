import React, {Component} from "react";
import "./_host.scss"

class Host extends Component {
  render() {
    const players = this.props.players.map(el => <p>{el}</p>);
    return (
      <div className="host-container">
        <h3 className="welcome">Welcome, {this.props.name}!</h3>
        <header className="title">
          <p>Here's your code</p>
          <h3>{this.props.code}</h3>
          <p>Share the code with friends to get started</p>
        </header>
        <div className="whosreadytoplay">
          <h3>Here's who's ready to play:</h3>
          <p>{players}</p>
        </div>
        
        <button onClick={() => this.props.handleStartFn()} className='landing-button'>
          Start
        </button>
        <button onClick={() => this.props.leaveGameFn()} className='landing-button'>Leave Game</button>
      </div>
    );
  }
}

export default Host;
