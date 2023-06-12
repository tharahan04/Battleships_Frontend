import { useDrag } from "react-dnd";

const ShipComponent = () => {

    const[{ isDragging } , drag] = useDrag({
        type: "ship",
        item: {
          ship: {
            id: 1, 
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