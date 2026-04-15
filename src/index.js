import { Player } from './player.js';
import { DOM } from './dom.js';

let human;
let computer;
let isGameOver = false;
const fleet = [5, 4, 3, 3, 2];

const playerBoardDiv = document.getElementById('player-board');
const computerBoardDiv = document.getElementById('computer-board');
const statusMessage = document.getElementById('status-message');

function initGame() {
    human = Player('real');
    computer = Player('computer');
    isGameOver = false;

    fleet.forEach(length => {
        human.board.placeShipRandomly(length);
        computer.board.placeShipRandomly(length);
    });

    DOM.renderBoard(playerBoardDiv, human.board, false);
    DOM.renderBoard(computerBoardDiv, computer.board, true); 
    DOM.updateMessage("Awaiting Orders, Captain...");
    DOM.updateScores(human.board, computer.board);
}

initGame();

computerBoardDiv.addEventListener('click', function(e) {
    if (isGameOver) return;

    if (e.target.classList.contains('cell')) {
        if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {
            return; 
        }

        // 1. Human Turn
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        
        computer.board.receiveAttack(row, col);
        DOM.renderBoard(computerBoardDiv, computer.board, true); 
        DOM.updateScores(human.board, computer.board);

        // 2. Check Win
        if (computer.board.allShipsSunk()) {
            DOM.updateMessage("VICTORY! You sank the enemy fleet!");
            isGameOver = true;
            return; 
        }

        // 3. Computer Turn
        const computerMove = computer.randomAttack(); 
        human.board.receiveAttack(computerMove[0], computerMove[1]);
        DOM.renderBoard(playerBoardDiv, human.board, false);
        DOM.updateScores(human.board, computer.board);

        // 4. Check Loss
        if (human.board.allShipsSunk()) {
            DOM.updateMessage("DEFEAT! The computer sank your fleet.");
            isGameOver = true;
        }
    }
});

document.getElementById('btn-reset').addEventListener('click', initGame);

document.getElementById('btn-randomize').addEventListener('click', () => {
    if (!isGameOver && human.board.missedAttacks.length === 0 && human.board.successfulAttacks.length === 0) {
        human = Player('real');
        fleet.forEach(length => human.board.placeShipRandomly(length));
        DOM.renderBoard(playerBoardDiv, human.board, false);
    } else {
        DOM.updateMessage("Can't randomize during a battle!");
    }
});