import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingContainer from "./containers/LandingContainer";
import GameContainer from "./containers/GameContainer";
import { useState, useEffect } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

function App() {
  const [game, setGame] = useState({});
  const [gridPlayerOne, setGridPlayerOne] = useState([]);
  const [gridPlayerTwo, setGridPlayerTwo] = useState([]);
  const [cellsGridPlayerOne, setCellsGridPlayerOne] = useState([]);
  const [cellsGridPlayerTwo, setCellsGridPlayerTwo] = useState([]);
  const [shipsPlayerOne, setShipsPlayerOne] = useState([]);
  const [shipsPlayerTwo, setShipsPlayerTwo] = useState([]);
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [connectToMultiplayer, setConnectToMultiplayer] = useState(false);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  let socketClient = null;

  useEffect(() => {
    const fetchShips = async () => {
      const response = await fetch("http://localhost:8080/ships");
      const data = await response.json();
      console.log(data);
      const dataPlayerOne = data.filter((ship) => ship.playerOne);
      const dataPlayerTwo = data.filter((ship) => !ship.playerOne);
      setShipsPlayerOne(dataPlayerOne);
      setShipsPlayerTwo(dataPlayerTwo);
    };
    fetchShips();
  }, []);

  const postGame = async (isSinglePlayer) => {
    const response = await fetch(
      `http://localhost:8080/games?isSinglePlayer=${isSinglePlayer}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    // const data = await response.json();
    const updatedGame = await fetch(`http://localhost:8080/games`);
    const updatedData = await updatedGame.json();
    setGame(updatedData);
    let gridOddNumber;
    let gridEvenNumber;
    updatedData.grids[0].id % 2 === 0
      ? (gridOddNumber = updatedData.grids[1])
      : (gridOddNumber = updatedData.grids[0]);
    updatedData.grids[0].id % 2 === 0
      ? (gridEvenNumber = updatedData.grids[0])
      : (gridEvenNumber = updatedData.grids[1]);
    setGridPlayerOne(gridOddNumber);
    setGridPlayerTwo(gridEvenNumber);
    setCellsGridPlayerOne(gridOddNumber.cells);
    setCellsGridPlayerTwo(gridEvenNumber.cells);
    setSinglePlayer(updatedData.singlePlayer);
  };

  const addGridToGame = async (grid) => {
    const response = await fetch(`http://localhost:8080/games`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(grid),
    });
    const data = await response.json();
    setGame(data);
  };

  const startGame = async () => {
    const response = await fetch(`http://localhost:8080/games`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setGame(data);
    setPlayerOne(true)
  };

  const resetGame = async () => {
    const response = await fetch("http://localhost:8080/games", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setGame(data);
  };

  const handleClick = () => {
    resetGame();
  };

  const onConnected = () => {
    setConnectToMultiplayer(true);
    socketClient.subscribe("/topic/game", messageReceived);
    socketClient.send("/app/register-player");
  };

  const messageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    let message = payloadData.body;
    if (typeof message === "number") {
      setNumberOfUsers(message);
    if (numberOfUsers === 1){
      setPlayerOne(game.grids[0])
    }else{
      console.log(game)
      setPlayerTwo(game.grids[1])
    }
    }
    // else to handle the game logic
  };

  const multiplayerEnabled = () => {
    let Sock = new SockJS("http://localhost:8080/multiplayer");
    socketClient = over(Sock);
    socketClient.connect({}, onConnected);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingContainer
          multiplayerEnabled={multiplayerEnabled}
          postGame={postGame}
          numberOfUsers={numberOfUsers}
          singlePlayer={singlePlayer}
          
          game={game}
        />
      ),
    },
    {
      path: "/game",
      element: (
        <GameContainer 
        gridPlayerOne={gridPlayerOne}
        setGridPlayerOne={setGridPlayerOne}
        gridPlayerTwo={gridPlayerTwo}
        setGridPlayerTwo={setCellsGridPlayerTwo}
        cellsGridPlayerOne={cellsGridPlayerOne}
        setCellsGridPlayerOne={setCellsGridPlayerOne}
        cellsGridPlayerTwo={cellsGridPlayerTwo}
        setCellsGridPlayerTwo={setCellsGridPlayerTwo}
        shipsPlayerOne={shipsPlayerOne}
        setShipsPlayerOne={setShipsPlayerOne}
        shipsPlayerTwo={shipsPlayerTwo}
        setShipsPlayerTwo={setShipsPlayerTwo}
        singlePlayer={singlePlayer}
        addGridToGame={addGridToGame}
        startGame={startGame}
        setGame={setGame}
        playerOne={playerOne}
        />
      ),
    },
  ]);

  return (
    <>
      <h1>
        <a href="/" onClick={handleClick}>
          BATTLESHIPS
        </a>
      </h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
