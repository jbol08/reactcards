import React, { useEffect, useState, useRef } from "react";
import Card from "./card";
import axios from "axios";
import "./App.css";

let baseURL = 'https://deckofcardsapi.com/api/deck/';

function Deck() {
  const [deck, setDeck] = useState(null);
  const [draw, setDraw] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    async function deckData() {
            let d = await axios.get(`${baseURL}/new/shuffle`);
            setDeck(d.data)
        }
        deckData();
    }, [setDeck]);

  useEffect(() => {
    async function drawCards() {
        let {deck_id} = deck
        let cardsDrawn = await axios.get(`${baseURL}/${deck_id}/draw`);
        if (cardsDrawn.data.remaining === 0) {
            setAutoDraw(false)
            alert('No Cards Remaining.')
        }
    const card = cardsDrawn.data.cards[0];
        setDraw(d => [
          ...d,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image
          }
        ]);
    }
    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await drawCards();
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }        
  }, [autoDraw, setAutoDraw,deck])

  const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto);
  }
  
  const cards = draw.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));


  return (
        <div className="Deck">
          {deck ? (
            <button className="Deck-button" onClick={toggleAutoDraw}>
              {autoDraw ? "STOP" : "KEEP"} DRAWING FOR ME!
            </button>
          ) : null}
          <div className="cardarea">{cards}</div>
        </div>
      );
}

export default Deck;