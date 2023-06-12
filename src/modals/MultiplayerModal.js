import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import LandingContainer from "../containers/LandingContainer";
import { useNavigate, Navigate } from "react-router";



const MultiplayerModal = () => {
    const [isOpen, setIsopen] = useState(false);

    // const navigate = useNavigate();

    const handleToggleModal= () =>{
        setIsopen(!isOpen);
    };

    // const handleClick = (event)=>{
    //     if(event.target.value === "game page"){
    //         multiplayerEnabled();
    //         postGame(true);
    //         navigate("/game")
    //     }
    // }

    return (
        <div onClick={handleToggleModal}>
            <h2>MULTIPLAYER</h2>
        <Modal open={isOpen} onClose={handleToggleModal}>
            <Box className="modal">
                
            <h2>Select an Option</h2>
            <button>New Game</button>
            <button>Join Existing Game</button>
            <button className="x-button" onClick={handleToggleModal}>X</button>
            </Box>
            </Modal>
        </div>
    )
}

export default MultiplayerModal;