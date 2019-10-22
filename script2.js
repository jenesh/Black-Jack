const Deck = require('./modules/deck');
const User = require('./modules/user');
const Dealer = require('./modules/dealer');

let gameDeck = new Deck();
let user = new User();
let dealer = new Dealer();

const userCardContainer = document.querySelector('#user-cards');
const dealerCardContainer = document.querySelector('#dealer-cards');

const startGame = async (deck, players) => {
    await deck.generateNewDeck();
    console.log(gameDeck);

    const userCard1 = await gameDeck.drawACard();
    user.hitMe(userCard1.cards[0]);
    appendCardImage(userCardContainer, userCard1.cards[0].image);

    const userCard2 = await gameDeck.drawACard();
    user.hitMe(userCard2.cards[0]);
    appendCardImage(userCardContainer, userCard2.cards[0].image);

    const dealerCard1 = await gameDeck.drawACard();
    dealer.hitMe(dealerCard1.cards[0]);
    appendCardImage(dealerCardContainer, dealerCard1.cards[0].image);

    const dealerCard2 = await gameDeck.drawACard();
    dealer.hitMe(dealerCard2.cards[0]);
    appendCardImage(dealerCardContainer, dealerCard2.cards[0].image);

    console.log(user);
    console.log(dealer);

    displayTotal();
}


const checkWinner = () => {
    const userMinScore = user.minScore;
    const userMaxScore = user.maxScore;

    const dealerMinScore = dealer.minScore;
    const dealerMaxScore = dealer.maxScore;

    let userFinalScore = 0;
    let dealerFinalScore = 0;

    if (userMaxScore <= 21 && userMaxScore > userMinScore) {
        userFinalScore = userMaxScore;
    } else {
        userFinalScore = userMinScore;
    }

    if (dealerMaxScore <= 21 && dealerMaxScore > dealerMinScore) {
        dealerFinalScore = dealerMaxScore;
    } else {
        dealerFinalScore = dealerMinScore;
    }

    if (dealerFinalScore > 21) {
        displayWinner('user');
    } else if (userFinalScore === dealerFinalScore) {
        displayWinner('tie');
    } else if (userFinalScore > dealerFinalScore) {
        displayWinner('user');
    } else {
        displayWinner('dealer');
    }
    document.querySelector('#dealer-score').innerText = `Score: ${dealerFinalScore}`;
}

const displayTotal = () => {
    const userScore = document.querySelector('#user-score');

    if (user.minScore === user.maxScore) {
        userScore.innerText = `Score: ${user.minScore}`;
    } else {
        userScore.innerText = `Score: ${user.minScore} or ${user.maxScore}`;
    }
}

const displayWinner = (winner) => {
    const popUpDiv = document.createElement('div');
    popUpDiv.id = 'popup-div';
    const winnerPtag = document.createElement('p');
    const newGameBtn = document.createElement('button');

    if (winner === 'tie') {
        winnerPtag.innerText = `It's a tie!`;
    } else {
        winnerPtag.innerText = `The ${winner} wins!`;
        document.querySelector(`#${winner}-streak`).innerText++;
    }

    newGameBtn.innerText = 'New Game';

    newGameBtn.addEventListener('click', () => {
        userCardContainer.innerHTML = '';
        dealerCardContainer.innerHTML = '';
        popUpDiv.outerHTML = '';
        gameDeck = new Deck();
        user = new User();
        dealer = new Dealer();
        document.querySelector('#dealer-score').innerText = '';
        startGame(gameDeck);
    })

    popUpDiv.append(winnerPtag, newGameBtn);
    document.querySelector('#root').appendChild(popUpDiv);
}

const checkUserBust = () => {
    if (user.minScore > 21) {
        displayWinner('dealer');
    }
}

startGame(gameDeck);

document.querySelector('#hit-btn').addEventListener('click', async () => {
    const userCard = await gameDeck.drawACard();
    user.hitMe(userCard.cards[0]);
    appendCardImage(userCardContainer, userCard.cards[0].image);
    displayTotal();
    checkUserBust();
    console.log(user)
})

document.querySelector('#stay-btn').addEventListener('click', async () => {
    while (dealer.minScore < 17 && dealer.maxScore < 17 || dealer.minScore < 17 && dealer.maxScore > 21) {
        const dealerCard = await gameDeck.drawACard();
        dealer.hitMe(dealerCard.cards[0]);
        appendCardImage(dealerCardContainer, dealerCard.cards[0].image);
    }
    console.log(dealer)
    checkWinner();
})

const appendCardImage = (target, src) => {
    const img = document.createElement('img');
    img.src = src;
    target.appendChild(img);
}