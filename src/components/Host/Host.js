import React, {Component} from 'react'

class Host extends Component {
    constructor() {
        super()
        this.state = {
            placeholder: ''
        }
    }

    render() {
        return (
            <div className="host-container">
                Host
            </div>
        )
    }
}

export default Host