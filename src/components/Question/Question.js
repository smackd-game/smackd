import React, {Component} from 'react'

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
        return (
            <div className="question-container">
               
                {!this.state.answeredQuestion ? (
                <>
                    <header className="question"><p>{this.props.question}</p></header>
                    <textarea
                    onChange={e => this.props.handleChangeFn(e.target.value)}
                    type="text"
                    className="answer"
                    />
                    <button onClick={() => this.submit()} className="submit">
                    submit
                    </button>
                </>
                ) : (
                <>
                    <header className="question"><p>{this.props.question}</p></header>
                    <hr/>
                    <p>Still waiting on ... players "we can map the players who haven't answerered yet here</p>
                    <p>Give these players a dirty look until they answer</p>
                    <p>Also we can put like a spinning wheel animation or something here</p>
                </>
                )}
            
            </div>
        )
    }
}

export default Question