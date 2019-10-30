import Host from "./components/Host/Host";
import Join from "./components/Join/Join";
import Vote from "./components/Vote/Vote";
import Question from "./components/Question/Question";
import React, {Component} from "react";
import io from "socket.io-client";
import Landing from "./components/Landing/Landing";
import RoundResults from "./components/RoundResults/RoundResults";
import FinalResults from "./components/FinalResults/FinalResults";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: false,
      join: false,
      code: null,
      hostName: ""
    };
    this.socket = io.connect();
    this.socket.on("join room", data => this.joinRoom(data));
  }

  componentDidMount = () => {
    this.socket.emit("join room", {
      room: this.state.code
    });
  };

  joinRoom(data) {
    const roomsArr = this.state.rooms.slice();
    roomsArr.push(data);
    this.setState({
      rooms: roomsArr
    });
  }

  handleChange = key => {
    this.setState({
      [key]: !this.state[key]
    });
  };

  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  codeGenerator = () => {
    const code = `${Math.floor(Math.random() * 10)}${Math.floor(
      Math.random() * 10
    )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
    this.setState({
      code: code
    });
  };

  handleChange = value => {
    this.setState({
      hostName: value
    });
  };

  render() {
    let component;
    if (this.state.host) {
      component = (
        <Host
          handleChangeFn={this.handleChange}
          codeGeneratorFn={this.codeGenerator}
          hostName={this.state.hostName}
          code={this.state.code}
        />
      );
    } else if (this.state.join) {
      component = <Join />;
    }

    return (
      <div className="room">
        {/* <button onClick={() => this.handleClick("landing")} className="landing">
          landing
        </button>
        <button onClick={() => this.handleClick("host")} className="host">
          host
        </button>
        <button onClick={() => this.handleClick("join")} className="join">
          join
        </button>
        <button
          onClick={() => this.handleClick("question")}
          className="question"
        >
          question
        </button>
        <button onClick={() => this.handleClick("vote")} className="vote">
          vote
        </button>
        <button
          onClick={() => this.handleClick("roundResults")}
          className="round-results"
        >
          round results
        </button>
        <button
          onClick={() => this.handleClick("finalResults")}
          className="final-results"
        >
          final results
        </button> */}
        {component}
      </div>
    );
  }
}
export default Room;