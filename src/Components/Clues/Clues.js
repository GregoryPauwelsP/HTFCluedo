import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { useSettings } from "../context/useSettings";
import { CluesContext } from '../Main';



/*
   AANWIJZINGEN
   ------------
   Lijst hier de kamers, wapens en verdachten op.
*/



const Clues = () => {
  const clues = useContext(CluesContext)


 


  return (
    <div className="full file">
      <h2>Aanwijzingen</h2>
      <div>
        {clues.map((clue => ( 
          <div className= "clues-item">
          <div>
            <span>{clue.title}</span>
            <span>{clue.type}</span>
            </div>
            <img
            src={process.env.REACT_APP_BASE_URL + clue.image}
            alt={clue.title}
            />
        </div>
        )))}
      </div>
    </div>
  );
};

export default Clues;