import React from "react";

import Cards from "../Cards/Cards";
// import Timer from '../Timer'

class Solitaire extends React.Component {
  constructor(props) {
    super(props);
    this.deck = this.deck.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.dealCards = this.dealCards.bind(this);
    this.handleDealtCardsClick = this.handleDealtCardsClick.bind(this);
    this.handleKingsClick = this.handleKingsClick.bind(this);
    this.topCards = this.topCards.bind(this);
    this.aceClick = this.aceClick.bind(this);

    this.state = {
      redSuits: ["♥️", "♦️"],
      blackSuits: ["♠️", "♣️"],
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      deck: [],
      currentCardIndex: -1,
      dealtCards: [],
      selected: [],
      cardColumn: [],
      cardRow: [],
      deckSelected: [],
      dealtCardSelected: [],
      dealtCardColumn: [],
      dealtCardRow: [],
      topCards: [],
      topCardSelected: [],
      topCardColumn: [],
      topCardRow: [],
    };

    this.shuffle();

    // this.dealCards()
    // this.deck();
  }

  // handleClick contains a counter and changes the top card when clicked
  //! Need to test the deck when it reaches 0 - possible solutions, create condition in function and consitional render in Card.js
  handleClick() {
    let index = this.state.currentCardIndex;
    let deck = this.state.deck;
    let deckSelected = this.state.deckSelected;
    let dealtCardSelected = this.state.dealtCardSelected;
    let topCardSelected = this.state.topCardSelected;

    // If a deck caed or a dealtCard is selected but is not moved, this resets the selected value to false

    deckSelected.selected = false;
    dealtCardSelected.selected = false;
    topCardSelected.selected = false;

    if (deck.length - 2 >= index) {
      index++;
    } else if (index > deck.length - 2) {
      index = -1;
    }

    // Ternary operator resets the currentIndex state once the deck goes over 22
    // When the function executes it checks the conition if false it adds one
    // After it adds one and is clicked again, it checks if the new index thats against the condition.

    this.setState({
      currentCardIndex: index,
      deckSelected: deckSelected,
      dealtCardSelected: dealtCardSelected,
    });
  }

  // The deck Function is used to loop through the each element in the suits deckay and and asssign each element
  // values deck to each suit.
  // Card object will be pushed into the deck
  deck() {
    let values = this.state.values;
    let deck = this.state.deck;
    let redSuits = this.state.redSuits;
    let blackSuits = this.state.blackSuits;

    for (let i = 0; i < redSuits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        let card = { Value: values[x], Suit: redSuits[i], Colour: "red", Display: values[x] };
        deck.push(card);
      }
    }

    for (let i = 0; i < blackSuits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        let card = { Value: values[x], Suit: blackSuits[i], Colour: "black", Display: values[x] };
        deck.push(card);
      }
    }

    deck.forEach((item, i) => {
      item.id = i + 1;
    });
    deck.forEach((item) => {
      item.selected = false;
    });

    deck.forEach((item) => {
      item.flipped = false;
    });

  

    deck.map((item) => {
      switch (item.Value) {
        case 1:
          item.Display = "A";
          break;
        case 13:
          item.Display = "K";
          break;
        case 12:
          item.Display = "Q";
          break;
        case 11:
          item.Display = "J";
          break;
        default:
      }
    });

    this.setState({
      values: values,
      deck: deck,
      redSuits: redSuits,
      blackSuits: blackSuits,
    });
  }

  // The shuffle function uses Fisher-Yates algorithm to shuffle the cards
  shuffle() {
    this.deck();
    let deck = this.state.deck;
    let newPos, temp;
    for (let i = deck.length - 1; i > 0; i--) {
      newPos = Math.floor(Math.random() * (i + 1));
      temp = deck[i];
      deck[i] = deck[newPos];
      deck[newPos] = temp;
    }
  }

  dealCards() {
    const deck = [...this.state.deck];
    let cardsArr = [[], [], [], [], [], [], []];

    // The cardsArr loop goes through the deck, and takes out cards that are pushed into
    // the cardsArr subarrays. Each subarray is pushed one card more than the previous array.

    for (let i = 0; i < cardsArr.length; i++) {
      cardsArr[i] = [...deck.splice(0, [i + 1])];
    }

    //Changes the flipped value of the last card in each of cardArr's nested arrays

    for (let i = 0; i < cardsArr.length; i++) {
      cardsArr[i][cardsArr[i].length - 1].flipped = true;
    }

    this.setState({ dealtCards: cardsArr, deck: deck });
    // this.state.dealtCards = cardsArr
    console.log(deck);
    console.log(this.state.dealtCards);
  }

  topCards() {
    let topCards = [[], [], [], []];

    this.setState({ topCards: topCards });
  }

  aceClick(i, j) {
    let dealtCardSelected = this.state.dealtCardSelected;
    let deckSelected = this.state.deckSelected;
    let dealtCards = [...this.state.dealtCards];
    let dealtCardColumn = this.state.dealtCardColumn;
    let dealtCardRow = this.state.dealtCardRow;
    let cardColumn = this.state.cardColumn;
    let deck = [...this.state.deck];
    let topCards = [...this.state.topCards];
    let topCardSelected = this.state.topCardSelected;
    let topCardColumn = this.state.topCardColumn;
    let topCardRow = this.state.topCardRow;
    let index = this.state.currentCardIndex;

    // This set's the previous selected car in the foundation pile to false

    for (let i = 0; i < topCards.length; i++) {
      for (let j = 0; j < topCards[i].length; j++) {
        if (topCards[i][j].selected) {
          topCards[i][j].selected = false;
        }
      }
    }

    //Ensures only the ace card cannot be selected

    if (typeof topCardSelected !== "undefined" && topCards[i].length >= 2) {
      topCardSelected = topCards[i][j];
      topCardSelected.selected = true;
      topCardColumn = [i];
      topCardRow = [j];
      console.log(topCardSelected);
    }

    console.log(topCardSelected);
    console.log(topCardSelected);
    if (dealtCardSelected.length !== 0) {
      console.log("DealtCard");
      dealtCardSelected.selected = false;
      if (topCards[i].length === 0 && dealtCardSelected.Value === 1) {
        topCards[i].push(
          ...dealtCards[dealtCardColumn].splice(dealtCardRow, 1)
        );
        console.log("dealtcards should not print");
        dealtCardSelected.selected = false;
        deckSelected.length = 0;
      } else if (topCards[i].length !== 0) {
        if (
          dealtCardSelected.Value - topCards[i][j].Value === 1 &&
          dealtCardSelected.Suit === topCards[i][j].Suit
        ) {
          console.log("should take the 2");

          topCards[i].push(
            ...dealtCards[dealtCardColumn].splice(dealtCardRow, 1)
          );
          topCardSelected = [];
        }
      }
    }

    // Used to remove an card form the deck and pass it into the foundation pile

    if (deckSelected.length !== 0) {
      console.log("DeckCard");
      deckSelected.selected = false; 
      if (topCards[i].length === 0 && deckSelected.Value === 1) {
        topCards[i].push(...deck.splice(cardColumn, 1));
        index -= 1;
        deckSelected = [];
        console.log(topCardSelected);
      } else if (
        topCards[i].length !== 0 &&
        deckSelected.Value - topCards[i][j].Value === 1 &&
        deckSelected.Suit === topCards[i][j].Suit
      ) {
        console.log("should take the deck 2");
        topCards[i].push(...deck.splice(cardColumn, 1));
        index -= 1;
        deckSelected = [];
      }
    }

    topCardSelected.selected = true;

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0) {
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
      }
    }

    this.setState({
      topCards: topCards,
      dealtCards: dealtCards,
      deck: deck,
      deckSelected: deckSelected,
      topCardSelected: topCardSelected,
      topCardColumn: topCardColumn,
      topCardRow: topCardRow,
      currentCardIndex: index,
    });
  }

  handleDealtCardsClick = (i, j) => {
    let dealtCards = [...this.state.dealtCards];
    let deck = [...this.state.deck];
    let selected = [this.state.selected];
    let cardColumn = [this.state.cardColumn];
    let cardRow = [this.state.cardRow];
    let deckSelected = [this.state.deckSelected];
    let flipped = 0;
    let dealtCardSelected = [this.state.dealtCardSelected];
    let dealtCardColumn = this.state.dealtCardColumn;
    let dealtCardRow = this.state.dealtCardRow;
    let index = this.state.currentCardIndex;
    let topCardSelected = this.state.topCardSelected;
    let topCardColumn = this.state.topCardColumn;
    let topCardRow = this.state.topCardRow;
    let topCards = [...this.state.topCards];

    for (let i = 0; i < deck.length; i++) {
      if (deck[i].selected) {
        deck[i].selected = false;
      }
    }

    for (let i = 0; i < dealtCards.length; i++) {
      for (let j = 0; j < dealtCards[i].length; j++) {
        if (dealtCards[i][j].selected) {
          selected = dealtCards[i][j];
          cardColumn = i;
          cardRow = j;
          dealtCards[i][j].selected = false;
          // Loop creates a counter for flipped cards in the selected card's column
          for (let i = 0; i < dealtCards[cardColumn].length; i++) {
            if (dealtCards[cardColumn][i].flipped === true) {
              flipped++;
            }
          }
        }
      }
    }

    dealtCards[i][j].selected = true;
    // DealtCardSelected to be use in the aces function
    dealtCardSelected = dealtCards[i][j];

    dealtCardColumn = i;
    dealtCardRow = j;
    console.log(dealtCardSelected);

    // Used to move Tableu cards onto other columns
    // Checks there's a card selected
    if (selected.length !== 0) {
      // first condition compares the numerical value of each card, second checks if each card's colour is different
      if (
        dealtCards[i][j].Value - selected.Value === 1 &&
        selected.Colour !== dealtCards[i][j].Colour
      ) {
        // pushes cards from selected column that are flipped into new column
        dealtCards[i].push(...dealtCards[cardColumn].splice(cardRow, flipped));
        dealtCards[i][j].selected = false;
        // Loop flips the last card in each array
      }
    }

    if ([...deckSelected].length === 1) {
      console.log("deck test");
      // first condition compares the numerical value of each card, second checks if each card's colour is different
      if (
        dealtCards[i][j].Value - deckSelected[0].Value === 1 &&
        deckSelected[0].Colour !== dealtCards[i][j].Colour
      ) {
        console.log(dealtCards[i][j]);
        console.log(deckSelected[0]);

        console.log("deck test two");
        // pushes cards from selected column that are flipped into new column
        dealtCards[i].push(...deck.splice([cardColumn], 1));
        dealtCards[i][j].selected = false;
        console.log(index);
        index -= 1;
        console.log(index);
      }
    }
    topCardSelected.selected = false;
    console.log(topCardSelected);
    if (typeof topCardSelected !== "undefined" && topCardSelected.Value >= 2) {
      console.log(topCardSelected);
      if (dealtCardSelected.Value - topCardSelected.Value === 1) {
        dealtCards[i].push(...topCards[topCardColumn].splice(topCardRow, 1));

        dealtCardSelected.selected = false;
        topCardSelected.selected = false;
        topCardSelected = [];
      }
    }

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0) {
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
      }
    }

    console.log(index);

    this.setState({
      currentCardIndex: index,
      dealtCards: dealtCards,
      deck: deck,
      selected: selected,
      cardColumn: cardColumn,
      cardRow: cardRow,
      dealtCardSelected: dealtCardSelected,
      deckSelected: deckSelected,
      dealtCardColumn: dealtCardColumn,
      dealtCardRow: dealtCardRow,
      topCards: topCards,
      topCardSelected: [],
    });
  };
  // When card from the deck is clicked it changes colour and all the other cards
  // change back to their original colour.

  deckCard(i) {
    let deck = [...this.state.deck];
    let dealtCards = [...this.state.dealtCards];
    let deckSelected = [this.state.deckSelected];
    let cardColumn = [this.state.cardColumn];
    let topCardSelected = this.state.topCardSelected;
    let dealtCardSelected = this.state.dealtCardSelected;

    // Changes the all the other cards in the deck's selected value to false

    for (let i = 0; i < deck.length; i++) {
      if (deck[i].selected) {
        deck[i].selected = false;
      }
    }

    // Sets all the dealtCards selected status to false, changes colour back to white
    for (let i = 0; i < dealtCards.length; i++) {
      for (let j = 0; j < dealtCards[i].length; j++) {
        if (dealtCards[i][j].selected) {
          dealtCards[i][j].selected = false;
        }
      }
    }
    // Changes the selected value of deck card clicked on to true, causing it to change colour
    deck[i].selected = true;
    deckSelected = deck[i];
    console.log(deckSelected);
    cardColumn = i;
    console.log(cardColumn);
    dealtCardSelected = [];

    if (typeof topCardSelected !== "undefined" && topCardSelected.Value >= 2) {
      topCardSelected.selected = false;
      topCardSelected = [];
    }

    // topCardSelected.selected = false
    // first condition compares the numerical value of each card, second checks if each card's colour is different
    // pushes cards from selected column that are flipped into new column

    // Loop flips the last card in each array

    this.setState({
      deck: deck,
      dealtCards: dealtCards,
      deckSelected: deckSelected,
      cardColumn: cardColumn,
      topCardSelected: topCardSelected,
      dealtCardSelected: dealtCardSelected,
    });
  }

  handleKingsClick(i) {
    let dealtCardSelected = this.state.dealtCardSelected;
    let deckSelected = this.state.deckSelected;
    let dealtCards = [...this.state.dealtCards];
    let dealtCardColumn = this.state.dealtCardColumn;
    let dealtCardRow = this.state.dealtCardRow;
    let cardColumn = this.state.cardColumn;
    let deck = [...this.state.deck];
    let flipped = 0;
    let index = this.state.currentCardIndex;

    for (let i = 0; i < dealtCards[dealtCardColumn].length; i++) {
      if (dealtCards[dealtCardColumn][i].flipped === true) {
        flipped++;
      }
    }
    console.log(flipped);
    console.log(index);

    if (dealtCardSelected !== 0 && dealtCardSelected.Value === 13) {
      dealtCards[i].push(
        ...dealtCards[dealtCardColumn].splice(dealtCardRow, flipped)
      );
      dealtCardSelected.selected = false;
    } else if (deckSelected !== 0 && deckSelected.Value === 13) {
      console.log(cardColumn);
      dealtCards[i].push(...deck.splice([cardColumn], 1));
      deckSelected.selected = false;
    }

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0) {
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
      }
    }
    console.log(dealtCardSelected);
    console.log(deckSelected);

    this.setState({
      dealtCards: dealtCards,
      dealtCardSelected: dealtCardSelected,
      deck: deck,
      deckSelected: deckSelected,
    });
  }

  componentDidMount() {
    this.dealCards();
    this.topCards();
    // this.suitChange()
  }

  newGame() {
    window.location.reload(false);
  }

  render() {
    const {
      suits,
      values,
      currentCardIndex,
      deck,
      dealtCards,
      aceSpadeSelected,
      topCards,
    } = this.state;

    return (
      <div className="canvas">
        <div className="game-size">
          {/* <Timer/> */}

          <Cards
            deck={deck}
            index={currentCardIndex}
            card={deck[currentCardIndex]}
            suit={suits}
            value={values}
            dealtCards={dealtCards}
            deckClick={this.handleClick}
            selected={this.handleDealtCardsClick}
            deckCard={() => this.deckCard(currentCardIndex)}
            aceSpadeClick={() => this.handleSpdesAceClick(currentCardIndex)}
            aceSpadeSelected={aceSpadeSelected}
            kingsColumn={this.handleKingsClick}
            topCards={topCards}
            aceClick={this.aceClick}
            newGame={this.newGame}
          />
        </div>
      </div>
    );
  }
}

export default Solitaire;
