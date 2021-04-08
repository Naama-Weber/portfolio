'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWER = '○';
const CHERRY = '🍒';


var gFoodCounter = -1;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gFoodCounter = -1;
    var elBtn = document.querySelector('.restart');
    elBtn.hidden = true;
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    var elBoard = document.querySelector('.board-container');
    elBoard.hidden = false;
    var elVictoryModal = document.querySelector('.victory');
    elVictoryModal.style.display = 'none'
    gBoard = buildBoard()
    console.log(gBoard)
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === 1 && j === 8) ||
                (i === 8 && j===1) || (i === 8 && j === 8)) {
                board[i][j] = POWER;
            }
            if (board[i][j] === FOOD) gFoodCounter++;
        }
    }
    console.log('food counter: ', gFoodCounter);
    return board;
}



function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null
    // TODO
    //add game over modal and a play again button which starts the game again
    var elBtn = document.querySelector('.restart');
    elBtn.hidden = false;
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elBoard = document.querySelector('.board-container');
    elBoard.hidden = true;
    var elVictoryModal = document.querySelector('.victory');
    elVictoryModal.style.display = 'none';

}


function isVictory() {
    var elVictoryModal = document.querySelector('.victory');
    elVictoryModal.style.display = 'block'
    var elBtn = document.querySelector('.restart');
    elBtn.style.display = 'block';
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    var elBoard = document.querySelector('.board-container');
    elBoard.hidden = true;
}


function placeCherry(){
    getRandomIntInclusive()
}