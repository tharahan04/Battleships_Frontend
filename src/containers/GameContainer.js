import { useState } from "react";
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
}) => {
  const [newPlayer, setNewPlayer] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [availableCells, setAvailableCells] = useState([]);

  const [gameStarted, setGameStarted] = useState(false);
  const [hitCellsNotSunk, setHitCellsNotSunk] = useState([]);
  const [targetCells, setTargetCells] = useState([]);
  const [targetShip, setTargetShip] = useState({});

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
    addGridToGame(gridPlayerOne);
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
    console.log(data);
    return data.cell;
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


  const handleComputerTurn = async () =>{
    let targetCell
    console.log("targetCells", targetCells);
    console.log("availableCellsStart", availableCells);

    if(targetCells.length === 0){
      const random = Math.floor(Math.random() * availableCells.length);

      targetCell = availableCells[random];
      console.log("targetCellBeforeHit",targetCell);
      // let newTargetCell;
      // setTimeout(() => {
      //   newTargetCell = handleTurn(targetCell);
      // }, 1000);
      targetCell = await handleTurn(targetCell);
      console.log("targetCellAfterHit",targetCell);

      if(targetCell.ship !== null){
        setTargetShip(targetCell.ship);
        setTargetCells(getNearbyCells(targetCell));
        setHitCellsNotSunk([...hitCellsNotSunk, targetCell]);
      }
      console.log("end targetCells", targetCells);
    }
    else if(targetCells.length !== 0) {
      console.log("targetCells", targetCells);
      const random = Math.floor(Math.random() * targetCells.length);
      targetCell = targetCells[random];
      targetCell = await handleTurn(targetCell);
      console.log("targetCellAfterHit",targetCell);

      if (targetCell.ship === null){
        let newTargetCells = [...targetCells];
        newTargetCells = newTargetCells.filter(cell => cell.id !== targetCell.id);
        setTargetCells(newTargetCells);
      } 
      else if (targetCell.ship !== targetShip){
        setHitCellsNotSunk([...hitCellsNotSunk, targetCell]);
        let newTargetCells = [...targetCells];
        newTargetCells = newTargetCells.filter((cell) => cell.id !== targetCell.id);
        setTargetCells(newTargetCells);
      }
      else if(!targetCell.ship.hasSunk){
        setHitCellsNotSunk([...hitCellsNotSunk, targetCell]);
        let newTargetCells = adjacentCells(targetShip);
        console.log("adjacentCells", newTargetCells);
        newTargetCells = newTargetCells.filter((cell) => cell.id !== targetCell.id);
        setTargetCells(newTargetCells);
      }
      else{
        let newHitCellsNotSunk = [...hitCellsNotSunk];
        newHitCellsNotSunk.filter((cell) => cell.ship !== targetShip);
        setHitCellsNotSunk(newHitCellsNotSunk);
        if(newHitCellsNotSunk.length != 0){
          const random = Math.floor(Math.random() * hitCellsNotSunk.length);
          const nextCell = hitCellsNotSunk[random];
          setTargetCells(getNearbyCells(nextCell));
          setTargetShip(nextCell.ship);
        }
      }
  }
  let newAvailableCells = [...availableCells];
  newAvailableCells = newAvailableCells.filter(cell => cell.id!==targetCell.id);
  setAvailableCells(newAvailableCells);
}

  const adjacentCells = (ship) => {
    const listOfCells = hitCellsNotSunk.filter((cell) => cell.ship === ship);
    const xCoordinates = listOfCells.map((cell) => cell.xCoordinate);
    const yCoordinates = listOfCells.map((cell) => cell.yCoordinate);
    let upperCellXcoordinate;
    let upperCellYcoordinate;
    let lowerCellXcoordinate;
    let lowerCellYcoordinate;
    if (xCoordinates[0] === xCoordinates[1]) {
      upperCellYcoordinate = Math.max(yCoordinates) + 1;
      upperCellXcoordinate = xCoordinates[0];
      lowerCellYcoordinate = Math.min(yCoordinates) - 1;
      lowerCellXcoordinate = xCoordinates[0];
    } else {
      upperCellYcoordinate = yCoordinates[0];
      upperCellXcoordinate = Math.max(xCoordinates) + 1;
      lowerCellYcoordinate = yCoordinates[0];
      lowerCellXcoordinate = Math.max(xCoordinates) - 1;
    }
    const upperCell = getCellByCoordinate(
      upperCellXcoordinate,
      upperCellYcoordinate
    );
    const lowerCell = getCellByCoordinate(
      lowerCellXcoordinate,
      lowerCellYcoordinate
    );
    console.log("adjacentCells", [upperCell, lowerCell]);
    return [upperCell, lowerCell];
  };


  // const handleComputerTurn =() => {
  //   const random = Math.floor(Math.random() * cellsGridPlayerOne.length);
  //   const targetCell = cellsGridPlayerOne[random];
  //   setTimeout(() => {
  //     handleTurn(targetCell);
  //   }, 1000);
  // };

  const getNearbyCells = (cell) => {
    const xCoordinate = cell.xCoordinate;
    const yCoordinate = cell.yCoordinate;
    const upCell = getCellByCoordinate(xCoordinate, yCoordinate - 1);
    const downCell = getCellByCoordinate(xCoordinate, yCoordinate + 1);
    const leftCell = getCellByCoordinate(xCoordinate - 1, yCoordinate);
    const rightCell = getCellByCoordinate(xCoordinate + 1, yCoordinate);
    let nearCells = [upCell, downCell, leftCell, rightCell]; 
    nearCells = nearCells.filter(cell => cell!== null);
    nearCells = nearCells.filter((cell) => !cell.hasBeenHit);
    console.log("nearbyCells", nearCells);
    return nearCells;
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
    } else return null;
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

  const game = useMemo(() => new Game(shipsPlayerOne), []);

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
    // console.log(cellsFilled.length);
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
                  game={game}
                  setComputerGrid = {setComputerGrid}
                  gridPlayerTwo = {gridPlayerTwo}
                  addGridToGame = {addGridToGame}
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
                  game={game}
                  setComputerGrid = {setComputerGrid}
                  gridPlayerTwo = {gridPlayerTwo}
                  addGridToGame = {addGridToGame}
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
