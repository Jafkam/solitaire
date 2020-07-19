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
        <div className="card-container">
          <div onClick={deckClick} className={`card`} id="deck"></div>
          {index === -1 ? (
            <div className="empty-array"></div>
          ) : (
            <div
              onClick={deckCard}
              className={`card
                          flipped 
                        ${card.selected ? "selected" : ""}`}
              key={card.id}
            >
              <div>{card.display}</div>
              <div className={card.suit}>{card.suit}</div>
            </div>
          )}
          <div className="ace-container">
            {topCards.map((column, columnIndex) => {
              return (
                <div key={columnIndex}>
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
                      id="top-cards"
                    >
                      <div className={column[column.length - 1].value}>
                        {column[column.length - 1].display}
                      </div>
                      <div className={column[column.length - 1].suit}>
                        {column[column.length - 1].suit}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="total">
          {/* 2D array maps throught the 2D dealtCards array to display the cards */}
          {dealtCards.map((column, columnIndex) => {
            return (
              <div className={`total-height`} key={columnIndex}>
                {column.length === 0 && (
                  <div
                    className="card blue"
                    onClick={() => kingsColumn(columnIndex)}
                  ></div>
                )}
                {column.map((card, rowIndex) => {
                  return (
                    <div
                      key={rowIndex}
                      onClick={() => selected(columnIndex, rowIndex)}
                      className={` flipped
                                            `}
                      style={{ top: `${rowIndex * -100}px` }}
                    >
                      {/* Checks if Card is flipped and if true prints the cards Suit and Value */}
                      {card.flipped ? (
                        <div>
                          {/* Checks the card's colour, if red, prints Hearts and Diamonds, if false, prints clubs and spades */}
                          {card.colour === "red" ? (
                            <div
                              className={`card ${
                                card.selected ? "selected" : ""
                              }`}
                            >
                              <div className={card.display}>{card.display}</div>
                              <div className={card.suit}>{card.suit}</div>
                            </div>
                          ) : (
                            <div
                              className={`card ${
                                card.selected ? "selected" : ""
                              }`}
                            >
                              <div className={card.display}>{card.display}</div>
                              <div className={card.suit}>{card.suit}</div>
                            </div>
                          )}
                        </div>
                      ) : (
                        // If it's not flipped the notFlipped clasname is used and the values and suit is hudden
                        <div
                          className={` card ${
                            card.flipped ? "flipped" : "not-flipped"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Cards;
