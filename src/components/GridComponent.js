import { useEffect, useState } from 'react';
import Ship from './Ship';
import DropZone from './DropZone';

const GridComponent = ({cells, ships, game, setShips}) => {

    const [cellsCovered, setCellsCovered] = useState([]);
    const [shipPositions, setShipPositions] = useState(game.shipPositions);
    const [selectedShip, setSelectedShip] = useState(null);
    const [canStart, setCanStart] = useState(false);

    useEffect(() => game.observe(setShipPositions), [game]);
    
    // const getShipByName = (shipName) => {
    //     return ships.find((ship) => ship.name === shipName);
    // };

    const selectShip = (ship) => {
        setSelectedShip(ship);
    }

    const getCellsCoveredByShip = (ship) => {
      const shipsPosition = game.shipPositions[ship.name];
      const x = shipsPosition[0];
      const y = shipsPosition[1];
      const horizontal = ship.horizontal;
      let cellsCovered = [];
      if(horizontal){
        for (i=0; i< ship.size; i++){
          cellsCovered.push([x+i, y]);
        }
      }else{
        for (i=0; i< ship.size; i++){
          cellsCovered.push([x, y+i]);
        }
      }
      return cellsCovered;
    }

    const totalCellsCovered = () => {
      let cellsCovered = [];
      for(let ship in ships){
        cellsCovered.push(getCellsCoveredByShip(ship));
      }
      return [... new Set(cellsCovered)];
    }

    const checkCanStart = () =>{
      return totalCellsCovered().length === 17;
    }

    const canRotate = (ship) => {
        const shipsPosition = game.shipPositions[ship.name];
        const x = shipsPosition[0];
        const y = shipsPosition[1];
        if (ship.horizontal){
            if(y <= 8 - ship.size){
                return true;
            } 
            return false;
        } else {
            if(x <= 8 - ship.size){
                return true;
            } 
            return false;
        }
    }

    const rotateShip = () => {
        if (selectedShip && canRotate(selectedShip)) {
            const shipToRotate = ships.find((ship) => ship.id === selectedShip.id);
            const shipIndex = ships.indexOf(shipToRotate);
            const updatedShips = [...ships];
            updatedShips[shipIndex].horizontal = !updatedShips[shipIndex].horizontal;
            setShips(updatedShips);
        }
    };    

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
              {shipName && <Ship shipName={shipName} ship={ship} selectShip={selectShip}/>}
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
                <DropZone x={x} y={y} game={game} ships={ships}>
                    {shipName && <Ship shipName={shipName} ship={ship} selectShip={selectShip}/>}
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
            <button className="rotate" onClick={rotateShip}>ROTATE</button>
            {otherSquares}
        </div>
        <div className='grid'>
            {squares}
        </div>
        </>
     );
}
 
export default GridComponent;