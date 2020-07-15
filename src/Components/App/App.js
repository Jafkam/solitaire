import React from "react";
import "../cards/cards.css";
import Cards from "../cards/cards";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      topCards: [[], [], [], []],
      topCardSelected: [],
      topCardColumn: [],
      topCardRow: [],
    };
  }

  // handleClick contains a counter and changes the top card when clicked

  handleClick = () => {
    let index = this.state.currentCardIndex;
    let deck = this.state.deck;
    let deckSelected = this.state.deckSelected;
    let dealtCardSelected = this.state.dealtCardSelected;
    let topCardSelected = this.state.topCardSelected;

    // If a deck caed or a dealtCard is selected but is not moved, this resets the selected value to false

    deckSelected.selected = false;
    dealtCardSelected.selected = false;
    topCardSelected.selected = false;

    // Ternary operator resets the currentIndex state once the deck goes over 22
    // When the function executes it checks the conition if false it adds one
    // After it adds one and is clicked again, it checks if the new index thats against the condition.

    if (deck.length - 2 >= index) {
      index++;
    } else if (index > deck.length - 2) {
      index = -1;
    }

    this.setState({
      currentCardIndex: index,
      deckSelected: deckSelected,
      dealtCardSelected: dealtCardSelected,
    });
  };

  // The deck Function is used to loop through the each element in the suits deckay and and asssign each element
  // values deck to each suit.

  deck = () => {
    let deck = this.state.deck;
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let redSuits = ["♥️", "♦️"];
    let blackSuits = ["♠️", "♣️"];

    for (let i = 0; i < redSuits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        let card = {
          Value: values[x],
          Suit: redSuits[i],
          Colour: "red",
          Display: values[x],
        };
        deck.push(card);
      }
    }

    for (let i = 0; i < blackSuits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        let card = {
          Value: values[x],
          Suit: blackSuits[i],
          Colour: "black",
          Display: values[x],
        };
        deck.push(card);
      }
    }

    deck.forEach((item, i) => {
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
      item.flipped = false;
      item.selected = false;
      item.id = i + 1;
    });

    this.setState(
      {
        values: values,
        deck: deck,
      }
      // this.shuffle()
    );
  };

  // The shuffle function uses Fisher-Yates algorithm to shuffle the cards
  shuffle = () => {
    let deck = this.state.deck;
    let newPos, temp;
    for (let i = deck.length - 1; i > 0; i--) {
      newPos = Math.floor(Math.random() * (i + 1));
      temp = deck[i];
      deck[i] = deck[newPos];
      deck[newPos] = temp;
    }
    console.log(deck);

    this.setState({ deck: deck });
  };

  dealCards = () => {
    let deck = [...this.state.deck];
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
  };

  aceClick = (i, j) => {
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
      topCardColumn = i;
      topCardRow = j;
    }

    // This if statement removes a cas=rd from the dealtCVards array and pushes it into the topCards array

    if (dealtCardSelected.length !== 0) {
      dealtCardSelected.selected = false;
      if (topCards[i].length === 0 && dealtCardSelected.Value === 1) {
        topCards[i].push(
          ...dealtCards[dealtCardColumn].splice(dealtCardRow, 1)
        );
      } else if (topCards[i].length !== 0) {
        if (
          dealtCardSelected.Value - topCards[i][j].Value === 1 &&
          dealtCardSelected.Suit === topCards[i][j].Suit
        ) {
          topCards[i].push(
            ...dealtCards[dealtCardColumn].splice(dealtCardRow, 1)
          );
          topCardSelected = [];
        }
      }
    }

    // Used to remove an card form the deck and pass it into the foundation pile

    if (deckSelected.length !== 0) {
      deckSelected.selected = false;
      if (topCards[i].length === 0 && deckSelected.Value === 1) {
        topCards[i].push(...deck.splice(cardColumn, 1));
        index--;
      } else if (
        topCards[i].length !== 0 &&
        deckSelected.Value - topCards[i][j].Value === 1 &&
        deckSelected.Suit === topCards[i][j].Suit
      ) {
        topCards[i].push(...deck.splice(cardColumn, 1));
        index--;
      }
    }

    topCardSelected.selected = true;

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0) {
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
      }
    }

    deckSelected = [];
    dealtCardSelected = [];

    this.setState({
      topCards: topCards,
      dealtCards: dealtCards,
      deck: deck,
      deckSelected: deckSelected,
      topCardSelected: topCardSelected,
      topCardColumn: topCardColumn,
      topCardRow: topCardRow,
      currentCardIndex: index,
      dealtCardSelected: dealtCardSelected,
    });
  };

  handleDealtCardsClick = (i, j) => {
    let dealtCards = [...this.state.dealtCards];
    let deck = [...this.state.deck];
    let selected = this.state.selected;
    let cardColumn = this.state.cardColumn;
    let cardRow = [this.state.cardRow];
    let deckSelected = this.state.deckSelected;
    let dealtCardSelected = this.state.dealtCardSelected;
    let dealtCardColumn = this.state.dealtCardColumn;
    let dealtCardRow = this.state.dealtCardRow;
    let index = this.state.currentCardIndex;
    let topCardSelected = this.state.topCardSelected;
    let topCardColumn = this.state.topCardColumn;
    let topCardRow = this.state.topCardRow;
    let topCards = [...this.state.topCards];
    let flipped = 0;

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

    // Used to move Tableu cards onto other columns
    // Checks there's a card selected
    if (selected.length !== 0) {
      // first condition compares the numerical value of each card, second checks if each card's colour is different
      if (
        dealtCardSelected.Value - selected.Value === 1 &&
        selected.Colour !== dealtCardSelected.Colour
      ) {
        if (dealtCardSelected === dealtCards[i][dealtCards[i].length - 1]) {
          // pushes cards from selected column that are flipped into new column
          dealtCards[i].push(
            ...dealtCards[cardColumn].splice(cardRow, flipped)
          );
          dealtCardSelected.selected = false;
          dealtCardSelected = [];
          selected = [];
        }
      }
    }

    if (deckSelected.length !== 0) {
      // first condition compares the numerical value of each card, second checks if each card's colour is different
      if (
        dealtCardSelected.Value - deckSelected.Value === 1 &&
        deckSelected.Colour !== dealtCardSelected.Colour
      ) {
        if (j === dealtCards[i].length - 1) {
          dealtCards[i].push(...deck.splice([cardColumn], 1));
          dealtCardSelected.selected = false;
          index--;
        }
        // pushes cards from selected column that are flipped into new column
      }
    }

    if (typeof topCardSelected !== "undefined" && topCardSelected.Value >= 2) {
      if (
        dealtCardSelected.Value - topCardSelected.Value === 1 &&
        dealtCardSelected.Colour !== topCardSelected.Colour
      ) {
        dealtCards[i].push(...topCards[topCardColumn].splice(topCardRow, 1));
        dealtCardSelected.selected = false;
        topCardSelected = [];
      }
    }

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0) {
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
      }
    }
    topCardSelected.selected = false;
    deckSelected.selected = false;
    deckSelected = [];

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

  deckCard = (i) => {
    let deck = [...this.state.deck];
    let deckSelected = this.state.deckSelected;
    let cardColumn = this.state.cardColumn;
    let topCardSelected = this.state.topCardSelected;
    let dealtCardSelected = this.state.dealtCardSelected;

    // Changes the all the other cards in the deck's selected value to false
    // Changes the selected value of deck card clicked on to true, causing it to change colour

    deckSelected = deck[i];
    deckSelected.selected = true;
    cardColumn = i;
    dealtCardSelected.selected = false;
    dealtCardSelected = [];
    topCardSelected.selected = false;
    topCardSelected = [];

    this.setState({
      deckSelected: deckSelected,
      cardColumn: cardColumn,
      topCardSelected: topCardSelected,
      dealtCardSelected: dealtCardSelected,
    });
  };

  handleKingsClick = (i) => {
    let dealtCardSelected = this.state.dealtCardSelected;
    let deckSelected = this.state.deckSelected;
    let dealtCards = [...this.state.dealtCards];
    let dealtCardColumn = this.state.dealtCardColumn;
    let dealtCardRow = this.state.dealtCardRow;
    let cardColumn = this.state.cardColumn;
    let deck = [...this.state.deck];
    let flipped = 0;

    for (let i = 0; i < dealtCards[dealtCardColumn].length; i++) {
      if (dealtCards[dealtCardColumn][i].flipped === true) {
        flipped++;
      }
    }

    if (dealtCardSelected !== 0 && dealtCardSelected.Value === 13) {
      dealtCards[i].push(
        ...dealtCards[dealtCardColumn].splice(dealtCardRow, flipped)
      );
      dealtCardSelected.selected = false;
    } else if (deckSelected !== 0 && deckSelected.Value === 13) {
      dealtCards[i].push(...deck.splice([cardColumn], 1));
      deckSelected.selected = false;
    }

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0)
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
    }

    this.setState({
      dealtCards: dealtCards,
      dealtCardSelected: dealtCardSelected,
      deck: deck,
      deckSelected: deckSelected,
    });
  };

  componentDidMount = () => {
    this.deck();
    this.dealCards();
  };

  newGame = () => {
    window.location.reload(false);
  };

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
        <div className="gameSize">
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

export default App;
