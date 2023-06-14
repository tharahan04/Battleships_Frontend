import { ItemTypes } from "./ItemTypes";
import { useDrag } from "react-dnd";

const Ship = ({ship}) => {

    const shipName = ship.name;

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
        item: { shipName },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))



    const shipStyle = {
        top: `${25 * (ship.size - 1)}px`, // Adjust the multiplier as needed
        backgroundColor: "blue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "move",
        position: "relative", // Add position:relative to the ship
        width: "50px",
        height: `${50 * ship.size}px`,
      };
    

    return ( 
        <div className={`ship ${isDragging ? "dragging" : ""}`} ref={drag} style={shipStyle}> 
            <p>{shipName}</p>
        </div>
     );
}
 
export default Ship;