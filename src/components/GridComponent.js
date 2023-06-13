import { useEffect, useState } from 'react';
import CellComponent from '../components/CellComponent';
import ShipComponent from './ShipComponent';
import Ship from './Ship';
import DropZone from './DropZone';
import "../CSS/Grid.css";

const GridComponent = ({cells, ships, game}) => {

    const [shipPositions, setShipPositions] = useState(game.shipPositions);
    useEffect(() => game.observe(setShipPositions), [game]);
    

    const getShipIdAtPosition = (x, y) => {
        for (const shipId of Object.keys(shipPositions)) {
          const [posX, posY] = shipPositions[shipId];
          if (posX === x && posY === y) {
            return shipId;
          }
        }
        return null;
    };

    const renderDropZone = (i) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const shipId = getShipIdAtPosition(x, y);
    
        return (
          <div key={i}>
            <DropZone x={x} y={y} game={game}>
              {shipId && <Ship shipId={shipId} />}
            </DropZone>
          </div>
        );
    };

    const renderDropZone2 = (i) => {
        const y = i;
        const x = -1;
        const shipId = getShipIdAtPosition(x, y);
        return(
            <div key={i}>
                <DropZone x={x} y={y} game={game}>{shipId && <Ship shipId={shipId} />}</DropZone>
             </div>
        )
    }

    const squares = [];
    for (let i = 0; i < 64; i += 1) {
      squares.push(renderDropZone(i));
      
    }

    const otherSquares =[]
    for (let i = 0; i < 5; i += 1) {
        otherSquares.push(renderDropZone2(i))
    }
    
    return ( 
        <>
        <div>
            {otherSquares}
        </div>
        <div className='grid'>
            {squares}
        </div>
        </>
     );
}
 
export default GridComponent;