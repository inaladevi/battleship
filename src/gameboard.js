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

      // Places a ship horizontally starting at (row, col).
      // Returns true if placed, false if it would go off the board or overlap another ship.
      placeShip: function (length, row, col) {
        if (row < 0 || row > 9 || col < 0 || col + length > 10) {
          return false;
        }
        for (let i = 0; i < length; i++) {
          if (this.grid[row][col + i] !== null) {
            return false;
          }
        }

        const newShip = Ship(length);
        this.ships.push(newShip);
        for (let i = 0; i < length; i++) {
          this.grid[row][col + i] = newShip;
        }
        return true;
      },

      // Returns "hit", "miss", or null if the shot was ignored
      // (off the board, or this cell was already attacked).
      receiveAttack: function (row, col) {
        if (!Number.isInteger(row) || !Number.isInteger(col) ||
            row < 0 || row > 9 || col < 0 || col > 9) {
          return null;
        }

        const alreadyAttacked = [...this.successfulAttacks, ...this.missedAttacks].some(
          (move) => move[0] === row && move[1] === col
        );
        if (alreadyAttacked) {
          return null;
        }

        if (this.grid[row][col] !== null) {
          this.grid[row][col].hit();
          this.successfulAttacks.push([row, col]);
          return "hit";
        }
        this.missedAttacks.push([row, col]);
        return "miss";
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