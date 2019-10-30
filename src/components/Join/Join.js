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
            <h3 className="waiting">Waiting for players to join</h3>
          </>
        )}
      </div>
    );
  }
}

export default Join;
