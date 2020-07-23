import React from "react";
import "./cards.css";
import "../../containers/app.css";

class Cards extends React.Component {
  deckIndex = () => {
    const { index, deckCard, card } = this.props;
    return (
      <div>
        {index === -1 ? (
          <div className="empty-array"></div>
        ) : (
          <div
            onClick={deckCard}
            className={`card pointer ${card.selected ? "selected" : ""}`}
          >
            <div className="card-display">
              <div>{card.display}</div>
              <div className={card.suit} id="inverted">
                {card.suit}
              </div>
            </div>
            <div className="card-display">
              <div className={card.suit}>{card.suit}</div>
              <div id="inverted">{card.display}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  topCards = () => {
    const { topCards, aceClick } = this.props;
    return (
      <div className="ace-container">
        {topCards.map((column, columnIndex) => {
          const lastCard = column[column.length - 1];
          return (
            <div key={columnIndex}>
              {column.length === 0 ? (
                <div
                  className="card"
                  id="ace"
                  onClick={() => aceClick(columnIndex)}
                ></div>
              ) : (
                <div
                  onClick={() => aceClick(columnIndex, column.length - 1)}
                  className={`card pointer
                  ${lastCard.selected ? "selected" : ""}`}
                >
                  <div className="card-display">
                    <div>{lastCard.display}</div>
                    <div className={lastCard.suit} id="inverted">
                      {lastCard.suit}
                    </div>
                  </div>
                  <div className="card-display">
                    <div className={lastCard.suit}>{lastCard.suit}</div>
                    <div id="inverted">{lastCard.display}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  //  2D array maps throught the 2D dealtCards array to display the cards

  dealtCards = () => {
    const { dealtCards, kingsColumn, selected } = this.props;
    return (
      <div className="total">
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
                    className="position"
                    style={{ top: `${rowIndex * -110}px` }}
                  >
                    {/* Checks if Card is flipped and if true prints the cards Suit and Value */}
                    {card.flipped ? (
                      <div
                        className={`card pointer ${
                          card.selected ? "selected" : ""
                        }`}
                        onClick={() => selected(columnIndex, rowIndex)}
                      >
                        <div className="card-display">
                          <div>{card.display}</div>
                          <div className={card.suit} id="inverted">
                            {card.suit}
                          </div>
                        </div>
                        <div className="card-display">
                          <div className={card.suit}>{card.suit}</div>
                          <div id="inverted">{card.display}</div>
                        </div>
                      </div>
                    ) : (
                      // If it's not flipped the notFlipped clasname is used and the values and suit is hidden
                      <div className="card not-flipped"></div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { deckClick, newGame } = this.props;

    return (
      <div className="canvas">
        <div className="containers">
          <div className="game" onClick={newGame}>
            New Game
          </div>
          <div className="card-container">
            <div onClick={deckClick} className={`card`} id="deck"></div>
            <div>{this.deckIndex()}</div>
            <div className="ace-container">
              <div>{this.topCards()}</div>
            </div>
          </div>
          <div>{this.dealtCards()}</div>
        </div>
      </div>
    );
  }
}

export default Cards;
