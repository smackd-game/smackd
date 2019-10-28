import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Landing from './components/Landing/Landing'
import RoundResults from './components/RoundResults/RoundResults'
import FinalResults from './components/FinalResults/FinalResults'
import Host from './components/Host/Host'
import Join from './components/Join/Join'
import Question from './components/Question/Question'
import Vote from './components/Vote/Vote'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='host' component={Host} />
        <Route path='/join' component={Join} />
        <Route path='/question' component={Question} />
        <Route path='/vote' component={Vote} />
        <Route path='/round-results' component={RoundResults} />
        <Route path='/final-results' component={FinalResults} />
    </Switch>
)

