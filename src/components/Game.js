export class Game {

    // shipPositions = {
    //   ship1: [-1, 0],
    //   ship2: [-1, 1],
    //   ship3: [-1, 2],
    //   ship4: [-1, 3],
    //   ship5: [-1, 4]
    // };

    shipPositions = {};

    // shipDirections = {};

    constructor(shipsPlayerOne) {
      shipsPlayerOne.forEach((ship, index) => {
      this.shipPositions[ship.name] = [-1, index];
      // this.shipDirections[ship.name] = true;
      });
    }
    
    observers = []
    observe(o) {
      this.observers.push(o)
      this.emitChange()
      return () => {
        this.observers = this.observers.filter((t) => t !== o)
      }
    }

    moveShip(shipName, toX, toY) {
      this.shipPositions = {
        ...this.shipPositions,
        [shipName]: [toX, toY]
      };
      this.emitChange()
    }

    canDropShip(shipName, toX, toY, ships) {
      const ship = ships.find((ship) => ship.name === shipName);
      if (ship.horizontal) {
        return (toX <= 8 - ship.size && (toY <= 7 && toY >= 0));
      } else {
        return (toY <= 8 - ship.size && (toX <= 7 && toX >= 0))
      }
    }  

    emitChange() {
      const positions = this.shipPositions;
      this.observers.forEach((o) => o && o(positions));
    }
  }
  