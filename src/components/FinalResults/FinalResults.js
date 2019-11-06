import React, {Component} from "react";
import "./_finalResults.scss";
import axios from "axios";
import {withRouter} from 'react-router-dom'

class FinalResults extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleQuit() {
    axios.delete(`/api/games/${this.props.code}`).then(() => {
      axios.delete("/user/").then(() => {
        this.props.history.push("/");
      });
    });
  }

  render() {
    let players = this.props.players;
    let sortedPlayers = players.sort(function(a, b) {
      if (a.totalPoints > b.totalPoints) {
        return -1;
      } else {
        return 1;
      }
    });
    let winnerName = sortedPlayers[0].name;
    let winnerPoints = sortedPlayers[0].totalPoints;

    let losers = sortedPlayers.filter(el => el.name !== winnerName);
    let theLosers = losers.map(el => {
      return <p>{el.name}</p>;
    });

    return (
      <div className="final-results-container">
        <h2>Final Results</h2>
        <h3>
          Winner: {winnerName} {winnerPoints}
        </h3>
        <h4>Losers:</h4>
        
        <ul>
          <li>{theLosers}</li>
        </ul>
        <button
          onClick={() => this.handleQuit()}
          className="landing-button end"
        >
          Leave
        </button>
      </div>
    );
  }
}

export default withRouter(FinalResults);
