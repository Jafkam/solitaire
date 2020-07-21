import React from "react";
import Cards from "../components/cards/cards";
import { SUITS, RANK } from "../constants";
import "./app.css";

class App extends React.Component {
  state = {
    deck: [],
    currentCardIndex: -1,
    dealtCards: [],
    previousDealtCardSelected: [],
    previousSelectedColumnIndex: [],
    previousSelectedRowIndex: [],
    deckSelected: [],
    deckSelectedIndex: [],
    dealtCardSelected: [],
    dealtCardColumnIndex: [],
    dealtCardRowIndex: [],
    topCards: [[], [], [], []],
    topCardSelected: [],
    topCardColumnIndex: [],
    topCardRowIndex: [],
  };

  // The deck Function is used to loop through the each element in the SUITS deck and asssign objects each element

  deck = () => {
    const deck = this.state.deck;
    for (let i = 0; i < SUITS.length; i++) {
      let colour;
      if (SUITS[i] === "♦️" || SUITS[i] === "♥️") {
        colour = "red";
      } else {
        colour = "black";
      }
      for (let x = 0; x < RANK.length; x++) {
        let card = {
          suit: SUITS[i],
          rank: RANK[x],
          display: RANK[x],
          colour,
        };
        deck.push(card);
      }
    }

    deck.forEach((item, index) => {
      switch (item.rank) {
        case 1:
          item.display = "A";
          break;
        case 13:
          item.display = "K";
          break;
        case 12:
          item.display = "Q";
          break;
        case 11:
          item.display = "J";
          break;
        default:
      }
      item.flipped = false;
      item.selected = false;
      item.id = index + 1;
    });

    this.setState(
      {
        deck,
      },
      this.shuffle()
    );
  };

  // handleClick contains a counter that changes the top card when clicked

  handleClick = () => {
    let index = this.state.currentCardIndex;
    const deck = this.state.deck;
    const deckSelected = this.state.deckSelected;
    const dealtCardSelected = this.state.dealtCardSelected;
    const topCardSelected = this.state.topCardSelected;

    // Resets selected value of all cards in the game to false

    deckSelected.selected = false;
    dealtCardSelected.selected = false;
    topCardSelected.selected = false;

    // When the function executes it checks the condition, if false it adds one

    if (deck.length - 2 >= index) {
      index++;
    } else if (index > deck.length - 2) {
      index = -1;
    }

    this.setState({
      currentCardIndex: index,
      deckSelected,
      dealtCardSelected,
    });
  };

  // The shuffle function uses Fisher-Yates algorithm to shuffle the cards
  shuffle = () => {
    const deck = this.state.deck;
    let newPos, temp;
    for (let i = deck.length - 1; i > 0; i--) {
      newPos = Math.floor(Math.random() * (i + 1));
      temp = deck[i];
      deck[i] = deck[newPos];
      deck[newPos] = temp;
    }

    this.setState({ deck });
  };

  dealCards = () => {
    const deck = [...this.state.deck];
    let dealtCards = [[], [], [], [], [], [], []];

    // The dealtCards loop goes through the deck, and takes out cards that are pushed into
    // the dealtCards subarrays. Each subarray is pushed one card more than the previous array.

    for (let i = 0; i < dealtCards.length; i++) {
      dealtCards[i] = [...deck.splice(0, [i + 1])];
    }

    //Changes the flipped rank of the last card in each of dealtCards nested arrays

    for (let i = 0; i < dealtCards.length; i++) {
      dealtCards[i][dealtCards[i].length - 1].flipped = true;
    }

    this.setState({ dealtCards, deck });
  };

  // The acClick function accepts cards to complete the game

  aceClick = (columnIndex, cardIndex) => {
    const dealtCards = [...this.state.dealtCards];
    const dealtCardColumnIndex = this.state.dealtCardColumnIndex;
    const dealtCardRowIndex = this.state.dealtCardRowIndex;
    const deck = [...this.state.deck];
    const topCards = [...this.state.topCards];
    const deckSelectedIndex = this.state.deckSelectedIndex;
    let dealtCardSelected = this.state.dealtCardSelected;
    let deckSelected = this.state.deckSelected;
    let topCardSelected = this.state.topCardSelected;
    let topCardColumnIndex = this.state.topCardColumnIndex;
    let topCardRowIndex = this.state.topCardRowIndex;
    let index = this.state.currentCardIndex;

    // This sets the previous selected card in the foundation pile to false

    for (let i = 0; i < topCards.length; i++) {
      for (let j = 0; j < topCards[i].length; j++) {
        if (topCards[i][j].selected) {
          topCards[i][j].selected = false;
        }
      }
    }

    //Ensures the first card to be added onto the top pile is the Ace

    if (
      typeof topCardSelected !== "undefined" &&
      topCards[columnIndex].length >= 2
    ) {
      topCardSelected = topCards[columnIndex][cardIndex];
      topCardSelected.selected = true;
      topCardColumnIndex = columnIndex;
      topCardRowIndex = cardIndex;
    }

    // Removes a card from the dealtCaards array and pushes it into the topCards array

    if (dealtCardSelected.length !== 0) {
      dealtCardSelected.selected = false;
      if (topCards[columnIndex].length === 0 && dealtCardSelected.rank === 1) {
        topCards[columnIndex].push(
          ...dealtCards[dealtCardColumnIndex].splice(dealtCardRowIndex, 1)
        );
      } else if (topCards[columnIndex].length !== 0) {
        if (
          dealtCardSelected.rank - topCards[columnIndex][cardIndex].rank ===
            1 &&
          dealtCardSelected.suit === topCards[columnIndex][cardIndex].suit
        ) {
          if (
            dealtCardSelected ===
            dealtCards[dealtCardColumnIndex][
              dealtCards[dealtCardColumnIndex].length - 1
            ]
          ) {
            topCards[columnIndex].push(
              ...dealtCards[dealtCardColumnIndex].splice(dealtCardRowIndex, 1)
            );
            topCardSelected = [];
          }
        }
      }
    }

    // Used to remove a card form the deck and pass it into the topCards array

    if (deckSelected.length !== 0) {
      deckSelected.selected = false;
      if (topCards[columnIndex].length === 0 && deckSelected.rank === 1) {
        topCards[columnIndex].push(...deck.splice(deckSelectedIndex, 1));
        index--;
      } else if (
        topCards[columnIndex].length !== 0 &&
        deckSelected.rank - topCards[columnIndex][cardIndex].rank === 1 &&
        deckSelected.suit === topCards[columnIndex][cardIndex].suit
      ) {
        topCards[columnIndex].push(...deck.splice(deckSelectedIndex, 1));
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
      topCards,
      dealtCards,
      deck,
      deckSelected,
      topCardSelected,
      topCardColumnIndex,
      topCardRowIndex,
      currentCardIndex: index,
      dealtCardSelected,
    });
  };

  handleDealtCardsClick = (columnIndex, rowIndex) => {
    const dealtCards = [...this.state.dealtCards];
    const deck = [...this.state.deck];
    const topCardColumnIndex = this.state.topCardColumnIndex;
    const topCardRowIndex = this.state.topCardRowIndex;
    const topCards = [...this.state.topCards];
    const deckSelectedIndex = this.state.deckSelectedIndex;
    const deckSelected = this.state.deckSelected;
    let previousDealtCardSelected = this.state.previousDealtCardSelected;
    let previousSelectedColumnIndex = this.state.previousSelectedColumnIndex;
    let previousSelectedRowIndex = [this.state.previousSelectedRowIndex];
    let dealtCardSelected = this.state.dealtCardSelected;
    let dealtCardColumnIndex = this.state.dealtCardColumnIndex;
    let dealtCardRowIndex = this.state.dealtCardRowIndex;
    let index = this.state.currentCardIndex;
    let topCardSelected = this.state.topCardSelected;
    let flipped = 0;

    for (let i = 0; i < dealtCards.length; i++) {
      for (let j = 0; j < dealtCards[i].length; j++) {
        if (dealtCards[i][j].selected) {
          previousDealtCardSelected = dealtCards[i][j];
          previousSelectedColumnIndex = i;
          previousSelectedRowIndex = j;
          dealtCards[i][j].selected = false;
          // Loop creates a counter for flipped cards in the previousDealtCardSelected card's column
          for (
            let i = 0;
            i < dealtCards[previousSelectedColumnIndex].length;
            i++
          ) {
            if (dealtCards[previousSelectedColumnIndex][i].flipped === true) {
              flipped++;
            }
          }
        }
      }
    }

    dealtCards[columnIndex][rowIndex].selected = true;
    dealtCardSelected = dealtCards[columnIndex][rowIndex];
    dealtCardColumnIndex = columnIndex;
    dealtCardRowIndex = rowIndex;

    // Used to move dealtCards into other arrays
    // Checks if a dealtCard is is selected
    if (previousDealtCardSelected.length !== 0) {
      // first condition compares the numerical rank of each card, second checks if each card's colour is different
      if (
        dealtCardSelected.rank - previousDealtCardSelected.rank === 1 &&
        previousDealtCardSelected.colour !== dealtCardSelected.colour
      ) {
        if (
          dealtCardSelected ===
          dealtCards[columnIndex][dealtCards[columnIndex].length - 1]
        ) {
          // pushes cards from selected column that are flipped into new column
          dealtCards[columnIndex].push(
            ...dealtCards[previousSelectedColumnIndex].splice(
              previousSelectedRowIndex,
              flipped
            )
          );
          dealtCardSelected.selected = false;
          dealtCardSelected = [];
          previousDealtCardSelected = [];
        }
      }
    }

    if (deckSelected.length !== 0) {
      // first condition compares the numerical rank of each card, second checks if each card's colour is different
      if (
        dealtCardSelected.rank - deckSelected.rank === 1 &&
        deckSelected.colour !== dealtCardSelected.colour
      ) {
        // pushes cards from selected column that are flipped into new column
        if (rowIndex === dealtCards[columnIndex].length - 1) {
          dealtCards[columnIndex].push(...deck.splice([deckSelectedIndex], 1));
          dealtCardSelected.selected = false;
          index--;
        }
      }
    }

    if (typeof topCardSelected !== "undefined" && topCardSelected.rank >= 2) {
      if (
        dealtCardSelected.rank - topCardSelected.rank === 1 &&
        dealtCardSelected.colour !== topCardSelected.colour
      ) {
        dealtCards[columnIndex].push(
          ...topCards[topCardColumnIndex].splice(topCardRowIndex, 1)
        );
        dealtCardSelected.selected = false;
      }
    }

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0) {
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
      }
    }
    topCardSelected.selected = false;
    deckSelected.selected = false;

    this.setState({
      currentCardIndex: index,
      dealtCards,
      deck,
      previousDealtCardSelected,
      previousSelectedColumnIndex,
      previousSelectedRowIndex,
      dealtCardSelected,
      deckSelected: [],
      dealtCardColumnIndex,
      dealtCardRowIndex,
      topCards,
      topCardSelected: [],
    });
  };

  // Selected value of deck card changes to true, all other card's selected values change to false

  deckCard = (arrayIndex) => {
    let deck = [...this.state.deck];
    let deckSelected = this.state.deckSelected;
    let deckSelectedIndex = this.state.deckSelectedIndex;
    let topCardSelected = this.state.topCardSelected;
    let dealtCardSelected = this.state.dealtCardSelected;

    deckSelected = deck[arrayIndex];
    deckSelected.selected = true;
    deckSelectedIndex = arrayIndex;
    dealtCardSelected.selected = false;
    topCardSelected.selected = false;

    this.setState({
      deckSelected,
      deckSelectedIndex,
      topCardSelected: [],
      dealtCardSelected: [],
    });
  };

  // If an array is empty, this function will check if the selected card to be moved is a King

  handleKingsClick = (arrayIndex) => {
    let dealtCardSelected = this.state.dealtCardSelected;
    let deckSelected = this.state.deckSelected;
    let dealtCards = [...this.state.dealtCards];
    let dealtCardColumnIndex = this.state.dealtCardColumnIndex;
    let dealtCardRowIndex = this.state.dealtCardRowIndex;
    const deckSelectedIndex = this.state.deckSelectedIndex;
    let index = this.state.currentCardIndex;
    let deck = [...this.state.deck];
    let flipped = 0;

    for (let i = 0; i < dealtCards[dealtCardColumnIndex].length; i++) {
      if (dealtCards[dealtCardColumnIndex][i].flipped === true) {
        flipped++;
      }
    }

    if (dealtCardSelected !== 0 && dealtCardSelected.rank === 13) {
      dealtCards[arrayIndex].push(
        ...dealtCards[dealtCardColumnIndex].splice(dealtCardRowIndex, flipped)
      );
      dealtCardSelected.selected = false;
    } else if (deckSelected !== 0 && deckSelected.rank === 13) {
      dealtCards[arrayIndex].push(...deck.splice(deckSelectedIndex, 1));
      index--;
      deckSelected.selected = false;
    }

    for (let i = 0; i < dealtCards.length; i++) {
      if (dealtCards[i].length !== 0)
        dealtCards[i][dealtCards[i].length - 1].flipped = true;
    }

    this.setState({
      dealtCards,
      dealtCardSelected,
      deck,
      deckSelected,
      currentCardIndex: index,
    });
  };

  componentDidMount = () => {
    this.deck();
    this.dealCards();
  };

  // Refreshes the page, starts a new game
  newGame = () => {
    window.location.reload(false);
  };

  render() {
    const { currentCardIndex, deck, dealtCards, topCards } = this.state;

    return (
      <div className="canvas">
        <div className="game-size">
          <Cards
            index={currentCardIndex}
            card={deck[currentCardIndex]}
            dealtCards={dealtCards}
            deckClick={this.handleClick}
            selected={this.handleDealtCardsClick}
            deckCard={() => this.deckCard(currentCardIndex)}
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
