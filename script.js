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

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }
}

const card = ['card 1', 'card 2', 'card 3','card 4','card 5','card 6','card 7','card 8','card 9','card 10','card 11','card 12']
    const picks = pickRandom(card, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `