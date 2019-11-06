//Tate
export const sortingFunction = (players) => {
    let sortedPlayers = players.sort(function(a,b){
        if(a.totalPoints > b.totalPoints){
            return -1
        } else {
            return 1
        }
    })
    console.log(sortedPlayers)
}
//Tate
export const losers = (players) => {
let winnerName = 'Brian'
let theLosers = players.filter(el => el.name !== winnerName)
theLosers.map(el => {
    return el.name
})
console.log(theLosers)
}
//Tate
export const haventAnswered = (players) => {
    let haventAnswered = players.filter(el => !el.answer)
    let arr = haventAnswered.map(el => {
        return el.name
    })
    console.log(arr)
}
//Tate
export const forLoop = (players) => {
playersArr = [...players]
        
for(let i=0; i < playersArr.length; i++){
playersArr[i].answer = '';
playersArr[i].readyForNextRound = false;
playersArr[i].roundPoints = 0;
playersArr[i].didVote = false;  
}
console.log(playersArr)
}
//Tate
export const mappedAnswer = (players) => {
    let answers = players.map(el => {
        return el.answer
      });
    console.log(answers)
}

