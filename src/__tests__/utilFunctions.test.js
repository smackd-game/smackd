import {sortingFunction} from '../utils/functions'
import {losers} from '../utils/functions'
import {haventAnswered} from '../utils/functions'
import {forLoop} from '../utils/functions'
import {mappedAnswer} from '../utils/functions'

import {players} from './__data__/players'
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types'

//Tate
it('sort the players by points', () => {
    expect(sortingFunction(sortedPlayers[0].name)).toBe('Brian')
})
//Tate
it('sort the players and exclude winner', () => {
    expect(losers(theLosers[0].name)).toBe('Tate')
    expect(losers(theLosers[1].name)).toBe('Mark')
})
//Tate
it('show who hasnt answered', () => {
    expect(haventAnswered(arr[0].name)).toBe('Mark')
})
//Tate
it('show who hasnt answered yet', () => {
    expect(forLoop(arr[0].name)).toBe('Mark')
})
//Tate
it('clear player object keys', () => {
    expect(mapped(playersArr[0].didVote)).toBe(false)
})




