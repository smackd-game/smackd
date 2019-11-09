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
        let haventAnswered = this.props.playersArr.filter(el => !el.answer)
        let arr = haventAnswered.map((el, i) => {
            return <p key={i}>{el.name}</p>
        })
        return (
            <div className="question-container">
               
                {!this.props.answeredQuestion ? (
                <>
                    <header className="question"><h3>{this.props.question}</h3></header>
                    <textarea
                    placeholder='Enter your answer'
                    onChange={e => this.props.handleChangeFn(e.target.value)}
                    type="text"
                    className="answer"
                    />
                    <button className='button submit-answer' onClick={() => this.props.submitFN()}>
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