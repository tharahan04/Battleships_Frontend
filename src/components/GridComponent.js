import { useEffect, useState } from 'react';
import Ship from './Ship';
import DropZone from './DropZone';
import "../CSS/Grid.css";

const GridComponent = ({cells, setCells, ships, game, setShips, setDisabled, grid, setGrid}) => {

    const [cellsCovered, setCellsCovered] = useState(null);
    const [shipPositions, setShipPositions] = useState(game.shipPositions);
    const [selectedShip, setSelectedShip] = useState(null);
    const [canStart, setCanStart] = useState(false);

    useEffect(() => game.observe(setShipPositions), [game]);
    

    const selectShip = (ship) => {
        setSelectedShip(ship);
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

    const checkGrid = () => {
        const coveredCells = {};
        for (const shipName of Object.keys(shipPositions)) {
            const [posX, posY] = shipPositions[shipName];
            if (posX < 0) {
              alert('you have not put all the ships on the grid >:(');
            }
            const ship = ships.find((ship) => ship.name === shipName);
            const size = ship.size;
            for(let i = 0; i < ship.size; i++){
                if(ship.horizontal){
                    coveredCells[shipName + i] = [posX + i, posY];
                } else {
                    coveredCells[shipName + i] = [posX, posY + i];
                }
            }
        }
        
        const filteredCells = Object.values(coveredCells).filter(
            (value, index, array) =>
              array.findIndex((val) => val[0] === value[0] && val[1] === value[1]) === index
        );
        const filteredCellsSize = Object.keys(filteredCells).length;
        setCellsCovered(coveredCells);
        if(filteredCellsSize === 17){
            setDisabled(false);
            editCells();
        } else {
            alert('ships are overlapping >:(')
            setDisabled(true);
        }
    }

    const editCells = () => {
        const newCells = [...cells];
        for (const shipName of Object.keys(shipPositions)) {
            const [posX, posY] = shipPositions[shipName];
            const ship = ships.find((ship) => ship.name === shipName);
            let cellToUpdate;
            for(let i = 0; i < ship.size; i++){
                if(ship.horizontal){
                    cellToUpdate = newCells.find((cell) => cell.xCoordinate === posX + i && cell.yCoordinate === posY);
                } else {
                    cellToUpdate = newCells.find((cell) => cell.xCoordinate === posX && cell.yCoordinate === posY + i);
                }
                console.log("cells", newCells)
                const cellIndex = newCells.indexOf(cellToUpdate);
                newCells[cellIndex].ship = ship;
                setCells(newCells);
            }
            
        }    
    }


    return ( 
        <>
        <div className='shipContainers'>
            <button className="rotate" onClick={rotateShip}>ROTATE</button>
            </div>
        <div className='ships'>
            {otherSquares}
            <button className="checkGrid" onClick={checkGrid}>CHECK GRID</button>
        </div>
        <div className='grid'>
            {squares}
        </div>
        </>
     );
}
 
export default GridComponent;