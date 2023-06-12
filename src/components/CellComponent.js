import { useState } from 'react';
import { useDrop } from 'react-dnd';

const CellComponent = ({handleShipPlacement}) => {
  const [ship, setShip] = useState(null);

  const handleDrop = (droppedShip) => {
    setShip(droppedShip);
    droppedShip.placed = true; //added
    handleShipPlacement();
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'ship',
    drop: (item) => {
      const droppedShip = item.ship;
      handleDrop(droppedShip);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className={`cell ${isOver ? 'highlight' : ''}`} ref={drop}>
      {ship && <div className="ship">{ship.id}</div>}
    </div>
  );
};

export default CellComponent;
