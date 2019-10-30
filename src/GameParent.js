
import Vote from "./components/Vote/Vote";
import Question from "./components/Question/Question";
import RoundResults from "./components/RoundResults/RoundResults";
import FinalResults from "./components/FinalResults/FinalResults";
import React, {Component} from "react";
import io from "socket.io-client";


class GameParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalResults: false,
      round: 1,
      question: false,
      roundResults: false,
      vote: false,
      gameQuestion: "When will the world end?",
      answer: '',
      thoseWhoHaventAnswered: [],
      thoseWhoHaventVoted: [],
     

    };
    this.socket = io.connect();
  }

  handleAnswerChange = value => {
    this.setState({
      answer: value
    });
  };


  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
      let component;
    if (this.state.finalResults) {
      component = <FinalResults />;
    } else if (this.state.question) {
      component = <Question 
                    question={this.state.gameQuestion}
                    handleChangeFn={this.handleAnswerChange}
                    answer={this.state.answer}
      />;
    } else if (this.state.vote) {
      component = <Vote 
                    question={this.state.gameQuestion}

      />;
    } else if (this.state.roundResults) {
      component = <RoundResults 
                    round={this.state.round}
      />;
    } 
    return (
        
      <div className="room">
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

export default GameParent;
