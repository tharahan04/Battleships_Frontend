import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";


const MultiplayerModal = ({multiplayerEnabled, postGame}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
    if(!isOpen){
        multiplayerEnabled()
    }
  };

  const handleClick = () => {
    postGame(true);
    navigate("/game");
  }

  return (
    <div onClick={handleToggleModal}>
        <button type="submit" value="multiplayer button">MULTIPLAYER</button>
      <Modal open={isOpen} onClose={handleToggleModal}>
        <Box className="modal">
          <h2>Select an Option</h2>
          <button onClick={handleClick} type="submit" value="new game button">New Game</button>
          <button className="x-button" onClick={handleToggleModal}>X</button>
        </Box>
      </Modal>
    </div>
  );
};

export default MultiplayerModal;
