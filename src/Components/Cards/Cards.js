import React from "react";
import "./cards.css";
import "../../containers/app.css";

class Cards extends React.Component {
  // Generates a new cardwhen the deckCard is clicked.
  deckIndex = () => {
    const { index, deckCard, card } = this.props;
    return (
      <React.Fragment>
        {index === -1 ? (
          <div className="empty-array" />
        ) : (
          <div
            onClick={deckCard}
            className={`card pointer ${card.selected ? "selected" : ""}`}
          >
            <div className="card__display">
              <div>{card.display}</div>
              <div className={card.suit} id="block">
                {card.suit}
              </div>
              <div className={card.suit} id="inverted">
                {card.suit}
              </div>
            </div>
            <div className="card__display">
              <div className={card.suit}>{card.suit}</div>
              <div id="inverted">{card.display}</div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  // Generates four empty columns where cards can be added

  topCards = () => {
    const { topCards, aceClick } = this.props;
    return (
      <div className="ace-container">
        {topCards.map((column, columnIndex) => {
          const card = column[column.length - 1];
          return (
            <div key={columnIndex}>
              {column.length === 0 ? (
                <div
                  className="card"
                  id="suits"
                  onClick={() => aceClick(columnIndex)}
                >
                  <span className="♥️" role="img" aria-label="Heart">
                    ♥️
                  </span>

                  <span role="img" aria-label="Club">
                    ♣️
                  </span>
                  <span role="img" aria-label="Spade">
                    ♠️
                  </span>
                  <span className="♦️" role="img" aria-label="Diamond">
                    ♦️
                  </span>
                </div>
              ) : (
                <div
                  onClick={() => aceClick(columnIndex, column.length - 1)}
                  className={`card pointer
                  ${card.selected ? "selected" : ""}`}
                >
                  <div className="card__display">
                    <div>{card.display}</div>
                    <div className={card.suit} id="block">
                      {card.suit}
                    </div>
                    <div className={card.suit} id="inverted">
                      {card.suit}
                    </div>
                  </div>
                  <div className="card__display">
                    <div className={card.suit}>{card.suit}</div>
                    <div id="inverted">{card.display}</div>
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
            <div className={`total__height`} key={columnIndex}>
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
                        <div className="card__display">
                          <div>{card.display}</div>
                          <div className={card.suit} id="block">
                            {card.suit}
                          </div>
                          <div className={card.suit} id="inverted">
                            {card.suit}
                          </div>
                        </div>
                        <div className="card__display">
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
        <div className="canvas__containers">
          <div className="canvas__game" onClick={newGame}>
            New Game
          </div>
          <div className="card-container">
            <div onClick={deckClick} className={`card pointer deck`} />
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
