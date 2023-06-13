import { ItemTypes } from "./ItemTypes";
import { useDrag } from "react-dnd";

const Ship = ({shipId}) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
        item: { shipId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    // return ( 
    //     <div ref={drag}>           
    //         <p>Ship</p>
    //     </div>
    //  );

    return ( 
        <div className={`ship ${isDragging ? "dragging" : ""}`} ref={drag}> 
            <p>Ship {shipId}</p>
        </div>
     );
}
 
export default Ship;