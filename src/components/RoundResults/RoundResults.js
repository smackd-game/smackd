import React, {Component} from 'react'
import './_roundResults.scss'

class RoundResults extends Component {

    render() {
        let players = this.props.players
        let arr = players.filter(el => !el.readyForNextRound)
        let arentReady = arr.map((el, i) => {
            return <p className='round-results-arent-ready' key={i}>{el.name}</p>
        })
        let playersResults = players.map((el, i) => {
            return <p className='round-results-players' key={i}>{el.name} | {el.roundPoints === null ? 0 : el.roundPoints} | {el.totalPoints === null ? 0 : el.totalPoints}</p>
        })
        return (
            <div className="round-results-container">

            {!this.props.isReady ? (
                <>
                <h2 className='round-title'>Round {this.props.round} Results</h2>
                <div className="players-results">
                <h4>Name | Round Points | Total Points</h4>

                {playersResults}

                </div>
                <button className='landing-button' onClick={() => this.props.clickedReadyFN()} >Next Round</button>
                </>
                ) : (
                <>
                <h2>Round {this.props.round} Results</h2>
                <p>Still waiting on</p>
                
                {arentReady}
                <p>We're still waiting on a few players to click the Ready button. Once they've clicked it, we'll move to the next round, tell them to hurry and do it.</p>
                </>
                )}
                
            </div>
        )
    }
}

export default RoundResults