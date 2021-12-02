import React from "react";
import Button from "../Button";

/*
   HET HUIS
   --------
   Bouw het huis en gebruik onSelectRoom bij klikken op een kamer.
*/

export const Mansion = ({ onSelectRoom }) => {
  
  return (
    <div>  
      <Button value="Room 1" onClick={() => onSelectRoom(1)} ></Button>
      <Button value="Room 2" onClick={() => onSelectRoom(2)} ></Button>
      <Button value="Room 3" onClick={() => onSelectRoom(3)} ></Button>
    </div>

  );
};
