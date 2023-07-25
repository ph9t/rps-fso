const choices = ['Rock', 'Paper', 'Scissors']

function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * 3)
  return choices[randomChoice]
}
