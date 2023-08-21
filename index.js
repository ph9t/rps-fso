const CHOICES = ['Rock', 'Paper', 'Scissors']

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

  while (userScore < 5 && computerScore < 5) {
    const userSelection = window.prompt(
      'Enter your choice (rock, paper, scissor): '
    )
    const computerSelection = getComputerChoice()

    const [userWon, message] = singleRound(userSelection, computerSelection)

    if (userWon === 1) {
      userScore++
    } else if (userWon === 0) {
      computerScore++
    }

    console.log(message, `[${userScore} - ${computerScore}]`)
  }

  if (userScore > computerScore) {
    console.log(`You Win the game for a score of ${userScore} `)
  } else if (userScore < computerScore) {
    console.log(`You Lose the game for a score of ${userScore}`)
  } else {
    console.log('Player and Computer have a score tie!')
  }
}

game()
