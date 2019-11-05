import React, {Component} from 'react'
import './_finalResults.scss'

class FinalResults extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        console.log(this.props)
        let players = this.props.players
        console.log(players)
        let sortedPlayers = players.sort(function(a,b){
            if(a.totalPoints > b.totalPoints){
                return -1
            } else {
                return 1
            }
        })
        let winnerName = sortedPlayers[0].name
        console.log(sortedPlayers)
        let winnerPoints = sortedPlayers[0].totalPoints
        console.log(winnerPoints)
        console.log(winnerName)

        let losers = sortedPlayers.filter(el => el.name !== winnerName)
        losers.map(el => {
            return <p>{el.name}</p>
        })
        console.log(losers)

        return (
            <div className="final-results-container">
                <h2>Final Results</h2>
                <h3>Winner: {winnerName} {winnerPoints}</h3>
                <h4>Losers:</h4>
                {/* <p>{losers}</p> */}
                <ul>
                    <li>Loser 1 (We will map out the losers here)</li>
                </ul>
                <button className='landing-button' >Play Again/Continue</button>
                <button className='landing-button' >Leave</button>
            </div>
        )
    }
}

export default FinalResults