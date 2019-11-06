import {players} from "../__tests__/__data__/players";
import {test} from "../__tests__/__data__/test";

//Tate
export const sortingFunction = players => {
  let sortedPlayers = players.sort(function(a, b) {
    if (a.totalPoints > b.totalPoints) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log(sortedPlayers);
};
//Tate
export const losers = players => {
  let winnerName = "Brian";
  let theLosers = players.filter(el => el.name !== winnerName);
  theLosers.map(el => {
    return el.name;
  });
  console.log(theLosers);
};
//Tate
export const haventAnswered = players => {
  let haventAnswered = players.filter(el => !el.answer);
  let arr = haventAnswered.map(el => {
    return el.name;
  });
  console.log(arr);
};
//Tate
export const forLoop = players => {
  playersArr = [...players];

  for (let i = 0; i < playersArr.length; i++) {
    playersArr[i].answer = "";
    playersArr[i].readyForNextRound = false;
    playersArr[i].roundPoints = 0;
    playersArr[i].didVote = false;
  }
  console.log(playersArr);
};
//Tate
export const mappedAnswer = players => {
  let answers = players.map(el => {
    return el.answer;
  });
  console.log(answers);
};

//Brian
export const returnName = () => {
  if (players.code === test.code) {
    let updatedArr = [...players];
    const index = updatedArr.findIndex(el => {
      return el === test.name;
    });

    if (index !== -1) {
      updatedArr.splice(index, 1);
      return updatedArr;
    }
  }
};

//Brian
export const pushToArray = () => {
  if (test.host) {
    let answer = test.answer;
    let newPlayersArr = [...players];
    let index = newPlayersArr.findIndex(el => el.name === test.name);
    if (index === -1) {
      newPlayersArr.push(newPlayersArr);
    } else {
      newPlayersArr[index].answer = answer;
    }
  }
};

//Brian
export const newArrayData = () => {
  let newPlayers = [];
  if (players.code === test.code && test.host) {
    newPlayers = [
      ...players,
      {
        name: test.name,
        code: test.room,
        answer: test.answer,
        roundPoints: players.roundPoints,
        totalPoints: players.totalPoints
      }
    ];
  }
  return newPlayers;
};

//Brian
export const filterAnswers = () => {
  let playersAnswers = players.filter(el => el.answer);
  if (players.length === playersAnswers.length) {
    return playersAnswers;
  }
};

//Brian
export const newProps = () => {
  if (test.host) {
    const playersCopy = [...players];
    const index = playersCopy.findIndex(el => el.name === test.voteRecipient);
    const index1 = playersCopy.findIndex(el => el.name === test.name);
    playersCopy[index1].didVote = true;
    playersCopy[index].roundPoints += 5;
    playersCopy[index].totalPoints += 5;
    return playersCopy;
  }
};
