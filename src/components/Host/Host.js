import React, {Component} from "react";

class Host extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      code: null,
      submittedName: false
    };
  }

  componentDidMount() {
    this.codeGenerator();
  }

  handleChange(value) {
    this.setState({
      name: value
    });
  }

  codeGenerator() {
    const code = Math.ceil(Math.random() * 10000);
    this.setState({
      code: code
    });
  }

  submit() {
    this.setState({
      submittedName: true
    });
  }

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
            />
            <button onClick={() => this.submit()} className="submit">
              submit
            </button>
          </>
        ) : (
          <>
            <h3 className="code">{this.state.code}</h3>
          </>
        )}
      </div>
    );
  }
}

export default Host;
