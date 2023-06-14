import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingContainer from './containers/LandingContainer';
import GameContainer from './containers/GameContainer';
import { useState, useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';


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

  // Stores client data
  let socketClient = null;

  useEffect(() => {
    const fetchShips = async () =>{
      const response = await fetch("http://localhost:8080/ships");
      const data = await response.json();
      const dataPlayerOne = data.filter(ship => ship.playerOne);
      const dataPlayerTwo = data.filter(ship => !ship.playerOne);
      setShipsPlayerOne(dataPlayerOne);
      setShipsPlayerTwo(dataPlayerTwo);
    }
    fetchShips()
  }, [])

  const postGame = async (isSinglePlayer) =>{
    const response = await fetch(`http://localhost:8080/games?isSinglePlayer=${isSinglePlayer}`,
    {
      method: "POST",
      headers: {"Content-Type":"application/json"}
    });
    const data = await response.json();
    const updatedGame = await fetch(`http://localhost:8080/games`);
    const updatedData = await updatedGame.json();
    setGame(updatedData);
    let gridOddNumber;
    let gridEvenNumber;
    updatedData.grids[0].id %2 === 0 ? gridOddNumber = updatedData.grids[1] : gridOddNumber = updatedData.grids[0];
    updatedData.grids[0].id %2 === 0 ? gridEvenNumber = updatedData.grids[0] : gridEvenNumber = updatedData.grids[1];
    setGridPlayerOne(gridOddNumber);
    setGridPlayerTwo(gridEvenNumber);
    setCellsGridPlayerOne(gridOddNumber.cells);
    setCellsGridPlayerTwo(gridEvenNumber.cells);
    setSinglePlayer(updatedData.singlePlayer);
  }

  const addGridToGame = async (grid) => {
    const response = await fetch(`http://localhost:8080/games`,
    {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(grid)
    }
    );
    const data = await response.json();
    setGame(data);
  }

  const startGame = async () => {
    const response = await fetch(`http://localhost:8080/games`,
    {
      method: "PATCH",
      headers: {"Content-Type":"application/json"}
    }
    );
    const data = await response.json();
    setGame(data);
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

  const handleClick = () => {
    resetGame();
  }

  // function to detail what happens when connection happens
  const onConnected = () => {
    // set state to true (maybe not necessary unless we need it for something)
    setConnectToMultiplayer(true);
    // send connection request to server
    socketClient.subscribe('/topic/game', messageReceived);
    socketClient.send('/app/register-player')
  }

  const messageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body)
    let userNumbers = payloadData.body;
    setNumberOfUsers(userNumbers);

// if statement that looks to check if it is an integer 
// numberOfUsers = state
// else to handle the game logic 
  }

  // method is passed down to multiplayer button (so websocket only works when multiplayer is clicked)
  const multiplayerEnabled = () => {
    // websocket connection request to the endpoint in the server
    let Sock = new SockJS('http://localhost:8080/multiplayer');
    // creates a websocket client
    socketClient = over(Sock);
    // creates connection and executes call back function
    socketClient.connect({}, onConnected);
    // socketClient.send() 
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element: (
        <LandingContainer 
        multiplayerEnabled={multiplayerEnabled}
        postGame = {postGame}
        numberOfUsers = {numberOfUsers}
        />
      )
    }, 
    {
      path:"/game",
      element: (
        <GameContainer 
        gridPlayerOne={gridPlayerOne}
        gridPlayerTwo={gridPlayerTwo}
        cellsGridPlayerOne={cellsGridPlayerOne}
        cellsGridPlayerTwo={cellsGridPlayerTwo}
        shipsPlayerOne={shipsPlayerOne}
        setCellsGridPlayerOne={setCellsGridPlayerOne}
        shipsPlayerTwo={shipsPlayerTwo}
        singlePlayer={singlePlayer}
        addGridToGame={addGridToGame}
        startGame={startGame}
        setGame={setGame}
        />
      )
    }
  ])

  return (
    <>
    <h1><a href="/" onClick={handleClick}>BATTLESHIPS</a></h1>
    <RouterProvider router={router}/> 
    </>
  );
}

export default App;
