let id = '';
let dealer = 0;
let user = 0;

const dealerContainer = document.querySelector('#dealer-container');
const userContainer = document.querySelector('#user-container');


document.addEventListener('DOMContentLoaded', async () => {
    id = await getNewDeck();
    const cardData = await drawOneCard(id, 2);

    const dealerImg = document.createElement('img');
    dealerImg.src = cardData.cards[0].image;
    dealerContainer.prepend(dealerImg);

    cardValue(cardData)

    const userImg = document.createElement('img');
    userImg.src = cardData.cards[1].image;
    userContainer.prepend(userImg);

    addBtns(dealerContainer);
    addBtns(userContainer);
})

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
    const dealerValue = data.cards[0].value;
    console.log(typeof dealerValue)

    if (dealerValue === 'ACE') {
        dealer += 1;
    } else if (typeof dealerValue == 'number') {
        dealer += dealerValue;
    } else {
        dealer += 10;
    }
}

function removeHitMe() {
    console.log(this.parentNode);
    console.log(this.parentNode.children);
    this.parentNode.children[1].onclick = null;
}

async function addNextCard() {
    const card = await drawOneCard(id);
    const nextCard = document.createElement('img');
    nextCard.src = card.cards[0].image;
    this.parentNode.appendChild(nextCard) 
    cardValue(card);
    console.log(dealer)
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
            console.log(card);
        })
    return card;
}