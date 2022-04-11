// Blackjack game logic
import card_data from './card_data.json'
const check_bust = (cards: number[]): boolean => {
    var score = calculate_score(cards);
    if(score > 21) {
        return true;
    }
    return false;
};


const calculate_score = (cards: number[]): number => {
    var total: number = 0;
    cards.forEach(card => {
        var value: number = card_data[card].value;
        if(value == 1) {
            // special ace handling case here s
        }
        total+=value;
    }); 
    return total;
};


function shuffle(array: number[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


export {check_bust, calculate_score, shuffle};