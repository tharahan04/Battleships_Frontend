import { useState } from "react";
import GridComponent from "../components/GridComponent";

const GameContainer = ({gridPlayerOne, gridPlayerTwo, cellsGridPlayerOne, cellsGridPlayerTwo, shipsPlayerOne, shipsPlayerTwo}) => {

    const[newPlayer, setNewPlayer] = useState("");

    const handleNameChange = (event) => {
        setNewPlayer(event.target.value);
    }

    const mapShips = () => {
        // map ships here after 
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