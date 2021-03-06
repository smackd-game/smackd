import Vote from "./components/Vote/Vote";
import Question from "./components/Question/Question";
import RoundResults from "./components/RoundResults/RoundResults";
import FinalResults from "./components/FinalResults/FinalResults";
import React, {Component} from "react";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";

export default class GameParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFinalResults: false,
      showQuestion: true,
      showRoundResults: false,
      showVote: false,
      round: 1,
      gameQuestion: "",
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
      usedQuestions: [],
      numberOfRounds: null
    };
    //Socket listeners
    this.socket = io.connect(
      undefined,
      {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      }
    );
    this.socket.on("start", data => {
      if (data === "get ready to start") {
        this.setState({
          start: true
        });
      }
    });

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
        this.socket.emit("update answers", {
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
    this.socket.on("re-receive answers", data => {
      this.setState({
        players: data.players
      });
      let playersAnswers = this.state.players.filter(el => el.answer);
      if (this.state.players.length === playersAnswers.length) {
        this.setState({
          showQuestion: false,
          showVote: true
        });
      }
    });

    this.socket.on("receive the answer", data => {
      if (this.state.host) {
        let answer = data.answer;
        let newPlayersArr = [...this.state.players];
        let index = newPlayersArr.findIndex(el => el.name === data.name);
        if (index === -1) {
          newPlayersArr.push(data);
        } else {
          newPlayersArr[index].answer = answer;
        }
        this.setState({
          players: newPlayersArr
        });
        this.socket.emit("re-emit answers", {
          players: newPlayersArr,
          room: this.state.code
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
    this.socket.on("receive answer", data => {
      if (this.state.host) {
        let answer = data.answer;
        let newPlayersArr = [...this.state.players];
        let index = newPlayersArr.findIndex(el => el.name === data.name);
        if (index === -1) {
          newPlayersArr.push(data);
        } else {
          newPlayersArr[index].answer = answer;
        }
        this.setState({
          players: newPlayersArr
        });
        this.socket.emit("update answers", {
          players: newPlayersArr,
          room: this.state.code
        });
      }
    });
    this.socket.on("voted", data => {
      if (this.state.host) {
        const playersCopy = [...this.state.players];
        const index = playersCopy.findIndex(
          el => el.name === data.voteRecipient
        );
        const index1 = playersCopy.findIndex(el => el.name === data.name);
        playersCopy[index1].didVote = true;
        playersCopy[index].roundPoints += 5;
        playersCopy[index].totalPoints += 5;
        this.socket.emit("resending voted data", {
          players: playersCopy,
          room: this.state.code,
          numberOfRounds: this.state.numberOfRounds
        });
      }
    });
    this.socket.on("ready to go", data => {
      if (this.state.host) {
        let playersCopy = [...this.state.players];
        const index = playersCopy.findIndex(el => el.name === data.name);
        playersCopy[index].readyForNextRound = true;
        this.socket.emit("resending ready for next round data", {
          players: playersCopy,
          room: this.state.code,
          round: this.state.round
        });
      }
    });
    this.socket.on("get updated ready data", data => {
      
      this.setState({
        players: data.players,
        
      });
      let playersWhoAreReady = this.state.players.filter(
        el => el.readyForNextRound
      );
      // let nextRound = this.state.round++;
      if (this.state.players.length === playersWhoAreReady.length) {
        this.setState({
          // round: nextRound,
          showRoundResults: false,
          showQuestion: true,
          gameQuestion: "",
          hasVoted: false,
          answeredQuestion: false,
          isReady: false,
          roundPoints: 0
        });
        let nextRound = data.round +=1;
        // console.log(nextRound)
        // console.log(data.round)
        if (this.state.host) {
          this.socket.emit("emit one of clearing player object", {
            players: this.state.players,
            room: this.state.code,
            round: nextRound
          });
        }
      }
    });
    this.socket.on("emit two of clearing player object", data => {
      if (this.state.host) {
        let playersArr = [...data.players];

        for (let i = 0; i < playersArr.length; i++) {
          playersArr[i].answer = "";
          playersArr[i].readyForNextRound = false;
          playersArr[i].roundPoints = 0;
          playersArr[i].didVote = false;
        }
        this.setState({
          players: playersArr,
      
        });
        this.socket.emit("emit three of clearing player object", {
          players: playersArr,
          room: this.state.code,
          round: data.round
        });
      }
    });
    this.socket.on("emit four of clearing player object", data => {
      this.setState({
        players: data.players,
        round: data.round
      });
    });
    this.socket.on("getting voted data", data => {
      this.setState({
        players: data.players,
        numberOfRounds: data.numberOfRounds
      });
      let playersWhoVoted = this.state.players.filter(el => el.didVote);
      if (this.state.players.length === playersWhoVoted.length) {
        this.setState({
          showVote: false
        });
        if (this.state.round !== this.state.numberOfRounds) {
          this.setState({
            showRoundResults: true
          });
        } else {
          this.setState({
            showFinalResults: true
          });
        }
      }
    });
    this.socket.on("receive question", data => {
      this.setState({
        gameQuestion: data.question
      });
    });
    // this.socket.on("received vote", data => {
    //   this.setState({});
    // });
  }
  //Normal functions within Component

  componentDidMount = async () => {
    const user = await axios.get("/user");

    this.setState({
      name: user.data.user.name,
      code: user.data.user.code,
      host: user.data.user.host,
      numberOfRounds: user.data.user.numberOfRounds
    });
    if (this.state.players.length !== 0) {
      this.socket.emit("update answers", {
        players: this.state.players,
        room: this.state.code
      });
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
      this.getQuestion();
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.round !== this.state.round) {
      this.getQuestion();
    }
  }

  handleAnswerChange = value => {
    this.setState({
      answer: value
    });
  };

  getQuestion = async () => {
    if (this.state.host) {
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
      await this.setState({
        gameQuestion: question
      });
      this.socket.emit("send question", {
        question: this.state.gameQuestion,
        room: this.state.code
      });
    }
  };

  moveToVoting = () => {
    this.setState({
      showVote: true,
      showQuestion: false
    });
  };

  vote = name => {
    if (name === this.state.name) {
      return Swal.fire("Nice try. That's yours remember?");
    }
    this.setState({
      hasVoted: true
    });

    this.socket.emit("has voted", {
      name: this.state.name,
      room: this.state.code,
      voteRecipient: name
    });
  };

  clickedReady = () => {
    this.setState({
      isReady: true,
      answer: ""
    });
    this.socket.emit("ready for next round", {
      name: this.state.name,
      room: this.state.code
    });
  };

  submit = () => {
    if (!this.state.answer) {
      return Swal.fire("Really? Nothing?");
    }
    this.setState({
      answeredQuestion: true
    });

    this.socket.emit("send answer", {
      name: this.state.name,
      room: this.state.code,
      answer: this.state.answer,
      roundPoints: null,
      totalPoints: null
    });
  };

  leaveGame = () => {
    this.props.history.push(`/`);
  };

  moveToResults = () => {
    if (this.state.round === this.state.numberOfRounds) {
      this.setState({
        showVote: false,
        showFinalResults: true
      });
    } else if (this.state.round !== this.state.numberOfRounds) {
      this.setState({
        showRoundResults: true,
        showVote: false
      });
    }
  };

  moveToNextRound = () => {
    // let currentRound = this.state.round;
    // let nextRound = currentRound++;
    this.setState({
      showRoundResults: false,
      showQuestion: true
      //   round: nextRound
    });
  };

  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  //render function

  render() {
    const playersNames = this.state.players.map(el => {
      return el.name;
    });
    // const playersAnswers = this.state.players.map(el => {
    //   return {answer: el.answer, name: el.name};
    // });
    let component;
    if (this.state.showFinalResults) {
      component = (
        <FinalResults players={this.state.players} code={this.state.code} />
      );
    } else if (this.state.showQuestion) {
      component = (
        <Question
          question={this.state.gameQuestion}
          handleChangeFn={this.handleAnswerChange}
          answer={this.state.answer}
          players={playersNames}
          submitFN={this.submit}
          answeredQuestion={this.state.answeredQuestion}
          playersArr={this.state.players}
        />
      );
    } else if (this.state.showVote) {
      component = (
        <Vote
          question={this.state.gameQuestion}
          hasVoted={this.state.hasVoted}
          voteFN={this.vote}
          players={this.state.players}
        />
      );
    } else if (this.state.showRoundResults) {
      component = (
        <RoundResults
          round={this.state.round}
          isReady={this.state.isReady}
          clickedReadyFN={this.clickedReady}
          players={this.state.players}
        />
      );
    }
    return <div className="room">{component}</div>;
  }
}
