export class Game {

    shipPositions = {
      ship1: [-1, 0],
      ship2: [-1, 1],
      ship3: [-1, 2],
      ship4: [-1, 3],
      ship5: [-1, 4]
    };
    

    // shipPositions = {};

    // constructor(shipsPlayerOne) {
    //   shipsPlayerOne.forEach((ship, index) => {
    //   this.shipPositions[ship.name] = [-1, index];
    //   });
    // }

    observers = []
    observe(o) {
      this.observers.push(o)
      this.emitChange()
      return () => {
        this.observers = this.observers.filter((t) => t !== o)
      }
    }

    moveShip(shipId, toX, toY) {
      this.shipPositions = {
        ...this.shipPositions,
        [shipId]: [toX, toY]
      };
      this.emitChange()
    }
    // canMoveKnight(toX, toY) {
    //   const [x, y] = this.knightPosition
    //   const dx = toX - x
    //   const dy = toY - y
    //   return (
    //     (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    //     (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    //   )
    // }
    emitChange() {
      const positions = this.shipPositions;
      this.observers.forEach((o) => o && o(positions));
    }
  }
  