import React from "react";
import "./Cards.css";



class CardFlipped extends React.Component {
    render() {
      const { dealtCards, card, onClick, selected, deckCard } = this.props;
      return (

        {card.Colour === "red" ? (
            <div>
              <div className={card.Value}>{card.Value}</div>
              <div className={card.Suit}>{card.Suit}</div>
            </div>
          ) : (
            <div>
              <div className={card.Value}>{card.Value}</div>
              <div className={card.Suit}>{card.Suit}</div>
            </div>
          )}
      )
          }

          export default Card-Flipped