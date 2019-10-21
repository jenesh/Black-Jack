class User {
    constructor() {
        this.cards = [];
        this.minScore = 0;
        this.maxScore = 0;
        this.tenPoints = ['KING', 'QUEEN', 'JACK'];
    }

    hitMe = (card) => {
        this.cards.push(card);
        // console.log(!isNaN(parseInt(card.value)))
        if (!isNaN(parseInt(card.value))) {
            this.minScore += parseInt(card.value);
            this.maxScore += parseInt(card.value);
        } else if (this.tenPoints.includes(card.value)) {
            this.minScore += 10;
            this.maxScore += 10;
        } else {
            this.minScore += 1;
            this.maxScore += 11;
        }
    }
}

module.exports = User;