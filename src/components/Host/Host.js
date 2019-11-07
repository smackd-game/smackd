import React, {Component} from "react";
import "./_host.scss"

class Host extends Component {
  render() {
    const players = this.props.players.map((el, i) => <p key={i}>{el}</p>);
    return (
      <div className="host-container">
        <div className = "top-host">
          <div className = "hello">
            <h3>Hello, {this.props.name}!</h3>
          </div>
          <div className = "share-container">
            <div className = "share-box">
              <h3>Share Code</h3>
            </div>
            <div className = "share-code">
            <h3>{this.props.code}</h3>
            </div>
          </div>
        </div>
        <div className = "middle-host">
          <div className = "list">
          <h3>Players!</h3>
          <p>{players}</p>
          </div>
        </div>
        <div className = "bottom-host">
          <div className = "buttons">
          <button className = "button" onClick={() => this.props.handleStartFn()} className='landing-button'>
          Start
          </button>
          <button onClick={() => this.props.leaveGameFn()} className='landing-button'>Leave Game</button>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Host;
