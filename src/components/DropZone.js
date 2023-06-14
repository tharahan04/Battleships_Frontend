import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';


const DropZone = ({x, y, game, children, ships, cell, cells, setCells}) => {


//  console.log(cell);

console.log(cells);
       

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.SHIP,
          canDrop: (item) => game.canDropShip(item.shipName, x, y, ships),
          drop: (item) => {
            game.moveShip(item.shipName,x, y);
          },
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
