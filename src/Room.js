import Host from './components/Host/Host'
import Join from './components/Join/Join'
import Vote from './components/Vote/Vote'
import Question from './components/Question/Question'
import React, {Component} from 'react'
import io from 'socket.io-client'
import Landing from './components/Landing/Landing';
import RoundResults from './components/RoundResults/RoundResults'
import FinalResults from './components/FinalResults/FinalResults'


class Room extends Component {
    constructor(props){
        super(props)
        this.state ={
            landing: false,
            finalResults: false,
            host: false,
            join: false,
            question: false,
            roundResults: false,
            vote: false
        }
        this.socket = io.connect()

    }

    handleChange = (key) => {
        this.setState({
            [key]: !this.state[key]
            
        }, () => {
        })
        
    }




    render(){

       if (this.state.host){
            return <Host />
        } else if (this.state.join){
            return <Join/>
        } else if (this.state.question){
            return <Question/>  
        } else if (this.state.vote){
            return <Vote/>
        } else if (this.state.roundResults){
            return <RoundResults/>
        } else if (this.state.finalResults){
            return <FinalResults/>
        } else{
            return <Landing/>
        }

       
       
    }

}

export default Room