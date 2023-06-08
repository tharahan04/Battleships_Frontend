import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingContainer from './containers/LandingContainer';
import GameContainer from './containers/GameContainer';
import GridComponent from'./components/GridComponent';
import { useState, useEffect } from 'react';

function App() {

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
        <GameContainer/>
      )
    }
  ])

  const [game, setGame] = useState({}); 
  const [gridPlayerOne, setGridPlayerOne] = useState([]);
  const [gridPlayerTwo, setGridPlayerTwo] = useState([]);
  const [cellsGridPlayerOne, setCellsGridPlayerOne] = useState([]);
  const [cellsGridPlayerTwo, setCellsGridPlayerTwo] = useState([]);

  // const fetchGame = async () =>{
  //   const response = await fetch("http://localhost:8080/games");
  //   const data = await response.json();
  //   setGame(data);
  //   let gridPlayerOne;
  //   data.grids[0].id %2 === 0 ? gridPlayerOne = data.grids[1] : gridPlayerOne = data.grids[0];
  //   setGrid(gridPlayerOne);
  // }
  

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

  // let gridPlayerOne;
  // game.grids[0].id %2 === 0 ? gridPlayerOne = game.grids[1] : gridPlayerOne = game.grids[0];
  // setGrid(gridPlayerOne);

  // useEffect(() => {
  //   console.log("hi");
  // }, [game])

  // useEffect(() => {
  //   let gridPlayerOne;
  //   game.grids[0].id %2 === 0 ? gridPlayerOne = game.grids[1] : gridPlayerOne = game.grids[0];
  //   setGrid(gridPlayerOne);
  // }, [game])

  return (
    <>
    <h1> Hi </h1>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
