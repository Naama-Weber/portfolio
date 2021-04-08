var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;
var gBallInt;
var gCounter = 0;
var gBallsOnBoardCounter = 2;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	gCounter = 0;
	document.querySelector('.ball-count').innerText = 0;
	document.querySelector('.game-over').style.display = 'none';
	document.querySelector('table').hidden = false;
	document.querySelector('button').style.display = 'none';
	gBallsOnBoardCounter = 2;
	// putRandBall();
	renderBoard(gBoard);
	gBallInt = setInterval(function () {
		putRandBall()
		gBallsOnBoardCounter++;
		renderBoard(gBoard)
	}, 2000);
}

// function countBallsOnBoard(){
// 	gBallsOnBoardCounter = setInterval (function(){
// 		console.log('balls on board: ', gBallsOnBoardCounter);
// 	}, 500);
// }


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	// console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	
	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	
	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		
		if (targetCell.gameElement === BALL) {
			var elCounter = document.querySelector('.ball-count');
			gCounter++;
			gBallsOnBoardCounter--;
			var audio = document.querySelector('.audio'); 
			audio.play();
			console.log('gBallsOnBoardCounter: ', gBallsOnBoardCounter);
			if (gBallsOnBoardCounter === 0) {
				gameOver();
			}
			elCounter.innerText = gCounter;
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

function gameOver() {
	var elBoard = document.querySelector('table');
	var elGameOver = document.querySelector('.game-over');
	var elButton = document.querySelector('button');
	clearInterval(gBallInt);
	elBoard.hidden = true;
	elGameOver.innerText = `You Won! ${'\n'} Game Over`;
	elGameOver.style.display = 'block';
	elButton.style.display = 'block';
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function putRandBall() {
	var randomI = getRandomInt(0, gBoard.length);
	var randomJ = getRandomInt(0, gBoard[0].length);
	var randomCell = gBoard[randomI][randomJ];
	while (randomCell.type !== FLOOR || randomCell.gameElement) {
		randomI = getRandomInt(0, gBoard.length);
		randomJ = getRandomInt(0, gBoard[0].length);
		randomCell = gBoard[randomI][randomJ];
	}
	randomCell.gameElement = BALL;
	return randomCell;
}



