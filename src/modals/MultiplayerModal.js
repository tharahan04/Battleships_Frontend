import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const MultiplayerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={handleToggleModal}>
        <button type="submit" value="multiplayer button">MULTIPLAYER</button>
      <Modal open={isOpen} onClose={handleToggleModal}>
        <Box className="modal">
          <h2>Select an Option</h2>
          <button type="submit" value="newgame button">New Game</button>
          <button type="submit" value="join exisiting game button" >Join Existing Game</button>
          <button className="x-button" onClick={handleToggleModal}>X</button>
        </Box>
      </Modal>
    </div>
  );
};

export default MultiplayerModal;
