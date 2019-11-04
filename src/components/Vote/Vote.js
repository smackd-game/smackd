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
      // const players = this.props.players.map(el => <p>{el}</p>);
      // const answers = this.props.answers.map(el => <p>{el}</p>);
      const answers = this.props.players.map(el => {
          // return {answer: el.answer, name: el.name};
          return <p onClick={() => this.props.voteFN(el.name)}>{el.answer}</p>
        });
        console.log(answers)

    return (
      <div className="vote-container">
        {!this.props.hasVoted ? (
          <>
            <header className="vote">
              <h3>{this.props.question}</h3>
            </header>

            <div className="answer">
              <p>An answer will go here</p>
              {answers}
            </div>
          </>
        ) : (
          <>
            <header className="vote">
              <h3>{this.props.question}</h3>
            </header>

            <p>Still waiting on:</p>
            <p>Give these players a dirty look until they vote</p>
            <p>
              Also we can put like a spinning wheel animation or something here
            </p>
          </>
        )}
      </div>
    );
  }
}

export default Vote;
