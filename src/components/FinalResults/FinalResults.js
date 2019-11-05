import React, {Component} from 'react'
import './_finalResults.scss'

class FinalResults extends Component {
    constructor() {
        super()
        this.state = {
            placeholder: ''
        }
    }

    render() {
        // let players = this.props.players
        // console.log(players)
        // players.sort(function(a,b){
        //     if(a.totalPoints > b.totalPoints){
        //         return 1
        //     } else {
        //         return -1
        //     }
        // })
        // let winner = players[0].name

        // let losers = players.filter(el => el.name !== winner)
        // losers.map(el => {
        //     return <p>{el.name}</p>
        // })

        return (
            <div className="final-results-container">
                <h2>Final Results</h2>
                {/* <h3>Winner: {winner} {players[0].totalPoints}</h3> */}
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