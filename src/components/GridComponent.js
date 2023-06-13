import { useEffect, useState } from 'react';
import CellComponent from '../components/CellComponent';
import ShipComponent from './ShipComponent';
import TargetComponent from './TargetComponent';
import Ship from './Ship';

const GridComponent = ({cells, ships, game}) => {

    const [[shipX, shipY], setShipPos] = useState(game.shipPosition)
    
    useEffect(() => game.observe(setShipPos))

    const renderCell = (x, y, [shipX, shipY], cell) => {
        const isShipHere = shipX === x && shipY === y
        const ship = isShipHere ? <Ship /> : null
      
        return <CellComponent game={game} cell={cell}>{ship}</CellComponent>
    }
      

    const[shipPlaced, setShipPlaced] = useState(false);

    const sortedCells = cells.sort((a,b) => a.id - b.id);

    const cellComponents = sortedCells.map((cell) => renderCell(cell.xCoordinate, cell.yCoordinate,[shipX, shipY], cell));

    const filteredShips = ships.filter(ship => ship.placed === false)

    const shipComponents = ships.map((ship) => 
       <ShipComponent key={ship.id} ship={ship} />
        )

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