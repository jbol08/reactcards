import React, { useState } from "react";
import './App.css';

function Card({name,image}) {
    const [{ angle, randomX, randomY }] = useState({
        
     angle: Math.random() * 90 - 45,
     randomX: Math.random() * 40 - 20,
     randomY: Math.random() * 40 - 20,
    });
          
    let transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`

    return (
        <img className='Card'
            style={{ transform }}
            src={image}
            alt={name}
        />
    )
};
export default Card;