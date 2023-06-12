import CellComponent from '../components/CellComponent';
import ShipComponent from './ShipComponent';
const GridComponent = ({cells, ships}) => {

    const sortedCells = cells.sort((a,b) => a.id - b.id);

    const cellComponents = sortedCells.map((cell) => <CellComponent key={cell.id} cell={cell} />);

    const shipComponents = ships.map((ship) => <ShipComponent key={ship.id} ship={ship}/>)

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