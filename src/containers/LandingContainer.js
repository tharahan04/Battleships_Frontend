import { useNavigate } from "react-router";
import MultiplayerModal from "../modals/MultiplayerModal";
import "../CSS/LandingContainer.css";
import battleships from "../assets/battleships.jpeg";

const LandingContainer = ({ multiplayerEnabled, postGame, numberOfUsers, game, joinGame, getGame }) => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    if (event.target.value === "single player") {
      postGame(true);
      navigate("/game");
    }
  };

  return (
    <section className="landing_container">
      <div className="landing_container_buttons">
        <button type="submit" onClick={handleClick} value="single player">SINGLEPLAYER</button>
      <MultiplayerModal
        multiplayerEnabled={multiplayerEnabled}
        postGame={postGame}
        numberOfUsers={numberOfUsers}
        game={game}
        getGame={getGame}
        joinGame={joinGame}
      />
      </div>
      <img src={battleships} alt="battleships"/>
    </section>
  );
};
export default LandingContainer;