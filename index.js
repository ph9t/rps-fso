const choices = ['Rock', 'Paper', 'Scissors']

function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * 3)
  return choices[randomChoice]
}

function singleRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase()
  computerSelection = computerSelection.toLowerCase()

  if (playerSelection === computerSelection) {
    return [-1, "It's a tie!"]
  } else if (playerSelection === 'rock' && computerSelection === 'scissor') {
    return [1, 'You Win! Rock beats Scissors!']
  } else if (playerSelection === 'rock' && computerSelection === 'paper') {
    return [0, 'You Lose! Paper beats Rock!']
  } else if (playerSelection === 'paper' && computerSelection === 'rock') {
    return [1, 'You Win! Paper beats Rock!']
  } else if (playerSelection === 'paper' && computerSelection === 'scissor') {
    return [0, 'You Lose! Scissors beats Paper!']
  } else if (playerSelection === 'scissor' && computerSelection === 'paper') {
    return [1, 'You Win! Scissors beats Paper!']
  } else if (playerSelection === 'scissor' && computerSelection === 'rock') {
    return [0, 'You Lose! Rock beats Scissors!']
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
