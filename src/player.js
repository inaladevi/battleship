import { Gameboard } from './gameboard.js'

export const Player = function(type) {
    const board = Gameboard();
    const previousMoves = [];

    return {
        type: type,
        board: board,

        randomAttack: function() {
            let row, col;
            let alreadyShot = true;

            while(alreadyShot) {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
                alreadyShot = previousMoves.some(
                    move => move[0] === row && move[1] === col
                );
            }
            previousMoves.push([row, col]);
            return [row, col];
        }
    }
}
