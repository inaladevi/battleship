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
});