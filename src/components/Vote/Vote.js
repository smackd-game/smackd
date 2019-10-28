import React, {Component} from 'react'

class Vote extends Component {
    constructor() {
        super()
        this.state = {
            placeholder: ''
        }
    }

    render() {
        return (
            <div className="vote-container">
                Vote
            </div>
        )
    }
}

export default Vote