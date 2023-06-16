import "../CSS/Cell.css";
import useSound from 'use-sound';
import soundFile from '../sounds/bomb.mp3';

const Cell = ({ cell, handleTurn, handleComputerTurn }) => {

  const [play, {stop}] = useSound(soundFile);

  const showShip = () => {
    if (cell.ship !== null) {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = () => {
    handleTurn(cell);
    handleComputerTurn();
  };

  const classNameStatus = () => {
    if (cell.hasBeenHit) {
      if (cell.ship !== null) {
        play();
        return "cell_successful_hit";
      } else {
        return "cell_hit";
      }
    } else {
      return "cell";
    }
  };

  const hideShips = () => {
    if(cell.id >= 64){
      return "hidden_ships";
    }
  }

  return (
    <>
    <div className={classNameStatus()} onClick={handleClick} onPlay={play}>
      <p className={hideShips()}>{showShip() ? cell.ship.id : null}</p>
    </div>
    </>
  );
};

export default Cell;