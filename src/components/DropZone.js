import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';


const DropZone = ({x, y, game, children}) => {


    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.SHIP,
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
