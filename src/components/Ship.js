import { ItemTypes } from "./ItemTypes";
import { useDrag } from "react-dnd";
import "../CSS/Ship.css";

import Carrier from "../assets/ShipCarrierHull.png";
import CarrierRotated from "../assets/ShipCarrierHullRotated.png";
import Battleship from "../assets/ShipBattleshipHull.png";
import BattleshipRotated from "../assets/ShipBattleshipHullRotated.png";
import Cruiser from "../assets/ShipCruiserHull.png";
import CruiserRotated from "../assets/ShipCruiserHullRotated.png";
import Submarine from "../assets/ShipSubMarineHull.png";
import SubmarineRotated from "../assets/ShipSubMarineHullRotated.png";
import Destroyer from "../assets/ShipDestroyerHull.png";
import DestroyerRotated from "../assets/ShipDestroyerHullRotated.png";

const Ship = ({shipName, ship, selectShip, rotateShip}) => {

    const shipSprites = {
        Carrier: {
          regular: Carrier,
          rotated: CarrierRotated,
        },
        Battleship: {
          regular: Battleship,
          rotated: BattleshipRotated,
        },
        Cruiser: {
          regular: Cruiser,
          rotated: CruiserRotated,
        },
        Submarine: {
          regular: Submarine,
          rotated: SubmarineRotated,
        },
        Destroyer: {
          regular: Destroyer,
          rotated: DestroyerRotated,
        },
    };
    
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
        item: { shipName },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    }))


    const handleDragStart = () => {
        selectShip(ship); 
    };


    const shipStyle = {
        backgroundImage: `url(${ship.horizontal ? shipSprites[ship.name].rotated : shipSprites[ship.name].regular})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "move",
        position: "relative",
        width: ship.horizontal ? `${50 * ship.size}px` : "50px",
        height: ship.horizontal ? "50px" : `${50 * ship.size}px`,
    };
    

    return ( 
        <div className={`ship ${isDragging ? "dragging" : ""}`} 
        ref={drag} 
        style={shipStyle}
        onDragStart={handleDragStart}
        onTouchStart={handleDragStart}
        > 
            
        </div>
     );
}
 
export default Ship;