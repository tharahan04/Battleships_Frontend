import { useEffect, useState } from "react";
import GridComponent from "../components/GridComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "../components/Game";
import { useMemo } from "react";
import "../CSS/GameContainer.css";
import CellGrid from "../components/CellGrid";

const GameContainer = ({
  gridPlayerOne,
  setGridPlayerOne,
  gridPlayerTwo,
  setGridPlayerTwo,
  cellsGridPlayerOne,
  setCellsGridPlayerOne,
  cellsGridPlayerTwo,
  setCellsGridPlayerTwo,
  shipsPlayerOne,
  setShipsPlayerOne,
  shipsPlayerTwo,
  setShipsPlayerTwo,
  singlePlayer,
  addGridToGame,
  startGame,
  setGame,
  game,
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [availableCells, setAvailableCells] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);

  const [newPlayer, setNewPlayer] = useState("");
  const [nearbyCells, setNearbyCells] = useState([]);
  const [lastShotShipFirstHit, setLastShotShipFirstHit] = useState([]);
  const [lastShotShipSecondHit, setLastShotShipSecondHit] = useState([]);
  const [switchDirection, setSwitchDirection] = useState([]);
  const [hitCellsNotSunk, setHitCellsNotSunk] = useState([]);
  const [targetCells, setTargetCells] = useState([]);
  const [targetShip, setTargetShip] = useState({});

  // const handleNameChange = (event) => {
  //     setNewPlayer(event.target.value);
  // }

  // const mapShips = () => {
  //     // map ships here after
  // }

  useEffect(() => {
    setGameFinished(!gameFinished);
  }, [game.finished]);
  console.log(game.finished);

  const handleStartGame = () => {
    if (singlePlayer) {
      handleStartGameSinglePlayer();
    }
    setGameStarted(true);
    const newAvailableCells = cellsGridPlayerOne.filter(
      (cell) => (cell.xCoordinate + cell.yCoordinate) % 2 === 0
    );
    setAvailableCells(newAvailableCells);
  };

  const handleStartGameSinglePlayer = () => {
    setComputerGrid();
    addGridToGame(gridPlayerOne);
    addGridToGame(gridPlayerTwo);
    startGame();
  };

  const handleTurn = async (cell) => {
    const response = await fetch(
      `http://localhost:8080/games/1?cellId=${cell.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    const game = data.game;
    setGame(game);
    setGridPlayerOne(game.grids[0]);
    setGridPlayerTwo(game.grids[1]);
    setCellsGridPlayerOne(game.grids[0].cells);
    setCellsGridPlayerTwo(game.grids[1].cells);
  };

  const resetGame = async () => {
    const response = await fetch("http://localhost:8080/games", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setGame(data);
  };

  //   const handleStartGameButton = () => {
  //     setGameStarted(true);
  //   };

  // const handleComputerTurn = () => {
  //   let targetCell;
  //   console.log("targetCells", targetCells);
  //   if (targetCells.length === 0) {
  //     const random = Math.floor(Math.random() * availableCells.length);
  //     targetCell = availableCells[random];

  //     setTimeout(() => {
  //       handleTurn(targetCell);
  //     }, 1000);

  //     if (targetCell.ship !== null) {
  //       setHitCellsNotSunk([targetCell]);
  //       setTargetCells(getNearbyCells(targetCell));
  //       setTargetShip(targetCell.ship);
  //     }
  //   } else {
  //     const random = Math.floor(Math.random() * targetCells.length);
  //     targetCell = targetCells[random];

  //     setTimeout(() => {
  //       handleTurn(targetCell);
  //     }, 1000);

  //     if (targetCell.ship !== null) {
  //       if (targetCell.ship !== targetShip) {
  //         setHitCellsNotSunk([...hitCellsNotSunk, targetCell]);
  //       } else if (!targetShip.hasSunk) {
  //         console.log("targetCells2", adjacentCells(targetShip))
  //         setTargetCells(adjacentCells(targetShip));
  //       } else {
  //         setHitCellsNotSunk(
  //           hitCellsNotSunk.filter((cell) => cell.ship !== targetShip)
  //         );
  //         if (hitCellsNotSunk != []) {
  //           const random = Math.floor(Math.random() * hitCellsNotSunk.length);
  //           const nextCell = hitCellsNotSunk[random];
  //           console.log("targetCells3", nearbyCells(targetShip))
  //           setTargetCells(nearbyCells(nextCell));
  //           setTargetShip(nextCell.ship);
  //         }
  //       }
  //     }
  //     const newTargetCells = [...targetCells]
  //     newTargetCells.splice(random, 1);
  //     setTargetCells(newTargetCells);
  //   }
  //   setAvailableCells(availableCells.filter((cell) => !cell.hasBeenHit));
  // };

  // const adjacentCells = (ship) => {
  //   const listOfCells = hitCellsNotSunk.filter((cell) => cell.ship === ship);
  //   const xCoordinates = listOfCells.map((cell) => cell.xCoordinate);
  //   const yCoordinates = listOfCells.map((cell) => cell.yCoordinate);
  //   let upperCellXcoordinate;
  //   let upperCellYcoordinate;
  //   let lowerCellXcoordinate;
  //   let lowerCellYcoordinate;
  //   if (xCoordinates[0] === xCoordinates[1]) {
  //     upperCellYcoordinate = Math.max(yCoordinates) + 1;
  //     upperCellXcoordinate = xCoordinates[0];
  //     lowerCellYcoordinate = Math.min(yCoordinates) - 1;
  //     lowerCellXcoordinate = xCoordinates[0];
  //   } else {
  //     upperCellYcoordinate = yCoordinates[0];
  //     upperCellXcoordinate = Math.max(xCoordinates) + 1;
  //     lowerCellYcoordinate = yCoordinates[0];
  //     lowerCellXcoordinate = Math.max(xCoordinates) - 1;
  //   }
  //   const upperCell = getCellByCoordinate(
  //     upperCellXcoordinate,
  //     upperCellYcoordinate
  //   );
  //   const lowerCell = getCellByCoordinate(
  //     lowerCellXcoordinate,
  //     lowerCellYcoordinate
  //   );
  //   return [upperCell, lowerCell];
  // };
  // }

  const handleComputerTurn = () => {
    const random = Math.floor(Math.random() * cellsGridPlayerOne.length);
    const targetCell = cellsGridPlayerOne[random];
    setTimeout(() => {
      handleTurn(targetCell);
    }, 1000);
  };

  // const handleComputerTurn = () => {
  //     let targetCell;
  //     if(lastShotShipFirstHit.length === 0){
  //         const random = Math.floor(Math.random() * availableCells.length);
  //         targetCell = availableCells[random];
  //         setTimeout(() => {
  //           handleTurn(targetCell);
  //         }, 1000);

  //         if (targetCell.ship !== null){
  //             setLastShotShipFirstHit([...lastShotShipFirstHit, targetCell]);
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
  //     const newAvailableCells =[...availableCells];
  //     setAvailableCells(newAvailableCells.filter(cell => cell !== targetCell));
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
  //     const newAvailableCells =[...availableCells];
  //     setAvailableCells(newAvailableCells.filter(cell => cell !== targetCell));
  // }

  // const getNextCell = () => {
  //     const x1 = lastShotShipFirstHit.slice(-1).xCoordinate;
  //     const x2 = lastShotShipSecondHit.slice(-1).xCoordinate;
  //     const y1 = lastShotShipFirstHit.slice(-1).yCoordinate;
  //     const y2 = lastShotShipSecondHit.slice(-1).yCoordinate;

  //     if (x2 - x1 === -1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1 - i, y1)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  //     if (x2 - x1 === 1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1 + i, y1)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  //     if (y2 - y1 === -1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1, y1 - i)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  //     if (y2 - y1 === 1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1, y1 + 1)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  // // }

  // const getOppositeCell = () => {
  //     const x1 = lastShotShipFirstHit.slice(-1).xCoordinate;
  //     const x2 = lastShotShipSecondHit.slice(-1).xCoordinate;
  //     const y1 = lastShotShipFirstHit.slice(-1).yCoordinate;
  //     const y2 = lastShotShipSecondHit.slice(-1).yCoordinate;

  //     if (x2 - x1 === -1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1 + i, y1)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  //     if (x2 - x1 === 1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1 - i, y1)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  //     if (y2 - y1 === -1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1, y1 + i)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  //     if (y2 - y1 === 1){
  //         for(let i = 1; i < 8; i++){
  //             const nextCell = getCellByCoordinate(x1, y1 - 1)
  //             if(!nextCell.hasBeenHit){
  //                 return nextCell;
  //             }
  //         }
  //     }
  // }

  const getNearbyCells = (cell) => {
    const xCoordinate = cell.xCoordinate;
    const yCoordinate = cell.yCoordinate;
    const upCell = getCellByCoordinate(xCoordinate, yCoordinate - 1);
    const downCell = getCellByCoordinate(xCoordinate, yCoordinate + 1);
    const leftCell = getCellByCoordinate(xCoordinate - 1, yCoordinate);
    const rightCell = getCellByCoordinate(xCoordinate + 1, yCoordinate);
    const nearbyCells = [upCell, downCell, leftCell, rightCell];
    console.log("tharahan", nearbyCells);
    const filteredNearbyCells = nearbyCells.filter((cell) => !cell.hasBeenHit);
    setNearbyCells(filteredNearbyCells);
  };

  const getCellByCoordinate = (xCoordinate, yCoordinate) => {
    if (
      xCoordinate >= 0 &&
      xCoordinate <= 7 &&
      yCoordinate >= 0 &&
      yCoordinate <= 7
    ) {
      return cellsGridPlayerOne.find(
        (cell) =>
          cell.xCoordinate === xCoordinate && cell.yCoordinate === yCoordinate
      );
    } else {
      // skip over cell
      return null;
    }
  };

  const getAvailableCellByCoordinate = (xCoordinate, yCoordinate) => {
    if (
      xCoordinate >= 0 &&
      xCoordinate <= 7 &&
      yCoordinate >= 0 &&
      yCoordinate <= 7
    ) {
      return availableCells.find(
        (cell) =>
          cell.xCoordinate === xCoordinate && cell.yCoordinate === yCoordinate
      );
    } else return null;
  };

  const memory = useMemo(() => new Game(shipsPlayerOne), []);

  const rotateShip = (ship) => {
    const shipIndex = shipsPlayerTwo.indexOf(ship);
    const updatedShips = [...shipsPlayerTwo];
    updatedShips[shipIndex].horizontal = !updatedShips[shipIndex].horizontal;
    setShipsPlayerTwo(updatedShips);
  };

  const setComputerGrid = () => {
    const cells = [...cellsGridPlayerTwo];

    for (let ship of shipsPlayerTwo) {
      const random = Math.floor(Math.random() * 2);
      if (random === 0) {
        rotateShip(ship);
      }
    }
    for (let ship of shipsPlayerTwo) {
      if (ship.horizontal) {
        const randomX = Math.floor(Math.random() * (9 - ship.size));
        const randomY = Math.floor(Math.random() * 8);
        for (let i = 0; i < ship.size; i++) {
          const cellToUpdate = cells.find((cell) => {
            return (
              cell.xCoordinate === randomX + i && cell.yCoordinate === randomY
            );
          });
          const cellIndex = cells.indexOf(cellToUpdate);
          cells[cellIndex].ship = ship;
          // setCellsGridPlayerTwo(cells);
        }
      } else {
        const randomX = Math.floor(Math.random() * 8);
        const randomY = Math.floor(Math.random() * (9 - ship.size));
        for (let i = 0; i < ship.size; i++) {
          const cellToUpdate = cells.find((cell) => {
            return (
              cell.xCoordinate === randomX && cell.yCoordinate === randomY + i
            );
          });
          const cellIndex = cells.indexOf(cellToUpdate);
          cells[cellIndex].ship = ship;
          // setCellsGridPlayerTwo(cells);
        }
      }
    }
    const cellsFilled = cells.filter((cell) => cell.ship !== null);
    console.log(cellsFilled.length);
    if (cellsFilled.length !== 17) {
      // cells = [...cellsGridPlayerTwo];
      for (let cell of cellsFilled) {
        cell.ship = null;
      }
      setComputerGrid();
    } else {
      setCellsGridPlayerTwo(cells);
      // addGridToGame(gridPlayerTwo);
    }
  };

  return (
    <>
      {gameStarted ? (
        <div className="game_page">
          <CellGrid
            cells={cellsGridPlayerOne}
            handleTurn={handleTurn}
            handleComputerTurn={handleComputerTurn}
          />
          <CellGrid
            cells={cellsGridPlayerTwo}
            handleTurn={handleTurn}
            handleComputerTurn={handleComputerTurn}
          />
          {gameFinished ? "GAME OVER" : ""}
        </div>
      ) : (
        <>
          <h2> SET UP YOUR SHIPS </h2>
          <h4> Drag & Drop the ships on to the map </h4>

          <div className="setupGrid">
            <DndProvider backend={HTML5Backend}>
              <div className="playerone">
                <GridComponent
                  setDisabled={setDisabled}
                  setShips={setShipsPlayerOne}
                  gridPlayerOne={gridPlayerOne}
                  setGridPlayerOne={setGridPlayerOne}
                  cells={cellsGridPlayerOne}
                  setCells={setCellsGridPlayerOne}
                  ships={shipsPlayerOne}
                  memory={memory}
                />
              </div>

              <div className={!gameStarted ? "playertwonone" : "playertwo"}>
                <GridComponent
                  setDisabled={setDisabled}
                  setShips={setShipsPlayerTwo}
                  grid={gridPlayerTwo}
                  setGrid={setGridPlayerTwo}
                  cells={cellsGridPlayerTwo}
                  setCells={setCellsGridPlayerTwo}
                  ships={shipsPlayerTwo}
                  memory={memory}
                />
              </div>
            </DndProvider>
          </div>
          <button
            type="submit"
            disabled={disabled}
            onClick={handleStartGame}
            id="startbutton"
          >
            START
          </button>
        </>
      )}
    </>
  );
};

export default GameContainer;
