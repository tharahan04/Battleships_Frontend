import { ItemTypes } from "./ItemTypes";
import { useDrag } from "react-dnd";

const Ship = () => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
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
        <div className={`ship ${isDragging ? "dragging" : ""}`} ref={drag}> </div>
     );
}
 
export default Ship;