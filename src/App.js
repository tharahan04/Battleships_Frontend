import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingContainer from './containers/LandingContainer';
import GameContainer from './containers/GameContainer';
import GridComponent from'./components/GridComponent';

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

  return (
    <>
    <h1> Hi </h1>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
