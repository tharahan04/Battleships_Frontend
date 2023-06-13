import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import CellComponent from "./CellComponent";

const DropZone = ({x, y, game, children}) => {


    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.SHIP,
          drop: () => game.moveShip(x, y),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
          }),
        }),
        [game],
      )

    return (
        <div className={`dropzone ${isOver ? 'highlight' : ''}`} ref={drop}>
            {/* {ship && <div className="ship">{ship.id}</div>} */}
            {children}
        </div> 
    );

}
 
export default DropZone;