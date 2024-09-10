const grid = document.getElementById('grid');
const symbols = ['🍎', '🍌', '🍇', '🍒', '🍎', '🍌', '🍇', '🍒', '🍓', '🍑', '🍓', '🍑', '🥝', '🍉', '🥝', '🍉'];
let firstCard = null;
let secondCard = null;
let matchedCount = 0;
const totalPairs = symbols.length / 2;
let startTime;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkMatch() {
    if (firstCard.textContent === secondCard.textContent) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCount++;
        if (matchedCount === totalPairs) {
            const endTime = new Date();
            const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Time in seconds
            setTimeout(() => alert(`You found all matches! Time taken: ${timeTaken} seconds`), 100);
        }
        firstCard = null;
        secondCard = null;
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

function handleCardClick(card) {
    if (card.textContent === '' && secondCard === null) {
        card.textContent = card.dataset.symbol;
        card.classList.add('flipped');
        
        if (firstCard === null) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch();
        }
    }
}

function createBoard() {
    shuffle(symbols);
    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', () => handleCardClick(card));
        grid.appendChild(card);
    });
    startTime = new Date(); // Record the start time when the board is created
}

createBoard();
