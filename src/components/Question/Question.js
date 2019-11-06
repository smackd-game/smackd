import React, {Component} from 'react'
import './_question.scss'

class Question extends Component {
    constructor() {
        super()
        this.state = {
            answeredQuestion: false
        }
    }

    render() {
        // const players = this.props.players.map(el => <p>{el}</p>);
        let haventAnswered = this.props.playersArr.filter(el => !el.answer)
        let arr = haventAnswered.map(el => {
            return <p>{el.name}</p>
        })
        return (
            <div className="question-container">
               
                {!this.props.answeredQuestion ? (
                <>
                    <header className="question"><h3>{this.props.question}</h3></header>
                    <textarea
                    onChange={e => this.props.handleChangeFn(e.target.value)}
                    type="text"
                    className="answer"
                    />
                    <button className='landing-button' onClick={() => this.props.submitFN()}>
                    submit
                    </button>
                </>
                ) : (
                <>
                    <header className="question"><h3>{this.props.question}</h3></header>
                    
                    
                    <p>Still waiting on:</p>
                    {arr}
                    <p>Give them a dirty look until they answer the question</p>
                </>
                )}
            
            </div>
        )
    }
}

export default Question