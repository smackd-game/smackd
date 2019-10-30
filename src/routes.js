import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Landing from './components/Landing/Landing'
import Room from './Room'
import GameParent from './GameParent'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/lobby/:code' component={Room} />
        <Route path='/game/:code' component={GameParent} />
    </Switch>
)

