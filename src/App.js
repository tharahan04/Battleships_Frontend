import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingContainer from './containers/LandingContainer';
import GameContainer from './containers/GameContainer';
import GridComponent from'./components/GridComponent';
import { useState, useEffect } from 'react';

function App() {

  const [game, setGame] = useState({}); 
  const [gridPlayerOne, setGridPlayerOne] = useState([]);
  const [gridPlayerTwo, setGridPlayerTwo] = useState([]);
  const [cellsGridPlayerOne, setCellsGridPlayerOne] = useState([]);
  const [cellsGridPlayerTwo, setCellsGridPlayerTwo] = useState([]);
  const [shipsPlayerOne, setShipsPlayerOne] = useState([]);
  const [shipsPlayerTwo, setShipsPlayerTwo] = useState([]);

  const router = createBrowserRouter([
    {
      path:"/",
      element: (
        <LandingContainer/>
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
        shipsPlayerTwo={shipsPlayerTwo}
        />
      )
    }
  ])

  useEffect(() => {
    const fetchGame = async () =>{
      const response = await fetch("http://localhost:8080/games");
      const data = await response.json();
      setGame(data);
      let gridOddNumber;
      let gridEvenNumber;
      data.grids[0].id %2 === 0 ? gridOddNumber = data.grids[1] : gridOddNumber = data.grids[0];
      data.grids[0].id %2 === 0 ? gridEvenNumber = data.grids[0] : gridEvenNumber = data.grids[1];
      setGridPlayerOne(gridOddNumber);
      setGridPlayerTwo(gridEvenNumber);
      setCellsGridPlayerOne(gridOddNumber.cells);
      setCellsGridPlayerTwo(gridEvenNumber.cells);
    }
    fetchGame()
  }, [])

  return (
    <>
    <h1><a href="/">BATTLESHIPS</a></h1>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
