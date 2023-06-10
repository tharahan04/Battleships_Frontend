import { useNavigate } from "react-router";

const LandingContainer = ({multiplayerEnabled}) => {

    const navigate = useNavigate()

    const handleClick = (event) =>{
        if (event.target.value === "single player"){
            navigate("/game");
        }
        if (event.target.value === "multiplayer"){
            multiplayerEnabled();
        }
    }

    return ( 
        <>
            <button type="submit" onClick={handleClick} value="single player">SINGLE PLAYER</button>
            <button type="submit" onClick={handleClick} value="multiplayer">MULTIPLAYER</button>
        </>
     );
}
 
export default LandingContainer;