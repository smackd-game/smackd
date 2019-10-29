import React, {Component} from 'react'

class Host extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    handleChange(value) {
        this.setState({
            name: value
        })
    }

    render() {
        return (
            <div className="host-container">
                <header className="title">Get Started</header>
                <input onChange={e => this.handleChange(e.target.value)} type="text" className="name"/>
            </div>
        )
    }
}

export default Host