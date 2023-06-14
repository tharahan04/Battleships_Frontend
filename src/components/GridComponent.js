import { useEffect, useState } from 'react';
import Ship from './Ship';
import DropZone from './DropZone';

const GridComponent = ({cells, ships, game}) => {

    const [shipPositions, setShipPositions] = useState(game.shipPositions);
    // const [selectedShip, setSelectedShip] = useState(null);

    useEffect(() => game.observe(setShipPositions), [game]);
    
    // const getShipByName = (shipName) => {
    //     return ships.find((ship) => ship.name === shipName);
    // };

    // const selectShip = (shipName) => {
    //     const ship = getShipByName(shipName);
    //     setSelectedShip(ship);
    // }

    // const rotateShip = () => {
    //     if (selectedShip) {
    //       selectedShip.horizontal = !selectedShip.horizontal;
    //     }
    // };    

    const getShipNameAtPosition = (x, y) => {
        for (const shipName of Object.keys(shipPositions)) {
          const [posX, posY] = shipPositions[shipName];
          if (posX === x && posY === y) {
            return shipName;
          }
        }
        return null;
    };

    const getShipAtPosition = (x, y) => {
        for (const shipName of Object.keys(shipPositions)) {
          const [posX, posY] = shipPositions[shipName];
          if (posX === x && posY === y) {
            return ships.find((ship) => ship.name === shipName); 
          }
        }
        return null;
    };

    const renderDropZone = (i) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const shipName = getShipNameAtPosition(x, y);
        const ship = getShipAtPosition(x, y);
        return (
          <div key={i}>
            <DropZone x={x} y={y} game={game} ships={ships}>
              {shipName && <Ship shipName={shipName} ship={ship}/>}
            </DropZone>
          </div>
        );
    };

    const renderDropZone2 = (i) => {
        const y = i;
        const x = -1;
        const shipName = getShipNameAtPosition(x, y);
        const ship = getShipAtPosition(x, y);
        return(
            <div key={i}>
                <DropZone x={x} y={y} game={game} >
                    {shipName && <Ship shipName={shipName} ship={ship}/>}
                </DropZone>
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
        <div className='shipContainers'>
            <button className="rotate">ROTATE</button>
            {otherSquares}
        </div>
        <div className='grid'>
            {squares}
        </div>
        </>
     );
}
 
export default GridComponent;