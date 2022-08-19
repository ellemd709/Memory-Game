let greet = "Hello Everyone";
console.log(greet);

const card_fronts = {
    "card 1": "./images/loveall.png",
    "card 2": "./images/loveallheart.png",
    "card 3": "./images/loveboy.png",
    "card 4": "./images/lovegirl.png",
    "card 5": "./images/lovemusic.png",
    "card 6": "./images/loverainbow.png",
};

const selectors = {
    boardContainer: document.querySelector(".board-container"),
    board: document.querySelector(".board"),
    moves: document.querySelector(".moves"),
    timer: document.querySelector(".timer"),
    start: document.querySelector("button"),
    win: document.querySelector(".win"),
    cards: document.querySelectorAll(".card"),
};

const state = {
    gameStarted: false,
    flippedCards: 0,
    picks: null,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
};


      //shuffle cards 

        const shuffle = (array) => {
        const clonedArray = [...array];
    
        for (let index = clonedArray.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            const original = clonedArray[index];
    
            clonedArray[index] = clonedArray[randomIndex];
            clonedArray[randomIndex] = original;
        }
    
        return clonedArray;
    };
    
    
    const pickRandom = (array, items) => {
        const clonedArray = [...array];
        const randomPicks = [];
    
        for (let index = 0; index < items; index++) {
            const randomIndex = Math.floor(Math.random() * clonedArray.length);
    
            randomPicks.push(clonedArray[randomIndex]);
            clonedArray.splice(randomIndex, 1);
        }
    
        return randomPicks;
    };
    
    // starts game and keeps stats
    const startGame = () => {
        state.gameStarted = true;
        selectors.start.classList.add("disabled");
    
        state.loop = setInterval(() => {
            state.totalTime++;
    
            selectors.moves.innerText = `${state.totalFlips} moves`;
            selectors.timer.innerText = `time: ${state.totalTime} sec`;
        }, 1000);
    };
    
    // onclick event for button to start game
    selectors.start.onclick = startGame;
    
    // resets cards if a pair doesn't match
    const flipBackCards = () => {
        document.querySelectorAll(".card:not(.matched)").forEach((card) => {
            card.classList.remove("flipped");
        });
    
        state.flippedCards = 0;
    };
    
    // generate board
    
    function generateGame() {
        const card = ["card 1", "card 2", "card 3", "card 4", "card 5", "card 6"];
        state.picks = pickRandom(card, 6);
        const items = shuffle([...state.picks, ...state.picks]);
        for (var i = 0; i < items.length; i++) {
            selectors.cards[i].innerHTML = `
        <div class="card-front"></div>
                            <div class="card-back" style="background-image: url('${card_fronts[items[i]]
                }')">${items[i]}
                        </div>`;
                        selectors.cards[i].class
        }
    }
    
    function flipCard(card) {
        state.flippedCards++;
        state.totalFlips++;
    
        if (!state.gameStarted) {
            startGame();
        }
    
        if (state.flippedCards <= 2) {
            card.classList.add("flipped");
        }
    
        if (state.flippedCards === 2) {
            const flippedCards = document.querySelectorAll(".flipped:not(.matched)");
    
            if (flippedCards[0].innerText === flippedCards[1].innerText) {
                flippedCards[0].classList.add("matched");
                flippedCards[1].classList.add("matched");
            }
    
            setTimeout(() => {
                flipBackCards();
            }, 1000);
        }
    
        if (!document.querySelectorAll(".card:not(.flipped)").length) {
            setTimeout(() => {
                selectors.boardContainer.classList.add("flipped");
                selectors.win.innerHTML = `
                    <span class="win-text">
                        You won!<br />
                        with <span class="highlight">${state.totalFlips}</span> moves<br />
                        under <span class="highlight">${state.totalTime}</span> seconds
                        <button class="replay">Play again</button>
                    </span>
                `;
                clearInterval(state.loop);
            }, 1000);
        }
    }
    
    const attachEventListeners = () => {
        document.addEventListener("click", (event) => {
            const eventTarget = event.target;
            const eventParent = eventTarget.parentElement;
    
            if (
                eventTarget.className.includes("card") &&
                !eventParent.className.includes("flipped")
            ) {
                flipCard(eventParent);
            } else if (
                eventTarget.nodeName === "BUTTON" &&
                !eventTarget.className.includes("disabled")
            ) {
                startGame();
            }
    
            if (eventTarget.className.includes("replay")) {
                selectors.boardContainer.classList.remove("flipped");
                document.querySelectorAll(".card").forEach((card) => {
                    card.classList.remove("flipped", "matched");
                });
                replayGame();
            }
        });
    };

    // a replay function to play again
    
    const replayGame = () => {
        state.gameStarted = false;
        state.flippedCards = 0;
        state.totalFlips = 0;
        state.totalTime = 0;
        clearInterval(state.loop);
        state.loop = null;
        state.picks = null;
        generateGame();
        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `time: ${state.totalTime} sec`;
        selectors.start.classList.remove("disabled");
    };
    
    generateGame();
    attachEventListeners();