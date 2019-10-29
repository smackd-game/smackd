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
      landing: false,
      finalResults: false,
      host: false,
      join: false,
      question: false,
      roundResults: false,
      vote: false
    };
    this.socket = io.connect();
  }

  handleChange = key => {
    this.setState(
      {
        [key]: !this.state[key]
      },
      () => {}
    );
  };

  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
    let component;
    if (this.state.host) {
      component = <Host />;
    } else if (this.state.join) {
      component = <Join />;
    } else if (this.state.question) {
      component = <Question />;
    } else if (this.state.vote) {
      component = <Vote />;
    } else if (this.state.roundResults) {
      component = <RoundResults />;
    } else if (this.state.finalResults) {
      component = <FinalResults />;
    } else {
      component = <Landing />;
    }

    return (
      <div className="room">
        <button
          onClick={() => this.handleClick("landing")}
          className="landing"
        >landing</button>
        <button
          onClick={() => this.handleClick("host")}
          className="host"
        >host</button>
        <button
          onClick={() => this.handleClick("join")}
          className="join"
        >join</button>
        <button
          onClick={() => this.handleClick("question")}
          className="question"
        >question</button>
        <button
          onClick={() => this.handleClick("vote")}
          className="vote"
        >vote</button>
        <button
          onClick={() => this.handleClick("roundResults")}
          className="round-results"
        >round results</button>
        <button
          onClick={() => this.handleClick("finalResults")}
          className="final-results"
        >final results</button>
        {component}
      </div>
    );
  }
}

export default Room;
