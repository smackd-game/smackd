import React, {Component} from "react";
import './_join.scss'

class Join extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      submittedName: false,
      code: null
    };
  }

  handleChange(value) {
    this.setState({
      name: value
    });
  }

  handleCode(value) {
    this.setState({
      code: value
    });
  }

  submit = () => {
    this.setState({
      submittedName: true
    });
  };

  render() {
    const players = this.props.players.map((el, i) => <p key={i}>{el}</p>);
    return (
      <div className="host-container">
        <h3 className="welcome">Welcome, {this.props.name}!</h3>
        
        <div className="whosreadytoplay">
          <h3>Here's who's ready to play:</h3>
          {players}
        </div>
        <p className='waitingonhost' >Waiting for other players to join and for the Host to start the game</p>
        <button className='landing-button' onClick={() => this.props.leaveGameFn()} >Leave Game</button>
      </div>
    );
  }
}

export default Join;
