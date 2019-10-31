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
      showFinalResults: false,
      round: 1,
      showQuestion: true,
      showRoundResults: false,
      showVote: false,
      gameQuestion: "When will the world end?",
      answer: '',
      thoseWhoHaventAnswered: [],
      thoseWhoHaventVoted: [],
      answers: [],
      players: []
     

    };
    this.socket = io.connect();
  }

  // componentDidMount = async () => {
  //   const user = await axios.get('/user')
  //   this.setState({
  //     players:
  //   })
  // }

  handleAnswerChange = value => {
    this.setState({
      answer: value
    });
  };

  moveToVoting = () => {
      this.setState({
          showVote: true, showQuestion: false
        })
  }

  leaveGame = () => {
    this.props.history.push(`/`);

  }

  moveToResults = () => {
      //We will need an if statement here that checks if it is the last round or not
      //if it is not the last round then we will fire
      this.setState({
          showQuestion: false,
          showRoundResults: true
      })
      //if it is the last round, then we will fire this
      this.setState({
        showQuestion: false,
        showFinalResults: true
    })
  }

  startTheRoundOverAgain = () => {
      this.setState({
          showRoundResults: false,
          showQuestion: true
      })
  }

  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
      let component;
    if (this.state.showFinalResults) {
      component = <FinalResults />;
    } else if (this.state.showQuestion) {
      component = <Question 
                    question={this.state.gameQuestion}
                    handleChangeFn={this.handleAnswerChange}
                    answer={this.state.answer}
                    players={this.state.players}

      />;
    } else if (this.state.showVote) {
      component = <Vote 
                    question={this.state.gameQuestion}

      />;
    } else if (this.state.showRoundResults) {
      component = <RoundResults 
                    round={this.state.round}
      />;
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
