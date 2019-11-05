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
    this.socket = io.connect();
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

    this.socket.on("receive answers", data => {
      console.log(data);
      if (data.room === this.state.code) {
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
    this.socket.on('voted', data => {
        if(this.state.host){
            const playersCopy = [...this.state.players];
            const index = playersCopy.findIndex(
            el => el.name === data.voteRecipient
                );
            const index1 = playersCopy.findIndex(
                el => el.name === data.name
            )
            playersCopy[index1].didVote = true;
            playersCopy[index].roundPoints += 5
            playersCopy[index].totalPoints += 5
            this.socket.emit('resending voted data', {
                players: playersCopy,
                room: this.state.code
            })
        }
        
        console.log('state setting fired')
        
        

    })
    this.socket.on('ready to go', data => {
        if(this.state.host){
            let playersCopy = [...this.state.players]
            const index = playersCopy.findIndex(
                el => el.name === data.name
            )
            playersCopy[index].readyForNextRound = true
            this.socket.emit('resending ready for next round data', {
                players: playersCopy,
                room: this.state.code
            })
        }
    })
    this.socket.on('get updated ready data', data => {
        this.setState({
            players: data.players
        })
        let playersWhoAreReady = this.state.players.filter(el => el.readyForNextRound)
        let nextRound = this.state.round ++;
        if(data.players.length === playersWhoAreReady.length){
            this.setState({
                round: nextRound,
                showRoundResults: false,
                showQuestion: true
            })
        }
        
    })
    
    this.socket.on('getting voted data', data => {
        console.log(data)
        this.setState({
            players: data.players
        })
        let playersWhoVoted = this.state.players.filter(el => el.didVote);
        console.log(playersWhoVoted)
        if (this.state.players.length === playersWhoVoted.length) {
            this.setState({
              showVote: false
            });
            if(this.state.round !== this.state.numberOfRounds){
                this.setState({
                    showRoundResults: true
                })
            } else {
                this.setState({
                    showFinalResults: true
                })
            }
          }
    })
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
        players: this.state.players
      });
    } else {
      console.log("the players array was empty fool");
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
    if (prevState.players !== this.state.players) {
      let playersAnswers = this.state.players.filter(el => el.answer);
      if (this.state.players.length === playersAnswers.length) {
        this.setState({
          showQuestion: false,
          showVote: true
        });
      }
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

  vote = (name) => {
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
      isReady: true
    });
    this.socket.emit("ready for next round", {
        name: this.state.name,
        room: this.state.code
    })
  };

  submit = () => {
    this.setState({
      answeredQuestion: true
    });

    console.log("sent answer", this.state.answer)

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
    let currentRound = this.state.round;
    let nextRound = currentRound++;
    this.setState({
      showRoundResults: false,
      showQuestion: true,
      round: nextRound
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
    } else if (this.state.showFinalResults) {
      component = (
        <FinalResults
          
          isReady={this.state.isReady}
          clickedReadyFN={this.clickedReady}
          players={this.state.players}

        />
      );
    }
    return <div className="room">{component}</div>;
  }
}
