export const DOM = (function() {

    const renderBoard = (boardElement, gameboard, isEnemyBoard = false) => {
        boardElement.innerHTML = '';

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (
                  gameboard.grid[row][col] !== null && isEnemyBoard === false
                ) {
                  cell.classList.add("ship");
                }

                const isMiss = gameboard.missedAttacks.some(function(move) {
                    return move[0] === row && move[1] === col;
                });
                if (isMiss) {
                   cell.classList.add('miss'); 
                }

                const isHit = gameboard.successfulAttacks.some(function(move) {
                    return move[0] === row && move[1] === col;
                });
                if (isHit) {
                    cell.classList.add('hit');
                }
                boardElement.appendChild(cell);
            }
        }
    };
    const updateMessage = (text) => {
        document.getElementById('status-message').innerText = text;
    };

    const updateScores = (humanBoard, computerBoard) => {
        document.getElementById('human-count').innerText = `(${humanBoard.getRemainingShips()} Ships Left)`;
        document.getElementById('computer-count').innerText = `(${computerBoard.getRemainingShips()} Ships Left)`;
    };

    return { renderBoard, updateMessage, updateScores };
})();