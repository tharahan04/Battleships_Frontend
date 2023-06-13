import { React, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import "../CSS/DropZone.css";

const CellComponent = ({children, game, cell}) => {
  
  const [ship, setShip] = useState(null);

  const handleDrop = (droppedShip) => {
    setShip(droppedShip);
    droppedShip.placed = true; //added
  };

  // const [{ isOver }, drop] = useDrop({
  //   accept: ItemTypes.SHIP,
  //   drop: (item) => {
  //     const droppedShip = item.ship;
  //     handleDrop(droppedShip);
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.SHIP,
      drop: () => game.moveShip(cell.xCoordinate, cell.yCoordinate),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [game],
  )

  return (
    <section className="cells">
    <div className={`cell ${isOver ? 'highlight' : ''}`} ref={drop}>
      {ship && <div className="ship">{ship.id}</div>}
      {children}
    </div>
    </section>
  );
};

export default CellComponent;
