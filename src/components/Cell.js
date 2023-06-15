import "../CSS/Cell.css";

const Cell = ({cell, handleTurn}) => {

    const showShip = () => {
        if(cell.ship !== null){
            return true;
        } else {
            return false;
        }
    }

    const handleClick = ()=> {
        handleTurn(cell)
    }

    return ( 
        <div className="cell" onClick={handleClick}>
            <p>{showShip() ? cell.ship.id: null }</p>
            {/* <p>{cell.id}</p> */}
        </div>
     );
}
 
export default Cell;