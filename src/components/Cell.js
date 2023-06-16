import { useState } from "react";
import "../CSS/Cell.css";

const Cell = ({cell, handleTurn, handleComputerTurn}) => {

    const showShip = () => {
        if(cell.ship !== null){
            return true;
        } else {
            return false;
        }
    }

    const handleClick =  () => {
        handleTurn(cell)
        // handleComputerTurn();
    }

    const classNameStatus = () => {
        if(cell.hasBeenHit){
            if(cell.ship !== null){
                return "cell_successful_hit"
            } else {
                return "cell_hit"
            }
        } else {
            return "cell"
        }
    }

    return ( 
        <div className={classNameStatus()} onClick={handleClick}>
            <p>{showShip() ? cell.ship.id: null }</p>
            {/* <p>{cell.id}</p> */}
        </div>
     );
}
 
export default Cell;