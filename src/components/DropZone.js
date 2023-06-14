import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import CellComponent from "./CellComponent";
import { json } from 'react-router';

const DropZone = ({x, y, game, children, cellsGridPlayerOne, ships, setCellsGridPlayerOne, gridPlayerOne}) => {

    const findCellIdByCoordinate = (cellx,celly) => {
      if(cellx<0){
        return null;
      }
      const targetCell = cellsGridPlayerOne.find(cell => cell.xCoordinate === cellx && cell.yCoordinate === celly);
      return targetCell.id;
    }

    // const [stateCell, setStateCell] = useState(
    //   {
    //     xCoordinate: x,
    //     yCoordinate: y,
    //     hasBeenHit: false,
    //     ship: null,
    //     grid: gridPlayerOne
    //   }
    // )

    const id = findCellIdByCoordinate(x,y);

    // const targetCell = cellsGridPlayerOne.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
    // console.log(targetCell);
    // const id = targetCell.id;

    const [cell, setCell] = useState(id);
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
      
      // const targetCell = cells.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
      const targetShip = findShipById(shipId);
      console.log(targetShip);
      const newCell = {
        id: id,
        xCoordinate: x,
        yCoordinate: y,
        hasBeenHit: false,
        ship: targetShip,
        grid: gridPlayerOne
      }
      console.log(newCell);
      // console.log(targetCell);
      const updatedCells = cells.map((cell) => 
        {return cell.xCoordinate === x && cell.yCoordinate === y ? newCell : cell}
        );
      console.log(updatedCells);
      setCellsGridPlayerOne(updatedCells);
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
