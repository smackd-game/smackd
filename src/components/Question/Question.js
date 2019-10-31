import React, {Component} from 'react'
import './_question.scss'

class Question extends Component {
    constructor() {
        super()
        this.state = {
            answeredQuestion: false
        }
    }

    submit = () => {
        this.setState({
            answeredQuestion: true
        })
        console.log(this.state)
    }

    render() {
        const players = this.props.players.map(el => <p>{el}</p>);
        return (
            <div className="question-container">
               
                {!this.state.answeredQuestion ? (
                <>
                    <header className="question"><h3>{this.props.question}</h3></header>
                    <textarea
                    onChange={e => this.props.handleChangeFn(e.target.value)}
                    type="text"
                    className="answer"
                    />
                    <button className='landing-button' onClick={() => this.submit()}>
                    submit
                    </button>
                </>
                ) : (
                <>
                    <header className="question"><h3>{this.props.question}</h3></header>
                    
                    
                    <p>Still waiting on:</p>
                    {players}
                    <p>Give them a dirty look until they answer the question</p>
                    <p>Also we can put like a spinning wheel animation or something here</p>
                </>
                )}
            
            </div>
        )
    }
}

export default Question