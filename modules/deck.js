const axios = require('axios');

class Deck {
    constructor() {
        this.newDeckUrl = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    }

    generateNewDeck = async () => {
        const data = await axios.get(this.newDeckUrl).then(res => res.data);
        this.deckId = data.deck_id;
        this.drawCardUrl = `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`;
        this.reShuffleUrl = `https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`;
        // console.log(Deck1)
        return data;
    }

    drawACard = async () => {
        const data = await axios.get(this.drawCardUrl).then(res => res.data);
        // console.log(data)
        return data
    }
}




const runTest = async () => {
    const Deck1 = new Deck();

    const newDeckResult = await Deck1.generateNewDeck();

    const drawCardResult1 = await Deck1.drawACard();
    const drawCardResult2 = await Deck1.drawACard();
    const drawCardResult3 = await Deck1.drawACard();

    console.log('New Deck', newDeckResult);

    console.log('Draw Card', drawCardResult1);
    console.log('Draw Card', drawCardResult2);
    console.log('Draw Card', drawCardResult3);
}

runTest();



const generateNewDeck = async () => {
    const data = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    return data.data;
}


// module.exports = Deck;