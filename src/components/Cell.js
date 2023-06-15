import "../CSS/Cell.css";

const Cell = ({ cell, handleTurn, handleComputerTurn }) => {
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
      return "hidden_ships"
    }
    return"Tharahan"
  }


  return (
    <div className={classNameStatus()} onClick={handleClick}>
      <p className={hideShips()}>{showShip() ? cell.ship.id : null}</p>
    </div>
  );
};

export default Cell;
