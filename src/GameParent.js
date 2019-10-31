import Vote from "./components/Vote/Vote";
import Question from "./components/Question/Question";
import RoundResults from "./components/RoundResults/RoundResults";
import FinalResults from "./components/FinalResults/FinalResults";
import React, {Component} from "react";
import io from "socket.io-client";
import axios from "axios";

class GameParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFinalResults: false,
      round: 1,
      showQuestion: true,
      showRoundResults: false,
      showVote: false,
      gameQuestion: "When will the world end?",
      answer: "",
      thoseWhoHaventAnswered: [],
      thoseWhoHaventVoted: [],
      answers: [],
      players: [],
      name: "",
      code: null,
      host: null
    };
    this.socket = io.connect();
    
    this.socket.on("game data", data => {
      if (data.room === this.props.match.params.code && this.state.host) {
        this.setState({
          players: [...this.state.players, data.name]
        });
        this.socket.emit("update list", {
          players: this.state.players,
          room: this.state.code
        });
      }
    });
    this.socket.on("update list", data => {
      if (data.room === this.state.code && !this.state.host) {
        this.setState({
          players: data.players
        });
      }
    });
    this.socket.on("leave", data => {
      if (data.room === this.state.code) {
        let updatedArr = [...this.state.players];
        const index = updatedArr.findIndex(el => {
          return el === data.name;
        });

        if (index !== -1) {
          updatedArr.splice(index, 1);
          this.setState({
            players: updatedArr
          });
        }
      }
    });
  }

  componentDidMount = async () => {
    const user = await axios.get("/user");
    this.setState({
      name: user.data.user.name,
      code: user.data.user.code,
      host: user.data.user.host
    });

    this.socket.emit("join room", {
      room: this.state.code,
      name: this.state.name
    });
  };

  handleAnswerChange = value => {
    this.setState({
      answer: value
    });
  };

  moveToVoting = () => {
    this.setState({
      showVote: true,
      showQuestion: false
    });
  };

  leaveGame = () => {
    this.props.history.push(`/`);
  };

  moveToResults = () => {
    //We will need an if statement here that checks if it is the last round or not
    //if it is not the last round then we will fire
    this.setState({
      showQuestion: false,
      showRoundResults: true
    });
    //if it is the last round, then we will fire this
    this.setState({
      showQuestion: false,
      showFinalResults: true
    });
  };

  startTheRoundOverAgain = () => {
    this.setState({
      showRoundResults: false,
      showQuestion: true
    });
  };

  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
    console.log(this.state.players)
    let component;
    if (this.state.showFinalResults) {
      component = <FinalResults />;
    } else if (this.state.showQuestion) {
      component = (
        <Question
          question={this.state.gameQuestion}
          handleChangeFn={this.handleAnswerChange}
          answer={this.state.answer}
        />
      );
    } else if (this.state.showVote) {
      component = <Vote question={this.state.gameQuestion} />;
    } else if (this.state.showRoundResults) {
      component = <RoundResults round={this.state.round} />;
    }
    return (
      <div className="room">
        Game Parent
        {component}
      </div>
    );
  }
}

export default GameParent;
