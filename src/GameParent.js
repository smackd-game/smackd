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
    this.socket.on("start", data => {
      console.log(data);
      if (data === "get ready to start") {
        this.setState({
          start: true
        });
      }
    });

    // this.socket.on("join room", data => this.joinRoom(data));
    this.socket.on("game data", data => {
      if (data.room === this.state.code && this.state.host) {
        this.setState({
          players: [
            ...this.state.players,
            {
              name: data.name,
              code: data.room,
              answer: data.answer,
              roundPoints: data.roundPoints,
              totalPoints: data.totalPoints
            }
          ]
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
  //Normal functions within Component

  componentDidMount = async () => {
    
    const user = await axios.get("/user");
    this.setState({
      name: user.data.user.name,
      code: user.data.user.code,
      host: user.data.user.host
    });
    if(this.state.players.length !== 0){
        this.socket.emit("update answers", {
            players: this.state.players
        })
    
    } else {
        console.log('the players array was empty fool')
    }
       
    
    this.socket.emit("join room", {
      room: this.state.code,
      name: this.state.name,
      answer: "",
      roundPoints: null,
      totalPoints: null
    });

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
    let answer = this.state.answer
    let index = this.state.players.findIndex(el => el.name === this.state.name) 
    let newPlayersArr = [...this.state.players]
    newPlayersArr[index].answer = answer

    this.setState({
        players: newPlayersArr
    })

    this.setState({
      answeredQuestion: true
    });
  
    
    // const index = this.state.players.findIndex(el => {
    //   this.state.name === el.name
    // })
    // if (this.state.players !== "") {
    //   let newAnswersArr = [...this.state.answers];
    //   newAnswersArr.push({
    //     text: this.state.answer,
    //     player: this.state.name,
    //     points: 0
    //   });
    //   this.setState({
    //     answers: newAnswersArr
    //   });
    // }
}

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
    const playersNames = this.state.players.map(el => {
        return el.name;
      });
    let component;
    if (this.state.showFinalResults) {
      component = <FinalResults />;
    } else if (this.state.showQuestion) {
      component = (
        <Question
          question={this.state.gameQuestion}
          handleChangeFn={this.handleAnswerChange}
          answer={this.state.answer}
          players={playersNames}
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
          players={playersNames}
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
