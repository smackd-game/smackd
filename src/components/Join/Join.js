import React, {Component} from "react";

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
    return (
      <div className="host-container">
        <h3 className="welcome">Welcome {this.props.name}</h3>
        <header className="title">
          Share this code with your friends: {this.props.code}
        </header>
        <p className="player-list">
          This is where we will map through the players
        </p>

        <h1 className="waiting">Waiting on host</h1>
      </div>
    );
  }
}

export default Join;
