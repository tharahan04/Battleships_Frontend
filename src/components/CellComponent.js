import { useState } from 'react';
import { useDrop } from 'react-dnd';

const CellComponent = () => {
  const [ship, setShip] = useState(null);

  const handleDrop = (droppedShip) => {
    setShip(droppedShip);
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
