import { useEffect, useState } from 'react';
import CellComponent from '../components/CellComponent';
import ShipComponent from './ShipComponent';
import TargetComponent from './TargetComponent';
import Ship from './Ship';
import DropZone from './DropZone';

const GridComponent = ({cells, ships, game}) => {

    const [[shipX, shipY], setShipPos] = useState(game.shipPosition)
    
    useEffect(() => game.observe(setShipPos))

    // const renderCell = (x, y, [shipX, shipY], cell) => {
    //     const isShipHere = shipX === x && shipY === y
    //     const ship = isShipHere ? <Ship /> : null
      
    //     return <CellComponent game={game} cell={cell}>{ship}</CellComponent>
    // }
      

    // const[shipPlaced, setShipPlaced] = useState(false);

    // const sortedCells = cells.sort((a,b) => a.id - b.id);

    // const cellComponents = sortedCells.map((cell) => renderCell(cell.xCoordinate, cell.yCoordinate,[shipX, shipY], cell));

    // const filteredShips = ships.filter(ship => ship.placed === false)

    const renderDropZone = (i, [shipX, shipY]) => {
        const x = i % 8;
        const y = Math.floor(i/8);
        const isShipHere = shipX === x && shipY === y
        const ship = isShipHere ? <Ship /> : null
        return(
            <div key={i}>
                <DropZone x={x} y={y} game={game}>{ship}</DropZone>
             </div>
        )
    }

    const squares = []
    for (let i = 0; i < 64; i += 1) {
        squares.push(renderDropZone(i,[shipX, shipY]))
    }

    const shipComponents = ships.map((ship) => 
       <ShipComponent key={ship.id} ship={ship} />
    )

    return ( 
        <>
        <div>
            {shipComponents}
        </div>
        <div className='grid'>
            {/* {cellComponents} */}
            {squares}
        </div>
        </>
     );
}
 
export default GridComponent;