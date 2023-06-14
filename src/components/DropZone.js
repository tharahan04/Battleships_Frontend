import { React, useEffect, useState } from 'react';
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
      // console.log(shipIdNumber);
      // console.log(ships);
      const targetShip = ships.find(ship => ship.id === shipIdNumber);
      // console.log(targetShip);
      return targetShip;
    }


    const cellsShipCovers = (shipId) => {
      const targetShip = findShipById(shipId);
      // console.log(targetShip);
      const shipLength = targetShip.size;
      const cells = [...cellsGridPlayerOne];
      const targetCell = cells.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
      const targetCells = [targetCell];
      let i;
      for (i=1; i<shipLength; i++){
        let nextCell = cells.find(cell => cell.xCoordinate === x+i && cell.yCoordinate === y);
        targetCells.push(nextCell);
      }
      // console.log(targetCells);
      return targetCells;
    }

    const updateCells = (shipId) => {
      const cells = [...cellsGridPlayerOne];
      const targetShip = findShipById(shipId);
      const targetCells = cellsShipCovers(shipId);
      let targetCell;
      for(targetCell of targetCells){
        targetCell.ship = targetShip;
      }
      const targetCellCoordinates = targetCells.map(cell => [cell.xCoordinate, cell.yCoordinate]);
      
      const updatedCells = cells.map((cell) => 
        {
          return targetCellCoordinates.includes([cell.xCoordinate, cell.yCoordinate])  ? targetCells.find(newCell => newCell.xCoordinate===cell.xCoordinate && newCell.yCoordinate===cell.yCoordinate ) : cell}
        );
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
