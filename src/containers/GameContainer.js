import { useState } from "react";
import GridComponent from "../components/GridComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "../components/Game";
import { useMemo } from "react";

const GameContainer = ({gridPlayerOne, gridPlayerTwo, cellsGridPlayerOne, setCellsGridPlayerOne, cellsGridPlayerTwo,shipsPlayerOne, shipsPlayerTwo, singlePlayer, addGridToGame, startGame, setGame}) => {

    const[newPlayer, setNewPlayer] = useState("");

    const[availableCells, setAvailableCells] = useState([]);
    const[nearbyCells, setNearbyCells] = useState([]);

    const[lastShotShipFirstHit, setLastShotShipFirstHit] = useState([]);
    const[lastShotShipSecondHit, setLastShotShipSecondHit] = useState([]);
    const[switchDirection, setSwitchDirection] = useState([]);
    
    // const[hitCellsNotSunk, setHitCellsNotSunk] = useState([]);
    // const[targetCells, setTargetCells] = useState([]);
    // const[targetShip, setTargetShip] = useState({});


    // setAvailableCells(cellsGridPlayerOne.filter(cell => cell.xCoordinate + cell.yCoordinate % 2 === 0));

    // const handleNameChange = (event) => {
    //     setNewPlayer(event.target.value);
    // }

    // const mapShips = () => {
    //     // map ships here after 
    // }

    const handleStartGame = () => {
        if (singlePlayer){
            handleStartGameSinglePlayer();
        }
    }

    const handleStartGameSinglePlayer = () => {
        addGridToGame(gridPlayerOne);
        // setGridPlayerTwo(randomGrid());
        startGame();
    }

    const handleTurn = async (cell) => {
        const response = await fetch(`http://localhost:8080/1?cellId=${cell.id}`, 
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        const game = data.game;
        setGame(game);
    }

    const resetGame = async () => {
        const response = await fetch("http://localhost:8080/games",
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        setGame(data);
    }


    // const handleComputerTurn2 = () =>{
    //     let targetCell;
    //     if (targetCells ===[]){
    //         const random = Math.floor(Math.random() * availableCells.length);
    //         targetCell = availableCells[random];
    //         handleTurn(targetCell);
    //         if (targetCell.ship !== null){
    //             setHitCellsNotSunk([targetCell]);
    //             setTargetCells(getNearbyCells(targetCell));
    //             setTargetShip(targetCell.ship);
    //         }
    //     }else{
    //         const random = Math.floor(Math.random() * targetCells.length);
    //         targetCell = targetCells[random];
    //         handleTurn(targetCell);
    //         if (targetCell.ship !== null){
    //             if(targetCell.ship !== targetShip){
    //                 setHitCellsNotSunk([...hitCellsNotSunk, targetCell]);
    //             } else if(!targetShip.hasSunk){
    //                 setTargetCells(adjacentCells(targetShip))
    //             } else {
    //                 setHitCellsNotSunk(hitCellsNotSunk.filter(cell => cell.ship!== targetShip))
    //                 if(hitCellsNotSunk != []){
    //                     const random = Math.floor(Math.random() * hitCellsNotSunk.length);
    //                     const nextCell = hitCellsNotSunk[random];
    //                     setTargetCells(nearbyCells(nextCell));
    //                     setTargetShip(nextCell.ship);
    //                 }
    //             }
    //         } setTargetCells(targetCells.splice(random,1));
    //     }setAvailableCells(availableCells.filter(cell => !cell.hasBeenHit));
    // }

    // const adjacentCells = (ship) =>{
    //     const listOfCells = hitCellsNotSunk.filter(cell => cell.ship === ship);
    //     const xCoordinates = listOfCells.map(cell => cell.xCoordinate);
    //     const yCoordinates = listOfCells.map(cell => cell.yCoordinate);
    //     let upperCellXcoordinate;
    //     let upperCellYcoordinate;
    //     let lowerCellXcoordinate;
    //     let lowerCellYcoordinate;
    //     if (xCoordinates[0] === xCoordinates[1]){
    //         upperCellYcoordinate = math.max(yCoordinates) +1;
    //         upperCellXcoordinate = xCoordinates[0];
    //         lowerCellYcoordinate = math.min(yCoordinates) -1;
    //         lowerCellXcoordinate = xCoordinates[0];
    //     } else{
    //         upperCellYcoordinate = yCoordinates[0];
    //         upperCellXcoordinate = math.max(xCoordinates) +1;
    //         lowerCellYcoordinate = yCoordinates[0];
    //         lowerCellXcoordinate = math.max(xCoordinates) -1;
    //     }
    //     const upperCell=getCellByCoordinate(upperCellXcoordinate, upperCellYcoordinate);
    //     const lowerCell=getCellByCoordinate(lowerCellXcoordinate, lowerCellYcoordinate);
    //     return([upperCell, lowerCell]);
    // }



    // const handleComputerTurn = () => {
    //     let targetCell;
    //     if(lastShotShipFirstHit.length === 0){
    //         const random = Math.floor(Math.random() * availableCells.length);
    //         targetCell = availableCells[random];
    //         handleTurn(targetCell); //patch request we haven't written yet
    //         if (targetCell.ship !== null){
    //             setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
    //             setSwitchDirection(switchDirection.push(false));
    //         }                
    //     } else {
    //         finishOffShip(lastShotShipFirstHit.slice(-1));
    //         if (lastShotShipFirstHit.slice(-1).ship.hasSunk){
    //             setLastShotShipFirstHit(lastShotShipFirstHit.slice(0, -1));
    //             setLastShotShipSecondHit(lastShotShipSecondHit.slice(0, -1));
    //             setSwitchDirection(switchDirection.slice(0,-1));
    //         }
    //     }
    //     setAvailableCells(availableCells.filter(cell => cell !== targetCell));
    // }

    // const finishOffShip = (cell) => {
    //     let targetCell;
    //     if(lastShotShipSecondHit.length === 0 || lastShotShipSecondHit.slice(-1).ship != cell.ship){
    //         getNearbyCells(cell);
    //         const random = Math.floor(Math.random() * nearbyCells.length);
    //         targetCell = nearbyCells[random];
    //         handleTurn(targetCell);
    //         if(targetCell.ship !== null){
    //             if(targetCell.ship === cell.ship){
    //                 setLastShotShipSecondHit(lastShotShipSecondHit.push(targetCell));
    //             } else {
    //                 setLastShotShipFirstHit(lastShotShipFirstHit.push(targetCell));
    //             }
    //         }
    //     } else {
    //         if (!switchDirection.slice(-1)){
    //             targetCell = getNextCell();
    //             handleTurn(targetCell);
    //             if(targetCell.ship === null){
    //                 setSwitchDirection(switchDirection.slice(0, -1).push(true))
    //             }
    //         } else {
    //             targetCell = getOppositeCell();
    //             handleTurn(targetCell);
    //         }
    //     }
    //     setAvailableCells(availableCells.filter(cell => cell !== targetCell));
    // }


    // const getNextCell = () => {
    //     const x1 = lastShotShipFirstHit.slice(-1).xCoordinate;
    //     const x2 = lastShotShipSecondHit.slice(-1).xCoordinate;
    //     const y1 = lastShotShipFirstHit.slice(-1).yCoordinate;
    //     const y2 = lastShotShipSecondHit.slice(-1).yCoordinate;

    //     if (x2 - x1 === -1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1 - i, y1)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    //     if (x2 - x1 === 1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1 + i, y1)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    //     if (y2 - y1 === -1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1, y1 - i)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    //     if (y2 - y1 === 1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1, y1 + 1)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    // }

    // const getOppositeCell = () => {
    //     const x1 = lastShotShipFirstHit.slice(-1).xCoordinate;
    //     const x2 = lastShotShipSecondHit.slice(-1).xCoordinate;
    //     const y1 = lastShotShipFirstHit.slice(-1).yCoordinate;
    //     const y2 = lastShotShipSecondHit.slice(-1).yCoordinate;

    //     if (x2 - x1 === -1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1 + i, y1)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    //     if (x2 - x1 === 1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1 - i, y1)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    //     if (y2 - y1 === -1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1, y1 + i)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    //     if (y2 - y1 === 1){
    //         for(i = 1; i < 8; i++){
    //             nextCell = getCellByCoordinate(x1, y1 - 1)
    //             if(!nextCell.hasBeenHit){
    //                 return nextCell;
    //             }
    //         }
    //     }
    // }


    // const getNearbyCells = (cell) => {
    //     const xCoordinate = cell.xCoordinate;
    //     const yCoordinate = cell.yCoordinate;
    //     const upCell = getCellByCoordinate(xCoordinate, yCoordinate - 1);
    //     const downCell = getCellByCoordinate(xCoordinate, yCoordinate + 1);
    //     const leftCell = getCellByCoordinate(xCoordinate - 1, yCoordinate);
    //     const rightCell = getCellByCoordinate(xCoordinate + 1, yCoordinate);
    //     const nearbyCells = [upCell, downCell, leftCell, rightCell]; // need to test what happens if any of these are null
    //     const filteredNearbyCells = nearbyCells.filter(cell => !cell.hasBeenHit);
    //     setNearbyCells(filteredNearbyCells);
    // }

    // const getCellByCoordinate = (xCoordinate, yCoordinate) => {
    //     if(xCoordinate >= 0 && xCoordinate <= 7 && yCoordinate>= 0 && yCoordinate <= 7){
    //         return availableCells.filter(cell => cell.xCoordinate === xCoordinate && cell.yCoordinate === yCoordinate)[0];
    //     }
    // }

    

    const game = useMemo(() => new Game(), []);

    return ( 
        <>
            <h2> SET UP GRID </h2>
            <h4> Drag & Drop the ships on to the map </h4>

            {/* {mapShips} */}
            {/* <input type="text" placeholder="Enter user name" value={newPlayer} onChange={handleNameChange} /> */}
            <div className="setupGrid">
            <DndProvider backend={HTML5Backend}>
                <GridComponent 
                gridPlayerOne={gridPlayerOne} 
                cells={cellsGridPlayerOne} 
                ships={shipsPlayerOne} 
                cellsGridPlayerOne={cellsGridPlayerOne}
                setCellsGridPlayerOne={setCellsGridPlayerOne}
                game={game}
                />
                
                 {/* <GridComponent 
                gridPlayerOne={gridPlayerTwo} 
                cells={cellsGridPlayerTwo} 
                ships={shipsPlayerTwo}
                cellsGridPlayerOne={cellsGridPlayerOne}
                game={game}
                /> */}
            </DndProvider>
            </div>
            {/* <button type="submit">START</button> */}
        </>
     );
}
 
export default GameContainer;