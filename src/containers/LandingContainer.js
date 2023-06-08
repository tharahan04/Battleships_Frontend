import { useNavigate } from "react-router";

const LandingContainer = () => {

    const navigate = useNavigate()

    const handleClick = (event) =>{
        if (event.target.value === "single player"){
            navigate("/game");
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