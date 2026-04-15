import { Ship } from './ship.js'

export const Gameboard = function() {
    const grid = [];
    for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
            row.push(null);
        }
        grid.push(row);
    }

    return {
      grid: grid,
      missedAttacks: [],
      successfulAttacks: [],
      ships: [],

      placeShip: function (length, row, col) {
        const newShip = Ship(length);
        for (let i = 0; i < length; i++) {
          this.grid[row][col + i] = newShip;
        }
      },

      receiveAttack: function (row, col) {
        if (this.grid[row][col] !== null) {
          this.grid[row][col].hit();
          this.successfulAttacks.push([row, col]);
        } else {
          this.missedAttacks.push([row, col]);
        }
      },

      allShipsSunk: function () {
        for (let row = 0; row < 10; row++) {
          for (let col = 0; col < 10; col++) {
            const currentSlot = this.grid[row][col];
            if (currentSlot !== null && currentSlot.isSunk() === false) {
              return false;
            }
          }
        }
        return true;
      },

      placeShipRandomly: function (length) {
        let placed = false;

        while (!placed) {
          const row = Math.floor(Math.random() * 10);
          const col = Math.floor(Math.random() * 10);
          const isVertical = Math.floor(Math.random() * 2) === 1;

          let canPlace = true;
          for (let i = 0; i < length; i++) {
            const r = isVertical ? row + i : row;
            const c = isVertical ? col : col + i;

            if (r > 9 || c > 9 || this.grid[r][c] !== null) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            const newShip = Ship(length);
            this.ships.push(newShip);
            for (let i = 0; i < length; i++) {
              const r = isVertical ? row + i : row;
              const c = isVertical ? col : col + i;
              this.grid[r][c] = newShip;
            }
            placed = true;
          }
        }
      },

      getRemainingShips: function() {
        return this.ships.filter(ship => ship.isSunk() === false).length;
      }
      
    };
}