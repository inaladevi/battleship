import { Gameboard } from '../src/gameboard.js';

describe('Gameboard Factory', () => {
  it('places a ship at specific coordinates', () => {
    const board = Gameboard();
    board.placeShip(3, 0, 0); 
    expect(board.grid[0][0].length).toBe(3);
    expect(board.grid[0][1].length).toBe(3);
    expect(board.grid[0][2].length).toBe(3);
    expect(board.grid[0][3]).toBe(null);
  });

  describe('receiveAttack function', () => {
    it('sends a hit to the correct ship', () => {
      const board = Gameboard();
      board.placeShip(3, 0, 0); 
      board.receiveAttack(0, 1); 
      expect(board.grid[0][1].hits).toBe(1);
    });

    it('records missed shots', () => {
      const board = Gameboard();
      board.placeShip(3, 0, 0); 
      board.receiveAttack(5, 5); 
      expect(board.missedAttacks[0]).toEqual([5, 5]);
    });
  });

  describe('allShipsSunk function', () => {
    it('reports true if all ships are sunk', () => {
      const board = Gameboard();
      board.placeShip(2, 0, 0);  
      board.receiveAttack(0, 0);
      board.receiveAttack(0, 1);

      expect(board.allShipsSunk()).toBe(true);
    });

    it('reports false if some ships are still floating', () => {
      const board = Gameboard();
      board.placeShip(2, 0, 0); 
      board.receiveAttack(0, 0);
      expect(board.allShipsSunk()).toBe(false);
    });
  });

  describe('input guards', () => {
    it('ignores a repeated attack on the same cell', () => {
      const board = Gameboard();
      board.placeShip(2, 0, 0);
      board.receiveAttack(0, 0);
      const second = board.receiveAttack(0, 0);

      expect(second).toBe(null);
      expect(board.grid[0][0].hits).toBe(1);
      expect(board.successfulAttacks.length).toBe(1);
    });

    it('does not sink a ship by hitting the same cell twice', () => {
      const board = Gameboard();
      board.placeShip(2, 0, 0);
      board.receiveAttack(0, 0);
      board.receiveAttack(0, 0);

      expect(board.allShipsSunk()).toBe(false);
    });

    it('ignores attacks outside the board', () => {
      const board = Gameboard();
      expect(board.receiveAttack(10, 0)).toBe(null);
      expect(board.receiveAttack(0, -1)).toBe(null);
      expect(board.missedAttacks.length).toBe(0);
    });

    it('returns "hit" and "miss" for valid attacks', () => {
      const board = Gameboard();
      board.placeShip(2, 0, 0);
      expect(board.receiveAttack(0, 0)).toBe('hit');
      expect(board.receiveAttack(5, 5)).toBe('miss');
    });
  });

  describe('placeShip validation', () => {
    it('rejects a ship that would run off the right edge', () => {
      const board = Gameboard();
      expect(board.placeShip(3, 0, 8)).toBe(false);
      expect(board.ships.length).toBe(0);
    });

    it('rejects a ship that overlaps another ship', () => {
      const board = Gameboard();
      board.placeShip(3, 0, 0);
      expect(board.placeShip(2, 0, 2)).toBe(false);
      expect(board.ships.length).toBe(1);
    });

    it('counts manually placed ships in getRemainingShips', () => {
      const board = Gameboard();
      board.placeShip(2, 0, 0);
      board.placeShip(3, 1, 0);
      expect(board.getRemainingShips()).toBe(2);
    });
  });

  describe('placeShipRandomly', () => {
    it('places a full fleet without overlaps', () => {
      const board = Gameboard();
      [5, 4, 3, 3, 2].forEach((length) => board.placeShipRandomly(length));

      let occupied = 0;
      board.grid.forEach((row) => row.forEach((cell) => { if (cell !== null) occupied++; }));
      expect(occupied).toBe(17);
      expect(board.getRemainingShips()).toBe(5);
    });
  });
});