import { useState } from "react";
import "../CSS/Cell.css";
import {useSound} from "use-sound";
import soundFile from "../sounds/bomb.mp3";

const Cell = ({cell, handleTurn, handleComputerTurn}) => {

  const [play, {stop}] = useSound(soundFile);
  const [played, setPlayed] = useState(false);

  const showShip = () => {
      if(cell.ship !== null){
          return true;
      } else {
          return false;
      }
  }

  const handleClick = async () => {
      await handleTurn(cell);
      await handleComputerTurn();
  }

  const classNameStatus = () => {
      if(cell.hasBeenHit){
          if(cell.ship !== null){
              if(!played){
              play();
              setPlayed(true);
              }
              return "cell_successful_hit"
          } else {
              return "cell_hit"
          }
      } else {
          return "cell"
      }
  }

  const hideShip =() => {
      if (cell.id >= 64){
          return "hidden_ships"
      }
  }

  return ( 
      <div className={classNameStatus()} onClick={handleClick}>
          <p className={hideShip()}>{showShip() ? cell.ship.id: null }</p>
          {/* <p>{cell.id}</p> */}
      </div>
  );
}
 
export default Cell;
