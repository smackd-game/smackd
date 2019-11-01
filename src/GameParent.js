import Vote from "./components/Vote/Vote";
import Question from "./components/Question/Question";
import RoundResults from "./components/RoundResults/RoundResults";
import FinalResults from "./components/FinalResults/FinalResults";
import React, {Component} from "react";
import io from "socket.io-client";
import axios from "axios";

export default class GameParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFinalResults: false,
      showQuestion: true,
      showRoundResults: false,
      showVote: false,
      round: 1,
      gameQuestion: "When will the world end?",
      answer: "",
      answers: [],
      players: [],
      name: "",
      code: this.props.match.params.code,
      host: false,
      answeredQuestion: false,
      hasVoted: false,
      isReady: false,
      originalQuestions: [],
      usedQuestions: []
    };
    //Socket listeners
    this.socket = io.connect();
    this.socket.on("update answers", data => {
      if (data.room === this.state.code && !this.state.host) {
        this.setState({
          answers: data.answers
        });
      }
    });
    this.socket.on("game data", data => {
      if (data.room === this.state.code && this.state.host) {
        this.setState({
          players: [...this.state.players, data.name]
        });
        this.socket.emit("update list", {
          players: this.state.players,
          room: this.state.code,
          answers: this.state.answers
        });
      }
    });
    this.socket.on("update list", data => {
      if (data.room === this.state.code && !this.state.host) {
        this.setState({
          players: data.players,
          answers: this.state.answers
        });
      }
    });
    this.socket.on("leave", data => {
      if (data.room === this.state.code) {
        let updatedArr = [...this.state.players];
        let updatedAns = [...this.state.answers];
        let indexA = updatedAns.findIndex(el => {
          return el === data.answers.player;
        });
        const index = updatedArr.findIndex(el => {
          return el === data.name;
        });

        if (index !== -1) {
          updatedArr.splice(index, 1);
          this.setState({
            players: updatedArr
          });
        }
        if (indexA !== -1) {
          updatedAns.splice(indexA, 1);
          this.setState({
            answers: updatedAns
          });
        }
      }
    });
  }
  //Normal functions within Component

  componentDidMount = async () => {
    const user = await axios.get("/user");

    if (user.data.user !== undefined) {
      this.setState({
        name: user.data.user.name,
        code: user.data.user.code,
        host: user.data.user.host
      });

      this.socket.emit("join room", {
        room: this.state.code,
        name: this.state.name
      });
    } else {
      // this.props.history.push(`/`)
    }

    axios.get("/api/questions").then(res => {
      this.setState({
        originalQuestions: res.data
      });
    });
  };

  handleAnswerChange = value => {
    this.setState({
      answer: value
    });
  };

  getQuestion = () => {
    let question;
    let questionsCopy;
    let index;
    if (this.state.usedQuestions.length === 0) {
      index = Math.floor(Math.random() * this.state.originalQuestions.length);
      question = this.state.originalQuestions[index].text;
      questionsCopy = [...this.state.originalQuestions];
    } else {
      index = Math.floor(Math.random() * this.state.usedQuestions.length);
      question = this.state.usedQuestions[index].text;
      questionsCopy = this.state.usedQuestions.slice();
    }
    questionsCopy.splice(index, 1);
    this.setState({
      usedQuestions: questionsCopy
    });
    return question;
  };

  moveToVoting = () => {
    this.setState({
      showVote: true,
      showQuestion: false
    });
  };

  vote = () => {
    this.setState({
      hasVoted: true
    });
  };

  clickedReady = () => {
    this.setState({
      isReady: true
    });
  };

  submit = () => {
    // const index = this.state.players.findIndex(el => {
    //   this.state.name === el.name
    // })
    if (this.state.players !== "") {
      let newAnswersArr = [...this.state.answers];
      newAnswersArr.push({
        text: this.state.answer,
        player: this.state.name,
        points: 0
      });
      this.setState({
        answers: newAnswersArr
      });
    }
    this.setState({
      answeredQuestion: true
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

  moveToNextRound = () => {
    this.setState({
      showRoundResults: false,
      showQuestion: true
    });
    //also need to increment one to round
  };

  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  //render function

  render() {
    console.log(this.state);
    let component;
    if (this.state.showFinalResults) {
      component = <FinalResults />;
    } else if (this.state.showQuestion) {
      component = (
        <Question
          question={this.state.gameQuestion}
          handleChangeFn={this.handleAnswerChange}
          answer={this.state.answer}
          players={this.state.players}
          submitFN={this.submit}
          answeredQuestion={this.state.answeredQuestion}
        />
      );
    } else if (this.state.showVote) {
      component = (
        <Vote
          question={this.state.gameQuestion}
          hasVoted={this.state.hasVoted}
          voteFN={this.vote}
          players={this.state.players}
          answers={this.state.answers}
        />
      );
    } else if (this.state.showRoundResults) {
      component = (
        <RoundResults
          round={this.state.round}
          isReady={this.state.isReady}
          clickedReadyFN={this.clickedReady}
        />
      );
    }
    return <div className="room">{component}</div>;
  }
}
