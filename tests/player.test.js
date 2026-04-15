import { Player } from '../src/player.js';

describe("Player Factory", () => {
  it("creates a player with a type and its own gameboard", () => {
    const p1 = Player("real");
    expect(p1.type).toBe("real");
    expect(p1.board.grid.length).toBe(10);
  });

  it('computer player generates a valid random move', () => {
    const comp = Player('computer');
    const move = comp.randomAttack();

    expect(Array.isArray(move)).toBe(true);
    expect(move.length).toBe(2);

    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThanOrEqual(9);
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThanOrEqual(9);
  });
});