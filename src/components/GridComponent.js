import { useState } from 'react';
import CellComponent from '../components/CellComponent';
import ShipComponent from './ShipComponent';
const GridComponent = ({cells, ships}) => {

    const[shipPlaced, setShipPlaced] = useState(false);

    const sortedCells = cells.sort((a,b) => a.id - b.id);

    const handleShipPlacement = () =>{
        setShipPlaced(true);
    }

    const cellComponents = sortedCells.map((cell) => <CellComponent key={cell.id} cell={cell} handleShipPlacement={handleShipPlacement}/>);

    const filteredShips = ships.filter(ship => ship.placed === false)

    const shipComponents = ships.map((ship) => <ShipComponent key={ship.id} ship={ship} />)

    

    return ( 
        <>
        <div>
            {shipComponents}
        </div>
        <div className='grid'>
            
                {cellComponents}
            
        </div>
        </>
     );
}
 
export default GridComponent;