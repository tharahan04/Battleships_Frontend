import { useState } from "react";
import { useDrag } from "react-dnd";

const ShipComponent = ({ship, shipPlaced}) => {

    const[placed, setPlaced] = useState(false);

    const[{ isDragging } , drag] = useDrag({
        type: "ship",
        item: {
          ship: {
            id : ship.id,
          },
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return ( 
        <div className={`ship ${isDragging ? "dragging" : ""}`} ref={drag}> </div>
     );
}
 
export default ShipComponent;