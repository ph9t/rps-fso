const CHOICES = ['rock', 'paper', 'scissors']

function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * 3)
  return CHOICES[randomChoice]
}

function playSingleRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase().trim()
  computerSelection = computerSelection.toLowerCase().trim()

  const beatsWho = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  }

  if (playerSelection === computerSelection) {
    return [-1, "It's a tie!"]
  } else if (beatsWho[playerSelection] === computerSelection) {
    return [1, `You Win! ${playerSelection} beats ${computerSelection}`]
  } else {
    return [0, `You Lose! ${computerSelection} beats ${playerSelection}`]
  }
}

function game() {
  let userScore = 0
  let computerScore = 0

  const rpsEmoji = {
    rock: '🪨',
    paper: '📃',
    scissors: '✂️',
  }

  while (userScore < 5 && computerScore < 5) {
    const userSelection = window.prompt(
      'Enter your choice (rock, paper, scissors): '
    )
    const opponentSelection = getComputerChoice()

    const [userWon, message] = playSingleRound(userSelection, opponentSelection)

    if (userWon === 1) userScore++
    else if (userWon === 0) computerScore++

    console.log('---')
    console.log(
      `${rpsEmoji[userSelection]} versus ${rpsEmoji[opponentSelection]}`
    )
    console.log(message, `[${userScore} - ${computerScore}]`)
  }

  if (userScore > computerScore) {
    console.log(`You Win the game with a score of ${userScore} `)
  } else if (userScore < computerScore) {
    console.log(`You Lose the game with a score of ${userScore}`)
  } else {
    console.log('Player and Computer have a score tie!')
  }
}

let currentlySelected = document.querySelector('#shape-menu button')
currentlySelected.textContent = '▶ ' + currentlySelected.textContent

function changeSelected(newSelectedOption) {
  currentlySelected.textContent = currentlySelected.textContent.split(' ')[1]
  currentlySelected = newSelectedOption
  currentlySelected.textContent = '▶ ' + currentlySelected.textContent
}
