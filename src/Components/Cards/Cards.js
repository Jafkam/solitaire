import React from "react";
import "./cards.css";

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
      newGame,
    } = this.props;

    return (
      <div className="containers">
        <div className="game" onClick={newGame}>
          New Game
        </div>
        <div className="cardContainer">
          <div onClick={deckClick} className={`card`} id="deck"></div>
          {index === -1 ? (
            <div className="blank"></div>
          ) : (
            <div
              onClick={deckCard}
              className={`card
                          flipped 
                        ${card.selected ? "selected" : ""}`}
              key={card.id}
            >
              <div>{card.Display}</div>
              <div className={card.Suit}>{card.Suit}</div>
            </div>
          )}
          <div className="aceContainer">
            {topCards.map((column, columnIndex) => {
              return (
                <>
                  {column.length === 0 ? (
                    <div
                      className="card "
                      id="ace"
                      onClick={() => aceClick(columnIndex)}
                    >
                      A
                    </div>
                  ) : (
                    <div
                      onClick={() => aceClick(columnIndex, column.length - 1)}
                      className={`card
                                            
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
        <div className="total">
          {
            // A 2D array requires two maps, first to go across the column, second against the row.
            // Then iterate through each column and row on that column
            dealtCards.map((column, columnIndex) => {
              return (
                <div>
                  {column.length === 0 && (
                    <div
                      className="card blue"
                      onClick={() => kingsColumn(columnIndex)}
                    ></div>
                  )}
                  {column.map((card, rowIndex) => {
                    return (
                      <div>
                        {/* Checks if Card is flipped and if true prints the cards Suit and Value */}
                        {card.flipped ? (
                          <div onClick={() => selected(columnIndex, rowIndex)}>
                            {/* Checks the card's colour, if red, prints Hearts and Diamonds, if false, prints clubs and spades */}
                            {card.Colour === "red" ? (
                              <div
                                className={`card
                                            flipped
                                            ${card.selected ? "selected" : ""}
                                            `}
                                style={{ top: `${rowIndex * -100}px` }}
                                key={card.id}
                              >
                                <div className={card.Display}>
                                  {card.Display}
                                </div>
                                <div className={card.Suit}>{card.Suit}</div>
                              </div>
                            ) : (
                              <div
                                className={`card
                                            flipped
                                            ${card.selected ? "selected" : ""}
                                            `}
                                style={{ top: `${rowIndex * -100}px` }}
                                key={card.id}
                              >
                                <div className={card.Display}>
                                  {card.Display}
                                </div>
                                <div className={card.Suit}>{card.Suit}</div>
                              </div>
                            )}
                          </div>
                        ) : (
                          // If it's not flipped the notFlipped clasname is used and the values and suit is hudden
                          <div
                            className={` card ${
                              card.flipped ? "flipped" : "notFlipped"
                            }`}
                            style={{ top: `${rowIndex * -100}px` }}
                            key={card.id}
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
