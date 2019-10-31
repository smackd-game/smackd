import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      showJoin: false,
      showHost: false,
      name: "",
      code: null,
      isHost: false
    };
  }

  componentDidMount = () => {
    const code = `${Math.floor(Math.random() * 10)}${Math.floor(
      Math.random() * 10
    )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
    this.setState({
      code: code
    });
  };
  switchToHost = () => {
    this.setState({
      showHost: true,
      isHost: true
    });
  };
  switchToJoin = () => {
    this.setState({
      showJoin: true
    });
  };
  backFN = () => {
    this.setState({
      showJoin: false,
      showHost: false,
      isHost: false
    });
  };

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  joinGame = async () => {
    const game = await axios.get(`/api/games/${this.state.code}`);
    console.log(game)
    if (game.data !== 'game not found') {
      axios
        .post("/user", {
          name: this.state.name,
          host: this.state.isHost,
          code: this.state.code
        })
        .then(() => {
          this.props.history.push(`/lobby/${this.state.code}`);
        });
    } else {
      swal.fire("That game doesn't exist dummy");
    }
  };

  hostGame = () => {
    axios.post(`/api/games/${this.state.code}`).then(() => {
      axios
        .post("/user", {
          name: this.state.name,
          host: this.state.isHost,
          code: this.state.code
        })
        .then(() => {
          this.props.history.push(`/lobby/${this.state.code}`);
        });
    });
  };

  render() {
    console.log(this.state);
    if (this.state.showHost === false && this.state.showJoin === false) {
      return (
        <div className="landing-container">
          <h1>Smackd</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laudantium, laboriosam aliquid maxime corrupti fuga eaque deserunt
            nemo ducimus, ipsam sed enim! Provident necessitatibus eos
            distinctio error officiis explicabo aliquid pariatur.
          </p>
          <button onClick={() => this.switchToHost()} className="hostbutton">
            Host
          </button>
          <button onClick={() => this.switchToJoin()} className="joinbutton">
            Join
          </button>
        </div>
      );
    } else if (this.state.showHost === true) {
      return (
        <div className="landing-container">
          <h3>Host Game</h3>
          <input
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e, "name")}
            placeholder="Enter Name"
            type="text"
          />
          <button onClick={() => this.backFN()}>Go Back</button>

          <button onClick={() => this.hostGame()} className="hostbutton">Host Game</button>
        </div>
      );
    } else if (this.state.showJoin === true) {
      return (
        <div className="landing-container">
          <h3>Join Game</h3>
          <input
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e, "name")}
            placeholder="Enter Name"
            type="text"
          />
          <input
            name="code"
            onChange={e => this.handleChange(e, "code")}
            placeholder="Enter Code"
            type="number"
          />
          <button onClick={() => this.backFN()}>Go Back</button>

          <button onClick={() => this.joinGame()}>Join Game</button>
        </div>
      );
    }
  }
}

export default Landing;
