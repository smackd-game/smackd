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
        return (
            <div className="final-results-container">
                <h2>Final Results</h2>
                <h3>Winner: winner goes here</h3>
                <h4>Losers:</h4>
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