import React from "react";
import "./Cards.css";
// import './Card-flipped'

class Cards extends React.Component {
  render() {
    const {
      dealtCards,
      card,
      deckClick,
      selected,
      deckCard,
      kingsColumn,
      topCards,
      aceClick,
      index,
      deck,
      newGame,
    } = this.props;

    // let deck = this.state.deck

    return (
      <div className="containers">
      <button className="game" onClick={newGame}>
          New Game
        </button>
        {/* // This represents our card. The container is the card, suits holds the suit value and values number type of the card
        // SO WE NEED TO ACCESS THE ARRAYS TO PUSH THOSE VALUS INTO THE CARD */}
        <div className="Card-Container">
          <div onClick={deckClick} className={`Card`} id="deck"></div>
          {index === -1 ? (
            <div className="blank"></div>
          ) : (
            <div
              onClick={deckCard}
              className={`Card
                          flipped 
                        ${card.selected ? "selected" : ""}`}
              key={card.id}
            >
              <div
                // style={{
                //   color: () => {
                //     if ((card.Suit = "♠️" || "♣️")) {
                //       return "black";
                //     } else if ((card.Suit = "♥️" || "♦️")) {
                //       return "red";
                //     }
                //   },
                // }}
                // className={card.Value}
              >
                {card.Display}
              </div>
              <div className={card.Suit}>{card.Suit}</div>
              {/* <div className="big-suit">{card.Suit}</div> */}
            </div>
          )}
          <div className="ace-container">
            {topCards.map((column, columnIndex) => {
              return (
                <>
                  {column.length === 0 ? (
                    <div
                      className="Card "
                      id="ace"
                      onClick={() => aceClick(columnIndex)}
                    >A</div>
                  ) : (
                    <div
                      onClick={() => aceClick(columnIndex, column.length - 1)}
                      className={`Card
                                            
                                            ${
                                              column[column.length - 1].selected
                                                ? "selected"
                                                : ""
                                            }
                                            `}
                      id="topcards"
                    >
                      <div className={column[column.length - 1].Value}>
                        {column[column.length - 1].Display}
                      </div>
                      <div className={column[column.length - 1].Suit}>
                        {column[column.length - 1].Suit}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="Total">
          {
            // A 2D array requires two maps, first to go across the column, second against the row.
            // Then iterate through each column and row on that column
            dealtCards.map((column, columnIndex) => {
              return (
                <div key={column.id}>
                  {column.length === 0 && (
                    <div
                      className="Card blue"
                      onClick={() => kingsColumn(columnIndex)}
                    ></div>
                  )}
                  {column.map((card, rowIndex) => {
                    return (
                      <div >
                        {/* Checks if Card is flipped and if true prints the cards Suit and Value */}
                        {card.flipped ? (
                          <div onClick={() => selected(columnIndex, rowIndex)}>
                            {/* Checks the card's colour, if re, prints Hearts and Diamonds, if false, prints clubs and spades */}
                            {card.Colour === "red" ? (
                              <div
                                className={`Card
                                            flipped
                                            ${card.selected ? "selected" : ""}
                                            `}
                                style={{ top: `${rowIndex * -100}px` }}
                              >
                                <div className={card.Display}>{card.Display}</div>
                                <div className={card.Suit}>{card.Suit}</div>
                                {/* <div className="big-suit">{card.Suit}</div> */}
                              </div>
                            ) : (
                              <div
                                className={`Card
                                            flipped
                                            ${card.selected ? "selected" : ""}
                                            `}
                                style={{ top: `${rowIndex * -100}px` }}
                              >
                                <div className={card.Display}>{card.Display}</div>
                                <div className={card.Suit}>{card.Suit}</div>
                                {/* <div className="big-suit">{card.Suit}</div> */}
                              </div>
                            )}
                            {/* This could be a place we add a conditional statement i.e --- it dealtCards[rowIndex.length === 0 return an empty array that only accepts (card.Suit) === 13] The class name will have to have card dimensions but different background */}
                          </div>
                        ) : (
                          // If it's not flipped the notFlipped clasname is used and the values and suit is hudden
                          <div
                            className={` Card ${
                              card.flipped ? "flipped" : "not-flipped"
                            }`}
                            style={{ top: `${rowIndex * -100}px` }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Cards;
