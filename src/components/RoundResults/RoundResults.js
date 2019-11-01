import React, {Component} from 'react'
import './_roundResults.scss'

class RoundResults extends Component {
    constructor() {
        super()
        this.state = {
           
        }
    }
    

    render() {
        return (
            <div className="round-results-container">

            {!this.props.isReady ? (
                <>
                    <h2>Round {this.props.round} Results</h2>
                <p>We will map the list of players with their round points and total points</p>
                <button className='landing-button' onClick={() => this.props.clickedReadyFN()} >Ready for next round?</button>
                </>
                ) : (
                <>
                    <h2>Round {this.props.round} Results</h2>
                <p>We will map the list of players with their round points and total points</p>
                <p>Waiting on other players to tap "Ready"</p>
                </>
                )}
                
            </div>
        )
    }
}

export default RoundResults