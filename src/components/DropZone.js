import { React, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DropZone = ({x, y, game, cells, ships, setCells, children}) => {


  useEffect(()=>{
    console.log("useEffectCells", cells);
  },[cells])
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
      const targetShip = ships.find(ship => ship.name === shipName);
      return targetShip;
    }

    const cellsShipCovers = (shipName) => {
      const ship = findShipByName(shipName);
      const shipLength = ship.size;
      const newCells = [...cells];
    
      const targetCells = [];
      for (let i=0; i<shipLength; i++){
        let nextCell = newCells.find(cell => cell.xCoordinate === x+i && cell.yCoordinate === y);
        targetCells.push(nextCell);
      }
      return targetCells;
    }

    const updateCells = (shipName) => {
      const ship = findShipByName(shipName);
      const newCells = [...cells];
      console.log(cells);
      console.log(newCells);

      for(let cell of newCells){
        if (cell.ship === ship){
          cell.ship = null;
        }
      }
      const targetCells = cellsShipCovers(shipName);
      for(let targetCell of targetCells){
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
      console.log("setCellsShip", cells);
      const ship = findShipByName(shipName);
      game.moveShip(ship,x,y);
      updateCells(shipName);
    }

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.SHIP,
          // drop: (item) => game.moveShip(item.shipId,x, y),
          drop: (item) => setCellsShip(item.shipName),
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
