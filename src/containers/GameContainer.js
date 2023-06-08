import { useState } from "react";
import GridComponent from "../components/GridComponent";

const GameContainer = () => {

    const[newPlayer, setNewPlayer] = useState("");

    const handleNameChange = (event) => {
        setNewPlayer(event.target.value);
    }

    return ( 
        <>
            <h2> SET UP GRID </h2>
            <input type="text" placeholder="Enter user name" value={newPlayer} onChange={handleNameChange} />
            <GridComponent/>
            <button>START</button>
        </>
     );
}
 
export default GameContainer;