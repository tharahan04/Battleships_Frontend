import { useState } from "react";
import GridComponent from "../components/GridComponent";

const GameContainer = ({gridPlayerOne, gridPlayerTwo, cellsGridPlayerOne, cellsGridPlayerTwo, shipsPlayerOne, shipsPlayerTwo}) => {

    const[newPlayer, setNewPlayer] = useState("");

    const[availableCells, setAvailableCells] = useState([]);
    const[nearbyCells, setNearbyCells] = useState([]);

    const[lastShotShipFirstHit, setLastShotShipFirstHit] = useState([]);
    const[lastShotShipSecondHit, setLastShotShipSecondHit] = useState([]);
    const[switchDirection, setSwitchDirection] = useState([]);
    

    setAvailableCells(cellsGridPlayerOne.filter(cell => cell.xCoordinate + cell.yCoordinate % 2 === 0));

    const handleNameChange = (event) => {
        setNewPlayer(event.target.value);
    }

    const mapShips = () => {
        // map ships here after 
    }

    // const handleComputerTurn = () => {
    //     let targetCell;
    //     if (nearbyCells.length !== 0) {
    //         const random = Math.floor(Math.random() * nearbyCells.length);
    //         targetCell = nearbyCells[random];
    //         setNearbyCells(nearbyCells.splice(random, 1));
    //         handleTurn(targetCell); //patch request we haven't written yet
    //         if (targetCell.ship !== null){
    //             if(targetCell.ship === lastShotShipFirstHit.slice(-1).ship){
    //                 setLastShotShipSecondtHit(lastShotShipSecondtHit.push(targetCell));
    //             } else {
    //                 setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
    //                 setSwitchDirection(switchDirection.push(false)); 
    //             }
    //         }
    //     } else {
    //         const random = Math.floor(Math.random() * availableCells.length);
    //         targetCell = availableCells[random];
    //         setAvailableCells(availableCells.splice(random, 1))
    //         handleTurn(targetCell); //patch request we haven't written yet
    //         if (targetCell.ship !== null){
    //             setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
    //             setNearbyCells(getNearbyCells(targetCell));
    //             setSwitchDirection(switchDirection.push(false)); 
    //         }
    //     }
    //     setAllCells(allCells.filter(cell => cell !== targetCell));
    // }

    const handleComputerTurn = () => {
        let targetCell;
        if(lastShotShipFirstHit.length === 0){
            const random = Math.floor(Math.random() * availableCells.length);
            targetCell = availableCells[random];
            handleTurn(targetCell); //patch request we haven't written yet
            if (targetCell.ship !== null){
                setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
                setSwitchDirection(switchDirection.push(false));
            }                
        } else {
            finishOffShip(lastShotShipFirstHit.slice(-1));
            if (lastShotShipFirstHit.slice(-1).ship.hasSunk){
                setLastShotShipFirstHit(lastShotShipFirstHit.slice(0, -1));
                setLastShotShipSecondHit(lastShotShipSecondHit.slice(0, -1));
                setSwitchDirection(switchDirection.slice(0,-1));
            }
        }
        setAvailableCells(availableCells.filter(cell => cell !== targetCell));
    }

    const finishOffShip = (cell) => {
        let targetCell;
        if(lastShotShipSecondHit.length === 0 || lastShotShipSecondHit.slice(-1).ship != cell.ship){
            getNearbyCells(cell);
            const random = Math.floor(Math.random() * nearbyCells.length);
            targetCell = nearbyCells[random];
            handleTurn(targetCell);
            if(targetCell.ship !== null){
                if(targetCell.ship === cell.ship){
                    setLastShotShipSecondHit(lastShotShipSecondHit.push(targetCell));
                } else {
                    setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
                }
            }
        } else {
            if (!switchDirection.slice(-1)){
                targetCell = getNextCell();
                handleTurn(targetCell);
                if(targetCell.ship === null){
                    setSwitchDirection(switchDirection.slice(0, -1).push(true))
                }
            } else {
                targetCell = getOppositeCell();
                handleTurn(targetCell);
            }
        }
        setAvailableCells(availableCells.filter(cell => cell !== targetCell));
    }


    const getNextCell = () => {
        const x1 = lastShotShipFirstHit.slice(-1).xCoordinate;
        const x2 = lastShotShipSecondHit.slice(-1).xCoordinate;
        const y1 = lastShotShipFirstHit.slice(-1).yCoordinate;
        const y2 = lastShotShipSecondHit.slice(-1).yCoordinate;

        if (x2 - x1 === -1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1 - i, y1)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
        if (x2 - x1 === 1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1 + i, y1)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
        if (y2 - y1 === -1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1, y1 - i)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
        if (y2 - y1 === 1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1, y1 + 1)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
    }

    const getOppositeCell = () => {
        const x1 = lastShotShipFirstHit.slice(-1).xCoordinate;
        const x2 = lastShotShipSecondHit.slice(-1).xCoordinate;
        const y1 = lastShotShipFirstHit.slice(-1).yCoordinate;
        const y2 = lastShotShipSecondHit.slice(-1).yCoordinate;

        if (x2 - x1 === -1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1 + i, y1)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
        if (x2 - x1 === 1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1 - i, y1)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
        if (y2 - y1 === -1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1, y1 + i)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
        if (y2 - y1 === 1){
            for(i = 1; i < 8; i++){
                nextCell = getCellByCoordinate(x1, y1 - 1)
                if(!nextCell.hasBeenHit){
                    return nextCell;
                }
            }
        }
    }


    const getNearbyCells = (cell) => {
        const xCoordinate = cell.xCoordinate;
        const yCoordinate = cell.yCoordinate;
        const upCell = getCellByCoordinate(xCoordinate, yCoordinate - 1);
        const downCell = getCellByCoordinate(xCoordinate, yCoordinate + 1);
        const leftCell = getCellByCoordinate(xCoordinate - 1, yCoordinate);
        const rightCell = getCellByCoordinate(xCoordinate + 1, yCoordinate);
        const newNearbyCells = [upCell, downCell, leftCell, rightCell]; // need to test what happens if any of these are null
        const filteredNearbyCells = newNearbyCells.filter(cell => cell.hasBeenHit === false);
        setNearbyCells(filteredNearbyCells);
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