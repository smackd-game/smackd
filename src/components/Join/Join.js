import React, {Component} from 'react'

class Join extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            submittedName: false,
            code: null
        }
    }

    handleChange(value) {
        this.setState({
            name: value
        })
    }

    handleCode(value) {
        this.setState({
            code: value
        })
        console.log(this.state)
    }

    submit=()=>{
        this.setState({
            submittedName: true
        })
    } 

    render() {
        return (
          <div className="join-container">
            {!this.state.submittedName ? (
              <>
                <header className="title">Get Started</header>
                <input
                  onChange={e => this.handleChange(e.target.value)}
                  type="text"
                  className="name"
                  placeholder= "Create Username"
                />
                <button onClick={() => this.submit()} className="submit">
                  submit
                </button>
              </>
            ) : (
              <>
              <input 
              onChange={e => this.handleCode(e.target.value)}
              placeholder= "Enter Game Code" 
              type= "text"
              className = "code"
              />
              <button>
                  Join Game
              </button>
              </>
            )}
          </div>
        );
      }
    }
    
    export default Join;
    