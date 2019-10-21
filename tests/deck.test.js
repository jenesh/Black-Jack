const Deck = require('../modules/deck');

// test('Making a new Deck class', () => {
//     const deck = new Deck();
//     expect(deck instanceof Deck).toBeTruthy();
// });

test('New deck has deck_id property', () => {
    const deck = new Deck();
    const deckId = deck.generateNewDeck(); 
    expect(deckId).toContain('deck_id');
})