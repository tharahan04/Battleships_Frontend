import { ItemTypes } from "./ItemTypes";
import { useDrag } from "react-dnd";
import "../CSS/Ship.css";

const Ship = ({ shipName, ship, selectShip }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    item: { shipName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDragStart = () => {
    selectShip(ship);
  };

  const shipStyle = {
    // top: `${25 * (ship.size - 1)}px`,
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "move",
    position: "relative",
    width: ship.horizontal ? `${50 * ship.size}px` : "50px",
    height: ship.horizontal ? "50px" : `${50 * ship.size}px`,
  };

  return (
    <div
      className={`ship ${isDragging ? "dragging" : ""}`}
      ref={drag}
      style={shipStyle}
      onDragStart={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <p>{shipName}</p>
    </div>
  );
};

export default Ship;
