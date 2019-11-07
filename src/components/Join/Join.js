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
        <div className = "top-host2">
          <h3 className="welcome">Welcome, {this.props.name}!</h3>
        </div>
        
        <div className="middle-host2">
          <div className = "list">
            <h3>Players!</h3>
            {players}
          </div>
        </div>
        <div className = "bottom-host">
          <div>
            <p>Waiting for Host</p>
          </div>
          <div>
            <button className='landing-button' onClick={() => this.props.leaveGameFn()} >Leave Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Join;
