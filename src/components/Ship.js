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


    const shipStyle = ship ? {
        width: `50px`, // Adjust the multiplier as needed
        height: `${50 * ship.size}px`,
        backgroundColor: "blue",
        border: "1px solid #000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "move",
    } : null ;
    

    return ( 
        <div className={`ship ${isDragging ? "dragging" : ""}`} ref={drag} style={shipStyle}> 
            <p>{shipName}</p>
        </div>
     );
}
 
export default Ship;