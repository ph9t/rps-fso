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
