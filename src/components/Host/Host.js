import React, {Component} from "react";
import "./_host.scss"

class Host extends Component {
  render() {
    const players = this.props.players.map(el => <p>{el}</p>);
    return (
      <div className="host-container">
        <div className = "top-host">
          <div className = "hello">
            <h3>Hello, {this.props.name}!</h3>
          </div>
          <div className = "share-code">
            <h3>Share CODE: {this.props.code}</h3>
          </div>
        </div>
        <div className = "middle-host">
          <h3>List of Losers!</h3>
          <div className = "list">
          <h3>Here's who's ready to play:</h3>
          <p>{players}</p>
          </div>
        </div>
        <div className = "bottom-host">
          <div className = "buttons"></div>
        </div>
        
        
        <h3 className="welcome">Welcome, {this.props.name}!</h3>
        <header className="title">
          <p>Here's your code</p>
          <h3>Share CODE: {this.props.code}</h3>
          <p>Share the code with friends to get started</p>
        </header>
        <div className="whosreadytoplay">
          {/* <h3>Here's who's ready to play:</h3>
          <p>{players}</p> */}
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
