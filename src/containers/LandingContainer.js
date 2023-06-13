import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import MultiplayerModal from "../modals/MultiplayerModal";


const LandingContainer = ({multiplayerEnabled, postGame, numberOfUsers}) => {

    const navigate = useNavigate();
    const handleClick = (event) =>{
        if (event.target.value === "single player"){
            postGame(true);
            navigate("/game");
        }
    //     if (event.target.value === "multiplayer"){
    //         multiplayerEnabled();
    //         postGame(true);
    //         navigate("/game");
    //     }
    }
    return (
        <>
            <div>
                <button type="submit" onClick={handleClick} value="single player">SINGLE PLAYER</button>
            </div>
        <MultiplayerModal 
        multiplayerEnabled ={multiplayerEnabled}
        postGame ={postGame}
        numberOfUsers ={numberOfUsers}
        />
    </>
        
     );
}
export default LandingContainer;