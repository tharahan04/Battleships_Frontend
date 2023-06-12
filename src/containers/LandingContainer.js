import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";

const LandingContainer = ({multiplayerEnabled, postGame}) => {

    const navigate = useNavigate();


    const handleClick = (event) =>{
        if (event.target.value === "single player"){
            postGame(true);
            navigate("/game");
        }
        if (event.target.value === "multiplayer"){
            multiplayerEnabled();
            postGame(false);
        }
    }


    return ( 
        <>
            <div>
                <button type="submit" onClick={handleClick} value="single player">SINGLE PLAYER</button>
            </div>
            <button type="submit" onClick={handleClick} value="multiplayer">MULTIPLAYER</button>
        </>
     );
}
 
export default LandingContainer;