import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import CellComponent from "./CellComponent";

const DropZone = ({x, y, game, children, cellsGridPlayerOne, ships}) => {

    const findCellByCoordinate = (x,y) => {
      if(x<0){
        return null;
      }
      const targetCell = cellsGridPlayerOne.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
      return targetCell;
    }

    const [cellId, setCellId] = useState(8*y + x);
    const [ship, setShip] = useState(null);


    const findShipById = (shipId) => {
      const shipIdNumber = parseInt(shipId.slice(-1));
      const targetShip = ships.find(ship => ship.id === shipIdNumber);
      return targetShip;
    }

    const setCellsShip = (shipId) => {
      const thisShip = findShipById(shipId);
      game.moveShip(shipId,x,y);
      setShip(thisShip);
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
