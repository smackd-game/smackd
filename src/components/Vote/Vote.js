import React, {Component} from 'react'

class Vote extends Component {
    constructor() {
        super()
        this.state = {
            hasVoted: ''
        }
    }
    vote = () => {
        this.setState({
            hasVoted: true
        })
        console.log(this.state)
    }

    render() {
        return (
            <div className="vote-container">
               
                {!this.state.hasVoted ? (
                <>
                    <header className="vote"><p>{this.props.question}</p></header>
                    
                    <p onClick={() => this.vote()} >We will map out the answers here</p>
                </>
                ) : (
                <>
                    <header className="vote"><p>{this.props.question}</p></header>
                    <hr/>
                    <p>Still waiting on ... players "we can map the players who haven't voted yet here</p>
                    <p>Give these players a dirty look until they answer</p>
                    <p>Also we can put like a spinning wheel animation or something here</p>
                </>
                )}
            
            </div>
        )
    }
}

export default Vote