let greet = "Hello Everyone";
console.log(greet);

const card_fronts = {
    "card 1": "./images/loveall.png",
    "card 2": "./images/loveallheart.png",
    "card 3": "./images/loveboy.png",
    "card 4": "./images/lovegirl.png",
    "card 5": "./images/lovemusic.png",
    "card 6": "./images/loverainbow.png",
    "card 7": "./images/loveall.png",
    "card 8": "./images/loveallheart.png",
    "card 9": "./images/loverainbow.png",
    "card 10":"./images/lovemusic.png",
    "card 11":"./images/loveboy.png",
    "card 12":"./images/lovegirl.png"
}

const selectors = {
    boardContainer: document.querySelector('.table-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win'),
    cards: document.querySelectorAll('.card')
}

function showBack(card) {
    card.querySelector('img').src = './images/purplesquare.png'
}

function showFront(card) {
    card.querySelector('img').src = card_fronts[card.querySelector('img').id]
}

for (var i = 0; i < selectors.cards.length; i++) {
    showBack(selectors.cards[i]);
}

console.log(selectors)
const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}
const startGame = () => {
    console.log("starting game")
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}

selectors.start.onclick = startGame


for (var i = 0; i < selectors.cards.length; i++) {
    selectors.cards[i].addEventListener('click', function() {
      console.clear();
      console.log("You clicked:", this.innerHTML);
      showFront(this)
    })
}

//flipping

function flipCard() {
    var CardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray0[cardId].name)
    cardsChosenId.push(CardId)
    this.setAttribute('src', cardArray[CardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}



//check for matches

function checkForMatch() {
    var card = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId [1]
    if (cardsChosen[0] === cardsChosen [1]) {
        alert(`You found a Match`)
        cards[optionOneId].setAttribute('src')
    }
}