import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const MultiplayerModal = ({multiplayerEnabled, postGame}) => {
  const [isOpen, setIsOpen] = useState(false);
 

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleNewGame = () => {
    multiplayerEnabled();
    postGame(true);
    handleToggleModal();
  }


  return (
    <div onClick={handleToggleModal}>
        <button>MULTIPLAYER</button>
      <Modal open={isOpen} onClose={handleToggleModal}>
        <Box className="modal">
          <h2>Select an Option</h2>
          <button>New Game</button>
          <button>Join Existing Game</button>
          <button className="x-button" onClick={handleToggleModal}>X</button>
        </Box>
      </Modal>
    </div>
  );
};

export default MultiplayerModal;
