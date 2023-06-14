import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DropZone = ({x, y, game, children, cells, ships, setCells}) => {

  // const [cell, setCell] = useState(id);
  const [cellPosition, setCellPosition] = useState(x < 0 ? null : 8*y +x)

    // const findCellIdByCoordinate = (cellx,celly) => {
    //   if(cellx<0){
    //     return null;
    //   }
    //   const targetCell = cells.find(cell => cell.xCoordinate === cellx && cell.yCoordinate === celly);
    //   return targetCell.id;
    // }

    // const id = findCellIdByCoordinate(x,y);

    // const targetCell = cells.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
    // console.log(targetCell);
    // const id = targetCell.id;
    
    const findShipByName = (shipName) => {
      console.log(shipName.shipName);
      const targetShip = ships.find(ship => ship.name === shipName.shipName);
      // console.log(ships[0].name);
      console.log(targetShip);
      return targetShip;
    }

    const cellsShipCovers = (shipName) => {
      const ship = findShipByName(shipName);
      const shipLength = ship.size;
      const newCells = [...cells];
      const targetCell = newCells.find(cell => cell.xCoordinate === x && cell.yCoordinate === y);
      const targetCells = [targetCell];
      let i;
      for (i=1; i<shipLength; i++){
        let nextCell = newCells.find(cell => cell.xCoordinate === x+i && cell.yCoordinate === y);
        targetCells.push(nextCell);
      }
      return targetCells;
    }

    const updateCells = (shipName) => {
      const ship = findShipByName(shipName);
      const newCells = [...cells];
      let cell;
      for(cell of newCells){
        if (cell.ship === ship){
          cell.ship = null;
        }
      }
      const targetCells = cellsShipCovers(shipName);
      console.log(targetCells);
      let targetCell;
      for(targetCell of targetCells){
        targetCell.ship = ship; // problem here
      }
      const targetCellCoordinates = targetCells.map(cell => [cell.xCoordinate, cell.yCoordinate]);
      
      const updatedCells = newCells.map((cell) => 
        {
          return targetCellCoordinates.includes([cell.xCoordinate, cell.yCoordinate])  ? targetCells.find(newCell => newCell.xCoordinate===cell.xCoordinate && newCell.yCoordinate===cell.yCoordinate ) : cell}
        );
      setCells(updatedCells);
    }

    const setCellsShip = (shipName) => {
      const ship = findShipByName(shipName);
      game.moveShip(ship,x,y);
      updateCells(shipName);
    }

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.SHIP,
          // drop: (item) => game.moveShip(item.shipId,x, y),
          drop: (item) => setCellsShip(item),
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
