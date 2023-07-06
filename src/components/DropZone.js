import { React } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import "../CSS/DropZone.css";


const DropZone = ({x, y, memory, children, ships}) => {

       

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.SHIP,
          canDrop: (item) => memory.canDropShip(item.shipName, x, y, ships),
          drop: (item) => {
            memory.moveShip(item.shipName,x, y);
          },
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
          }),
        }),
        [memory, x, y],
      )

    return (
        <div className={`dropzone ${isOver ? 'highlight' : ''}`} ref={drop}>
            {children}
        </div> 
    );

}
 
export default DropZone;
