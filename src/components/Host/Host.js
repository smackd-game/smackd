import React, {Component} from "react";
import axios from "axios";

class Host extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      code: null,
      submittedName: false
    };
  }

  // componentDidMount() {
  //   this.codeGenerator();
  // }

  handleChange(value) {
    this.setState({
      name: value
    });
  }

  // codeGenerator() {
  //   const code = Math.ceil(Math.random() * 10000);
  //   this.setState({
  //     code: code
  //   });
  // }

  submit() {
    this.setState({
      submittedName: true
    });
  }

  // hostGame = () => {
  //   axios.post(`/user`, {}`)
  //   .then()
  // }

  render() {
    return (
      <div className="host-container">
        {!this.state.submittedName ? (
          <>
            <header className="title">Get Started</header>
            <input
              onChange={e => this.handleChange(e.target.value)}
              type="text"
              className="name"
              placeholder="Create Username"
            />
            <button onClick={() => this.submit()} className="submit">
              submit
            </button>
          </>
        ) : (
          <>
            {/* we need to add the code to session */}
            <h3 className="code">{this.props.code}</h3>
            <button>Host Game</button>
          </>
        )}
      </div>
    );
  }
}

export default Host;
