import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";


const MultiplayerModal = ({ multiplayerEnabled, postGame, numberOfUsers, singlePlayer, game, joinGame, getGame }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const[multiplayer, setMultiplayer] = useState(false);


  const navigate = useNavigate();

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      multiplayerEnabled();
    }
  };

  useEffect(() => {
    if (numberOfUsers >= 2) {
      setDisabled(false);
    } else{
      setDisabled(true);
    }
  }, [numberOfUsers]);

  const handleClick = () => {
    // setMultiplayer(true)
    postGame(true);
    // socketClient.send("/app/handleTurn", {}, JSON.stringify(true))
    navigate("/game");
  };
  const handleOptionClick = () => {
    joinGame();
    navigate("/game");
  };

// const showMultiplayer = () => {
//   postGame(false);
//   console.log(game);
//   if(game !== null){
   
//   }
// }

// useEffect(() => {
//   if (game.grids !== null){
//   setMultiplayer(true)
//   }
// }, [game])

  return (
    <div>
      <button type="submit" value="multiplayer button" onClick={handleToggleModal}>
        MULTIPLAYER
      </button>
      <Modal open={isOpen} >
        <Box className="modal">
          <h2>Select an Option</h2>
        {!multiplayer ? 
          <button
            disabled={disabled}
            onClick={handleClick}
            type="submit"
            value="new game button"
          >
            New Game
          </button>
          : 
          <>
          <button onClick={handleOptionClick}> Join </button>
          <select>
            <option disabled-value="select game" >
              Select Game
            </option>
            <option key={game} value={game}> Game </option>
          </select>
          </>
        }
          <button className="x-button" onClick={handleToggleModal}>
            X
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default MultiplayerModal;
