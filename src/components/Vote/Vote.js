import React, {Component} from "react";
import "./_vote.scss";

class Vote extends Component {
  constructor() {
    super();
    this.state = {
      // hasVoted: ''
    };
  }

  render() {
      let players = this.props.players
      
      let answers = this.props.players.map(el => {
          return <p onClick={() => this.props.voteFN(el.name)}>{el.answer}</p>
        });
      let arr = players.filter(el => !el.didVote)
      let haventVoted = arr.map(el => {
        return <p className='actual-answer' >{el.name}</p>
      })

    return (
      <div className="vote-container">
        {!this.props.hasVoted ? (
          <>
            <header className="vote">
              <h3>{this.props.question}</h3>
            </header>

            <div className="answer">
              {answers}
            </div>
          </>
        ) : (
          <>
            <header className="vote">
              <h3>{this.props.question}</h3>
            </header>

            <p>Still waiting on:</p>
            {haventVoted}
            <p>Give these players a dirty look until they vote</p>
            
          </>
        )}
      </div>
    );
  }
}

export default Vote;
