import { Ship } from '../src/ship.js';

describe('Ship Factory', () => {
  it('creates a ship with correct length, 0 hits, and not sunk', () => {
    const myShip = Ship(3);

    expect(myShip.length).toBe(3);
    expect(myShip.hits).toBe(0);
    expect(myShip.isSunk()).toBe(false);
  });

  it('takes a hit', () => {
    const myShip = Ship(3);
    myShip.hit();
    expect(myShip.hits).toBe(1);
  });

  it('sinks the ship when hits equal length', () => {
    const myShip = Ship(2); 
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
  });
});