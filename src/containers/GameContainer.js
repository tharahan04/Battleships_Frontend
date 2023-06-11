import { useState } from "react";
import GridComponent from "../components/GridComponent";

const GameContainer = ({gridPlayerOne, gridPlayerTwo, cellsGridPlayerOne, cellsGridPlayerTwo, shipsPlayerOne, shipsPlayerTwo}) => {

    const[newPlayer, setNewPlayer] = useState("");

    const[allCells, setAllCells] = useState([cellsGridPlayerOne]);
    const[availableCells, setAvailableCells] = useState([]);
    const[nearbyCells, setNearbyCells] = useState([]);

    const[lastShotShipFirstHit, setLastShotShipFirstHit] = useState([]);
    const[lastShotShipSecondtHit, setLastShotShipSecondtHit] = useState([]);
    const[switchDirection, setSwitchDirection] = useState([]);
    

    setAvailableCells(cellsGridPlayerOne.filter(cell => cell.xCoordinate + cell.yCoordinate % 2 === 0));

    const handleNameChange = (event) => {
        setNewPlayer(event.target.value);
    }

    const mapShips = () => {
        // map ships here after 
    }

    const handleComputerTurn = () => {
        let targetCell;
        if (nearbyCells.length !== 0) {
            const random = Math.floor(Math.random() * nearbyCells.length);
            targetCell = nearbyCells[random];
            setNearbyCells(nearbyCells.splice(random, 1));
            handleTurn(targetCell); //patch request we haven't written yet
            if (targetCell.ship !== null){
                if(targetCell.ship === lastShotShipFirstHit.slice(-1).ship){
                    setLastShotShipSecondtHit(lastShotShipSecondtHit.push(targetCell));
                } else {
                    setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
                }
            }
        } else {
            const random = Math.floor(Math.random() * availableCells.length);
            targetCell = availableCells[random];
            setAvailableCells(availableCells.splice(random, 1))
            handleTurn(targetCell); //patch request we haven't written yet
            if (targetCell.ship !== null){
                setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
                setNearbyCells(getNearbyCells(targetCell)); 
            }
        }
        setAllCells(allCells.filter(cell => cell !== targetCell));
    }

    const getNearbyCells = (cell) => {
        const xCoordinate = cell.xCoordinate;
        const yCoordinate = cell.yCoordinate;
        const upCell = getCellByCoordinate(xCoordinate, yCoordinate - 1);
        const downCell = getCellByCoordinate(xCoordinate, yCoordinate + 1);
        const leftCell = getCellByCoordinate(xCoordinate - 1, yCoordinate);
        const rightCell = getCellByCoordinate(xCoordinate + 1, yCoordinate);
        const newNearbyCells = [upCell, downCell, leftCell, rightCell]; // need to test what happens if any of these are null
        return newNearbyCells;
    }

    const getCellByCoordinate = (xCoordinate, yCoordinate) => {
        if(xCoordinate >= 0 && xCoordinate <= 7 && yCoordinate>= 0 && yCoordinate <= 7){
            return allCells.filter(cell => cell.xCoordinate === xCoordinate && cell.yCoordinate === yCoordinate)[0];
        }
    }
    

    return ( 
        <>
            <h2> SET UP GRID </h2>
            <h4> Drag & Drop the ships on to the map </h4>
            {mapShips}
            <input type="text" placeholder="Enter user name" value={newPlayer} onChange={handleNameChange} />
            <GridComponent 
            gridPlayerOne={gridPlayerOne} 
            cellsGridPlayerOne={cellsGridPlayerOne} 
            shipsPlayerOne={shipsPlayerOne} 
            shipsPlayerTwo={shipsPlayerTwo}
            />
            <button type="submit">START</button>
        </>
     );
}
 
export default GameContainer;