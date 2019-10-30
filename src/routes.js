import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Landing from './components/Landing/Landing'
import Room from './Room'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path = '/Lobby/:code' component = {Room}/>

    </Switch>
)

