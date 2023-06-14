import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DropZone = ({x, y, game, children, cells, ship, setCells}) => {

    const findCellIdByCoordinate = (cellx,celly) => {
      if(cellx<0){
        return null;
      }
      const targetCell = cells.find(cell => cell.xCoordinate === cellx && cell.yCoordinate === celly);
      return targetCell.id;
    }


    const id = findCellIdByCoordinate(x,y);

    // const targetCell = cells.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
    // console.log(targetCell);
    // const id = targetCell.id;

    const [cell, setCell] = useState(id);
    const [cellPosition, setCellPosition] = useState(x < 0 ? null : 8*y +x)
    
    // const findShipById = (shipId) => {
    //   const shipIdNumber = parseInt(shipId.slice(-1));
    //   // console.log(shipIdNumber);
    //   // console.log(ships);
    //   const targetShip = ships.find(ship => ship.id === shipIdNumber);
    //   // console.log(targetShip);
    //   return targetShip;
    // }


    const cellsShipCovers = () => {
      
      // console.log(targetShip);
      const shipLength = ship.size;
      const newCells = [...cells];
      const targetCell = newCells.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
      const targetCells = [targetCell];
      let i;
      for (i=1; i<shipLength; i++){
        let nextCell = newCells.find(cell => cell.xCoordinate === x+i && cell.yCoordinate === y);
        targetCells.push(nextCell);
      }
      // console.log(targetCells);
      return targetCells;
    }

    const updateCells = () => {
      const newCells = [...cells];
      for(cell of newCells){
        if (cell.ship === ship){
          cell.ship = null;
        }
      }
      const targetShip = ship;
      const targetCells = cellsShipCovers();
      let targetCell;
      for(targetCell of targetCells){
        targetCell.ship = targetShip;
      }
      const targetCellCoordinates = targetCells.map(cell => [cell.xCoordinate, cell.yCoordinate]);
      
      const updatedCells = newCells.map((cell) => 
        {
          return targetCellCoordinates.includes([cell.xCoordinate, cell.yCoordinate])  ? targetCells.find(newCell => newCell.xCoordinate===cell.xCoordinate && newCell.yCoordinate===cell.yCoordinate ) : cell}
        );
      setCells(updatedCells);
    }

    const setCellsShip = () => {
      // const thisShip = findShipById(shipId);
      game.moveShip(ship,x,y);
      updateCells();
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
