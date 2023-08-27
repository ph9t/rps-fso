const CHOICES = ['rock', 'paper', 'scissors']
const equivalentEmoji = {
  rock: '🪨',
  paper: '📃',
  scissors: '✂️',
}

const controlStepVal = {
  KeyH: -1,
  KeyJ: 2,
  KeyK: -2,
  KeyL: 1,
}

let existingTimeout = null

controlStepVal['ArrowLeft'] = controlStepVal.KeyH
controlStepVal['ArrowRight'] = controlStepVal.KeyL
controlStepVal['ArrowDown'] = controlStepVal.KeyJ
controlStepVal['ArrowUp'] = controlStepVal.KeyK

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
    return [
      1,
      `You Win! [${equivalentEmoji[playerSelection]} beats ${equivalentEmoji[computerSelection]}]`,
    ]
  } else {
    return [
      0,
      `You Lose! [${equivalentEmoji[computerSelection]} beats ${equivalentEmoji[playerSelection]}]`,
    ]
  }
}

function changeVisuallySelected(prevSelectedOption, newSelectedOption) {
  if (prevSelectedOption) {
    const optionText = document.getElementById('option-text')
    prevSelectedOption.innerHTML = optionText.textContent
  }

  newSelectedOption.innerHTML =
    '<span id="cursor">▶</span>' +
    `<span id="option-text">${newSelectedOption.textContent}</span>`

  return newSelectedOption
}

function getNextNthSibling(selectedOption, n) {
  const sign = n < 0 ? 'neg' : 'pos'
  n = Math.abs(n)

  while (n > 0) {
    const sibling =
      sign === 'neg'
        ? selectedOption.previousElementSibling
        : selectedOption.nextElementSibling

    if (!sibling) return selectedOption
    selectedOption = sibling
    n--
  }

  return selectedOption
}

function getScoreView(score) {
  return '★ '.repeat(score) + '☆ '.repeat(5 - score)
}

function displayMessage(
  textElement,
  textValue,
  duration = 5000,
  type = 'general'
) {
  if (type === 'round' && existingTimeout) clearTimeout(existingTimeout)
  textElement.textContent = textValue

  const timeoutId = setTimeout(() => {
    textElement.textContent = ''
  }, duration)

  // overwrite existing timeout
  if (type === 'round') existingTimeout = timeoutId
}

function toggleMenuDisable(nodeList, value) {
  for (let i = 0; i < nodeList.length - 1; i++) {
    nodeList[i].disabled = value
  }
}

function game() {
  let gameStarted = false
  let playerScore = 0
  let computerScore = 0

  let lastRoundMessage = ''
  let roundMessageRepeat = 0

  const playerPickDisplay = document.getElementById('player-pick')
  const computerPickDisplay = document.getElementById('computer-pick')

  const playerScoreDisplay = document.getElementById('player-score')
  const computerScoreDisplay = document.getElementById('computer-score')

  const generalMessageDisplay = document.getElementById('general-message')
  const roundMessageDisplay = document.getElementById('round-message')

  const mainItem = document.getElementById('main-item')

  let currentlySelected = mainItem
  const menuOptions = document.querySelectorAll('#shape-menu button')
  const menuOptionValue = {
    'rock-item': 'rock',
    'paper-item': 'paper',
    'scissors-item': 'scissors',
  }

  toggleMenuDisable(menuOptions, true)
  changeVisuallySelected(undefined, currentlySelected)
  displayMessage(generalMessageDisplay, "Select 'Start' to play game", 2000)

  function gameOver() {
    gameStarted = false
    toggleMenuDisable(menuOptions, true)

    playerPickDisplay.textContent = '�'
    computerPickDisplay.textContent = '�'

    /* playerScoreDisplay.textContent = getScoreView(0)
    computerScoreDisplay.textContent = getScoreView(0) */

    mainItem.textContent = 'Restart'

    if (currentlySelected !== mainItem) {
      // carry out if the game ended thru game playing (main item not selected)
      currentlySelected = changeVisuallySelected(currentlySelected, mainItem)
    } else {
      // carry out if the game ended by clicking 'Quit'
      changeVisuallySelected(undefined, mainItem)
    }

    let finalMessage

    if (playerScore < 5 && computerScore < 5) {
      finalMessage = 'What a sore quitter! ⁑ρ'
    } else {
      if (playerScore > computerScore) finalMessage = 'You Win ⚐ the game!'
      else finalMessage = 'You Lose ☠ the game!'
    }

    displayMessage(generalMessageDisplay, finalMessage)

    playerScore = 0
    computerScore = 0
  }

  function checkRound(e) {
    e.stopPropagation()

    // return immediately if the event comes not from a pressed 'Enter' key or a mouse click
    const notKeyboardTargeting = e.type === 'keydown' && e.code !== 'Enter'
    if (e.type !== 'click' && notKeyboardTargeting) return

    if (!gameStarted) {
      toggleMenuDisable(menuOptions, false)
      mainItem.textContent = 'Quit'
      changeVisuallySelected(undefined, mainItem)

      gameStarted = true
      return
    }

    const isQuitting =
      e.currentTarget.id === 'main-item' ||
      (currentlySelected.id === 'main-item' && e.code === 'Enter')

    if (gameStarted && isQuitting) {
      gameOver()
      return
    }

    const userSelection = menuOptionValue[currentlySelected.id]
    const opponentSelection = getComputerChoice()

    playerPickDisplay.textContent = equivalentEmoji[userSelection]
    computerPickDisplay.textContent = equivalentEmoji[opponentSelection]

    const [userWon, message] = playSingleRound(userSelection, opponentSelection)

    if (lastRoundMessage === message) roundMessageRepeat++
    else {
      roundMessageRepeat = 0
      lastRoundMessage = ''
    }

    lastRoundMessage = message

    const additionalMessage = roundMessageRepeat
      ? ' (x' + (roundMessageRepeat + 1) + ')'
      : ''

    displayMessage(
      roundMessageDisplay,
      `${message}${additionalMessage}`,
      2000,
      'round'
    )

    const soundToPlay = document.querySelector(`audio[data-key="${userWon}"]`)

    if (soundToPlay) {
      soundToPlay.currentTime = 0
      soundToPlay.play()
    }

    if (userWon === 1) playerScore++
    else if (userWon === 0) {
      computerScore++
      playerPickDisplay.classList.add('damaged')
    }

    playerScoreDisplay.textContent = getScoreView(playerScore)
    computerScoreDisplay.textContent = getScoreView(computerScore)

    if (playerScore === 5 || computerScore === 5) gameOver()
  }

  menuOptions.forEach(option => {
    option.addEventListener('mouseenter', e => {
      if (!gameStarted) return
      currentlySelected = changeVisuallySelected(currentlySelected, e.target)
    })

    option.addEventListener('click', checkRound, { capture: true })
  })

  window.addEventListener('keydown', checkRound)

  window.addEventListener('keydown', e => {
    if (!gameStarted) return

    const stepSize = controlStepVal[e.code]
    const nthSibling = getNextNthSibling(currentlySelected, stepSize)

    currentlySelected = changeVisuallySelected(currentlySelected, nthSibling)
  })

  playerPickDisplay.addEventListener('animationend', () => {
    playerPickDisplay.classList.remove('damaged')
  })
}

game()
