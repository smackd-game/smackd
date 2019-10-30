import React, {Component} from 'react'
import Host from '../Host/Host'
import Join from '../Join/Join'
import {Link} from 'react-router-dom'

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            placeholder: '',
            host: false,
            join: false,
            back: false,
            code: ''

        }
        console.log(this.state)
    }

    componentDidMount = () => {
            const code = `${Math.floor(Math.random() * 10)}${Math.floor(
              Math.random() * 10
            )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
            this.setState({
              code: code
            });
    }

    handleHost = () => {
        this.setState({
            host : true,
            join : false,
            back : true
        })
        // const code = `${Math.floor(Math.random() * 10)}${Math.floor(
        //     Math.random() * 10
        //   )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
        //   this.setState({
        //     code: code
        //   });
        
    }

    handleJoin = () => {
        this.setState({
            host : false,
            join : true,
            back : true
        })
    }

    handleBack = () => {
        this.setState({
            join : false,
            host : false,
            back : false,
        })
    }

    render() {
        let component
        if(this.state.host){
            component = <Host code = {this.state.code} />
        }else if(this.state.join){
            component = <Join/>
        }
        console.log(this.state)
        return (
            <div className="landing-container">
                {!this.state.back 
                ?
                (
                <div>
                <button onClick = {this.handleJoin}>Join</button>
                <button onClick = {this.handleHost}>Host</button>
                </div>
            
                )
                :
                (
                
                <div>
                   
                <button onClick = {this.handleBack}>Back</button>
                  
                </div>)
                }
                {component}

            </div>
        )
    }
}

export default Landing