import React, {Component} from 'react'

class Question extends Component {
    constructor() {
        super()
        this.state = {
            placeholder: ''
        }
    }

    render() {
        return (
            <div className="question-container">
                Question
            </div>
        )
    }
}

export default Question