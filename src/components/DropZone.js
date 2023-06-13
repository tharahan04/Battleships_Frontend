import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import CellComponent from "./CellComponent";
import { json } from 'react-router';

const DropZone = ({x, y, game, children, cellsGridPlayerOne, ships, setCellsGridPlayerOne}) => {

    const findCellIdByCoordinate = (x,y) => {
      if(x<0){
        return null;
      }
      const targetCell = cellsGridPlayerOne.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
      return targetCell.id;
    }

    const id = findCellIdByCoordinate(x,y);

    const targetCell = cellsGridPlayerOne.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
    
    const [cellId, setCellID] = useState(id);
    const [cellPosition, setCellPosition] = useState(x < 0 ? null : 8*y +x)
    const [ship, setShip] = useState(null);


    const findShipById = (shipId) => {
      const shipIdNumber = parseInt(shipId.slice(-1));
      const targetShip = ships.find(ship => ship.id === shipIdNumber);
      return targetShip;
    }

    // const updateCells = async (shipId) =>{
    //   console.log(targetCell);
    //   const response = await fetch(`http://localhost:8080/cells/${targetCell.id}`,
    //   {
    //     method: "PATCH",
    //     headers: {"Content-Type":"application/json"},
    //     body: JSON.stringify(ship)
    //   });
    //   const data = await response.json();
    //   // setCell(data);
    //   console.log(data);
    // }

    const updateCells = (shipId) => {
      const cells = [...cellsGridPlayerOne];
      // console.log(cells);
      const targetCell = cells.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
      const targetShip = findShipById(shipId);
      console.log(targetShip);
      console.log(targetCell);
      // const updatedCells = cells.map(cell => cell.id === cellId ? targetCell : cell);
      // setCellsGridPlayerOne(updatedCells);
    }

    const setCellsShip = (shipId) => {
      const thisShip = findShipById(shipId);
      game.moveShip(shipId,x,y);
      setShip(thisShip);
      updateCells(shipId);
    }

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.SHIP,
          // drop: (item) => game.moveShip(item.shipId,x, y),
          drop: (item) => setCellsShip(item.shipId),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
          }),
        }),
        [game, x, y],
      )

    return (
        <div className={`dropzone ${isOver ? 'highlight' : ''}`} ref={drop}>
            {children}
        </div> 
    );

}
 
export default DropZone;
