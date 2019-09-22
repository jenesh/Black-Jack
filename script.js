let id = '';

const cardDisplay = document.querySelector('#card-display');

document.addEventListener('DOMContentLoaded', async () => {
    id = await getNewDeck();
    const cardData = await drawOneCard(id, 2);
})

document.querySelector('#drawCard-btn').addEventListener('click', async () => {
    await drawOneCard(id);
})

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

    const response = await fetch(url)
        .then(res => res.json())
        .then(data => {
            card = data;
            console.log(card);
            for (let i = 0; i < count; i++) {
                const img = document.createElement('img');
                img.src = card.cards[i].image;
                root.appendChild(img);
            }
        })
    return card;
}

