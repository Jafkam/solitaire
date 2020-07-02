import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cardDeck: {
        
          diamonds: ['AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD' ], 
          hearts: ['AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH' ], 
          clubs: ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC' ], 
          spades: ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS' ],
        
      },
  }
}

cards() {
  let deck = this.state.cardDeck
  let shuffleArr = deck.diamonds.concat(deck.hearts, deck.clubs, deck.spades)
  

  let shuffleDeck =  function(arr) {
    let newPos,
    temp;
    for (let i = arr.length -1; i > 0; i-- ) {
      newPos = Math.floor(Math.random() * (i+1))
      temp = arr[i];
      arr[i] = arr[newPos];
      arr[newPos] = temp;

    }
    return arr;
  }

  let newDeck = shuffleDeck(shuffleArr);
  console.log(newDeck)
  
}

  render() {
    this.cards()
  
  return <div></div>
  }
}
export default App;