import React, {Component} from 'react'
import './_roundResults.scss'

class RoundResults extends Component {
    constructor() {
        super()
        this.state = {
           
        }
    }
    

    render() {
        console.log(this.props.players)
        let players = this.props.players
        let arr = players.filter(el => !el.readyForNextRound)
        let arentReady = arr.map(el => {
            return <p>{el.name}</p>
        })
        let playersResults = players.map(el => {
            return <p>{el.name} Round Points: {el.roundPoints} Total Points: {el.totalPoints}</p>
        })
        return (
            <div className="round-results-container">

            {!this.props.isReady ? (
                <>
                <h2>Round {this.props.round} Results</h2>
                {playersResults}
                <button className='landing-button' onClick={() => this.props.clickedReadyFN()} >Ready for next round?</button>
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