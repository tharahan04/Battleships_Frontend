export class Game {

    shipPosition = [1, 1];

    

    observers = []
    observe(o) {
      this.observers.push(o)
      this.emitChange()
      return () => {
        this.observers = this.observers.filter((t) => t !== o)
      }
    }

    moveShip(toX, toY) {
      this.shipPosition = [toX, toY]
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
      const pos = this.shipPosition
      this.observers.forEach((o) => o && o(pos))
    }
  }
  