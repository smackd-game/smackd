import React, {Component} from 'react'

class RoundResults extends Component {
    constructor() {
        super()
        this.state = {
            isReady: false
        }
    }
    clickedReady = () => {
        this.setState({
            isReady: true
        })
        console.log(this.state)
    }

    render() {
        return (
            <div className="round-results-container">

            {!this.state.isReady ? (
                <>
                    <h2>Round {this.props.round} Results</h2>
                <p>We will map the list of players with their round points and total points</p>
                <button onClick={() => this.clickedReady()} >Ready for next round?</button>
                </>
                ) : (
                <>
                    <h2>Round {this.props.round} Results</h2>
                <p>We will map the list of players with their round points and total points</p>
                </>
                )}
                
            </div>
        )
    }
}

export default RoundResults