import Cell from "./Cell";
import "../CSS/CellGrid.css";

const CellGrid = ({cells, handleTurn, handleComputerTurn}) => {

    const sortedCells = cells.sort((a,b) => a.id - b.id);
    
    const cellComponents = sortedCells.map((cell) => <Cell key={cell.id} cell={cell} handleTurn={handleTurn} handleComputerTurn={handleComputerTurn}/>)
    
    return ( 
        <div className="cellGrid">
            {cellComponents}
        </div>
     );
}
 
export default CellGrid;