let id = '';
let dealer1 = 0;
let dealer11 = 0;
let user1 = 0;
let user11 = 0;

const dealerContainer = document.querySelector('#dealer-container');
const userContainer = document.querySelector('#user-container');

const newGame = async () => {
    id = await getNewDeck();
    const cardData1 = await drawOneCard(id, 1);

    const dealerImg = document.createElement('img');
    dealerImg.src = cardData1.cards[0].image;
    dealerContainer.prepend(dealerImg);
    dealer = await cardValue(cardData1);

    if (typeof dealer == 'object') {
        dealer1 += 1;
        dealer11 += 11;
    } else {
        dealer1 += dealer;
        dealer11 += dealer;
    }


    const cardData2 = await drawOneCard(id, 1);

    const userImg = document.createElement('img');
    userImg.src = cardData2.cards[0].image;
    userContainer.prepend(userImg);
    user = await cardValue(cardData2);

    if (typeof user == 'object') {
        user1 += 1;
        user11 += 11;
    } else {
        user1 += user;
        user11 += user;
    }

    addBtns(dealerContainer);
    addBtns(userContainer);
    console.log(dealer1, dealer11, user1, user11);
}

const addBtns = (node) => {
    const hitMe = document.createElement('button');
    hitMe.innerText = 'HIT ME';
    const stay = document.createElement('button');
    stay.innerText = 'STAY';

    hitMe.onclick = addNextCard;

    stay.addEventListener('click', removeHitMe);
    node.appendChild(hitMe);
    node.appendChild(stay);
}

function cardValue(data) {
    // console.log(data);
    const dealerValue = data.cards[0].value;
    const tenPoints = ['JACK', 'QUEEN', 'KING'];

    if (tenPoints.includes(dealerValue)) {
        return 10;
    } else if (dealerValue === 'ACE') {
        return [1, 11];
    } else {
        return Number(dealerValue);
    }
}

function removeHitMe() {
    // console.log(this.parentNode);
    // console.log(this.parentNode.children);
    this.parentNode.children[1].onclick = null;
}

async function addNextCard() {
    const card = await drawOneCard(id);
    const nextCard = document.createElement('img');
    nextCard.src = card.cards[0].image;
    this.parentNode.appendChild(nextCard);

    const value = cardValue(card);
    console.log(typeof value)
    if (typeof value == 'object') {
        if (this.parentNode.id === 'dealer-container') {
            dealer1 += value[0];
            dealer11 += value[1];
        } else {
            user1 += value[0];
            user11 += value[1];
        }
    } else {
        if (this.parentNode.id === 'dealer-container') {
            dealer1 += cardValue(card);
            dealer11 += cardValue(card);
        } else {
            user1 += cardValue(card);
            user11 += cardValue(card);
        }
    }

    console.log(dealer1, dealer11)
    console.log(user1, user11)
}
// document.querySelector('#drawCard-btn').addEventListener('click', async () => {
//     await drawOneCard(id);
// })

const getNewDeck = async () => {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    let id = '';

    const deck = await fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            id = data.deck_id;
        })
    return id;
}

const drawOneCard = async (id, count = 1) => {
    const url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`;
    let card = '';

    await fetch(url)
        .then(res => res.json())
        .then(data => {
            card = data;
            // console.log(card);
        })
    return card;
}

const checkWinner = (one, two) => {
    if (one >= 17|| two >= 17) {
        checkBust(one, two);
    } else {
        
    }
}

document.addEventListener('DOMContentLoaded', newGame);